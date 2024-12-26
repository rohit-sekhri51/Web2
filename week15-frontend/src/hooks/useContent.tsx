import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {

    const [contents, setContents] = useState([]);

    function reFresh() {
        axios.get("http://localhost:3000/api/v1/content",{
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            setContents(response.data.getContent)
        })
    }

    useEffect(() => {
        reFresh();
        // use recoil to autoclose the Modal upon submit
        const inter = setInterval(() => {
            reFresh();
        },60 * 1000)

        return () => {
            clearInterval(inter);
        }
    },[]);

    return { contents, reFresh }
}