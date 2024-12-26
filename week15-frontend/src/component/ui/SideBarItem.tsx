import { ReactElement } from "react";


export function SideBarItem({text, icon}: {
    text: string,
    icon: ReactElement }) {

    return <div className="flex items-center text-sm cursor-pointer hover:bg-gray-200 transition-all duration-500">
       <div className="p-2"> {icon} </div>
       <div className="p-2"> {text} </div>  
    </div>
}