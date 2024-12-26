import { useRef } from "react";
import { Button } from "../component/ui/Button";
import { Input } from "../component/ui/Input";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export function SignUp() {

    const userRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function sendSignUp() {

    const newUser = await axios.post("http://localhost:3000/api/v1/signup",{
            username: userRef.current?.value, 
            password: passRef.current?.value
          });

        alert("New User Signed Up " + JSON.stringify(newUser.data)); 
        navigate("/SignIn"); 
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded border min-w-48 p-8">
            <Input reference={userRef} placehold="Username"></Input>
            <Input reference={passRef} placehold="Password"></Input>
            <div className="pt-4">
            <Button variant="primary" text="Sign Up" size="md" fullWidth={true} loading={false} 
            onClick={sendSignUp}></Button>
            </div>
        </div>
    </div>
}