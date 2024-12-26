import { Button } from "./Button";
import { useRef, useState } from "react";

// 1, 2, 3, 6, 10
export function OTP({ number }) {

    const refer = useRef(Array(number).fill(0));

    const [disabled, setDisabled] = useState(true);

    return <div> 
        <div className="flex justify-center">
        <br />
        <br />
        <br />
        <br />
        <br />
        {Array(number).fill(1).map((x, index) => <SubOtpBox reference={(e) => refer.current[index] = e} key={index} 
        onDone={() => {
            console.log(refer)
            console.log(index)
            
            if (index + 1 >= number) {
                return
            }
            refer.current[index + 1].focus();
        }} goBack={() => {
            if (index == 0) {
                return
            }
            refer.current[index - 1].focus();
        }} />)}

        <br />
        <br />
        <br />
        <br />
        <br />
        
    </div>
    <div className="flex justify-center">
    <Button disabled={disabled}>Sign up</Button>
    </div>
    </div>
}

function SubOtpBox({
    reference, onDone, goBack
}) {
    const [inputBoxVal, setInputBoxVal] = useState("");
    const refBackVal = useRef();
    const refBackValue = useRef();

    return <div>
        <input value={inputBoxVal} ref={reference} 
        onKeyUp={(e) => {
            const refBackVal = e.target.value
            if (e.key == "Backspace") {
                setInputBoxVal("");
                goBack()
            }
        }} onChange={(e) => {
            const val = e.target.value
            const refBackValue = e.target.value
            if (val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val  == "9") {
                setInputBoxVal(val);
                onDone()
            } else {

            }
        }} type="text" className="m-1 w-[40px] h-[50px] rounded-xl bg-green-500 outline-none px-4 text-white"></input>
    </div>
}