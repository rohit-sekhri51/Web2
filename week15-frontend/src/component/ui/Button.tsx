import { ReactElement } from "react";

type Variants = "primary" | "secondary";

export interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    //data-modal-hide?: string;  // data-modal-hide="default-modal"
}

const defaultStyles = "rounded-md p-4 flex items-center"    //  justify-center horizantly align

const variantStyles = {
    "primary": "bg-purple-500 text-white",
    "secondary": "bg-purple-300 text-white"
}

const sizeStyles = {        // padding
    "sm": "py-1 px-2 text-sm",
    "md": "py-2 px-4 text-md",
    "lg": "py-4 px-8 text-lg"
}

export const Button = (props: ButtonProps) => {

    return <button onClick={props.onClick} 
    className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} 
    ${props.fullWidth ? "w-full justify-center" : ""} ${props.loading ? "opacity-45" : "" }`} 
    disabled={props.loading} >

    {props.startIcon} {props.text} {props.endIcon}
    </button>
}



