

export function Input({placehold, reference}: {placehold: string, reference?: any }) {
    return <div>
        <input ref={reference} placeholder={placehold}  type={"text"} className="px-2 py-2 rounded border m-2"></input> 
         
    </div>
}