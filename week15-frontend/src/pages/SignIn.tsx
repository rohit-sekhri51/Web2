import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/Button";
import { Input } from "../component/ui/Input";
import axios from 'axios';
import { useRef } from "react";

export function SignIn() {

    const userRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function verifyUser() {

        const jtoken = await axios.post("http://localhost:3000/api/v1/signin",{
          username: userRef.current?.value, 
          password: passRef.current?.value
        });
    
        alert("Jwt is:  " + JSON.stringify(jtoken.data.token));
        localStorage.setItem('jwt', jtoken.data.token);
        navigate("/Dashboard");
      } 

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded border min-w-48 p-8">
            <Input reference={userRef} placehold="Username"></Input>
            <Input reference={passRef} placehold="Password"></Input>
            <div className="pt-4">
            <Button variant="primary" text="Sign In" size="md" fullWidth={true} loading={false} 
            onClick={verifyUser}></Button>
            </div>
        </div> 

    </div>
}