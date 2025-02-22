
import axios from 'axios';
import { useRef } from "react";
import { CrossIcon } from '../icons/CrossIcon';
import { Input } from './Input';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean | (() => void);
    onClose: boolean | (() => void);        // onClick {(e) => e.stopPropagation()}
}

// enum contentTypes {
//     image= 'image',video= 'video',article= 'article',audio= 'audio'}

// Controlled component
export function ContentModal({isOpen, onClose}: ModalProps) {

    const linkRef = useRef<HTMLInputElement>(null);
    //const [type,setType] = useState(contentTypes.video);
    const typeRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);

    async function sendContentMongo() {

        const jToken = localStorage.getItem('jwt');

        const newContent = await axios.post("http://localhost:3000/api/v1/content",{
          link: linkRef.current?.value, 
          type: typeRef.current?.value,
          title: titleRef.current?.value, 
          tag: tagRef.current?.value
            }, {
            headers: { "Authorization": jToken }
        });

        alert("New Content added" + JSON.stringify(newContent.data));
        onClose;
    }

    return <div>
       {isOpen && <div>
       <div id="default-modal" aria-hidden='false' className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-80 flex justify-center">
        </div>
       <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end cursor-pointer hover:bg-gray-200" onClick={() => onClose}>
                        <CrossIcon/>
                    </div>
                    <div className='font-semibold text-md'>
                        <Input reference={linkRef} placehold={"Link"} />
                        <Input reference={typeRef} placehold={"Type"} />
                        <Input reference={titleRef} placehold={"Title"} />
                        <Input reference={tagRef} placehold={"Tag"} />
                    </div>
                    <div className="flex justify-center">
                    <Button size="md" variant="primary" text="Submit" onClick={sendContentMongo}></Button>
                    </div>
                </span>
            </div>    

        </div>
        </div>}
    </div>
}

