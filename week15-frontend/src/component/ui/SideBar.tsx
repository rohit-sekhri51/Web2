import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YTIcon } from "../icons/YTIcon";
import { SideBarItem } from "./SideBarItem";

export function SideBar() {

    return <div className="h-screen bg-white border-r w-52 fixed top-0 left-0">
        <div className="flex items-center text-2xl pt-2 text-purple-500">
        <BrainIcon/> Brainly
        </div>
        <div className="pt-10 items-center">
        <SideBarItem text="Twitter" icon={<TwitterIcon/>}></SideBarItem>
        <SideBarItem text="Youtube" icon={<YTIcon/>}></SideBarItem>
        </div>
    </div>
}