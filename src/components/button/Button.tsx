'use client'

import { useFormStatus } from "react-dom";
import { ButtonProps } from "./Button.interface"
import { LoaderIcon } from "lucide-react";

export default function Button(props: ButtonProps) {
    const { children, icon } = props
    const { pending } = useFormStatus();

    return (
        <button aria-disabled={pending} role="button" className="group flex items-center justify-between rounded-full h-9 px-4 text-sm border-gray-main border-2 bg-gray-main transition-all ease-linear hover:bg-white hover:border-gray-main hover:text-black delay-150">
            {icon && (
                <div data-testid="button-icon" className="group-hover:block text-gray-500 text-lg hidden transition-all delay-150 mr-4">
                    {pending || props.pending ? <LoaderIcon className="text-gray-700 w-4 h-4 animate-spin" /> : icon}
                </div>
            )}

            <span data-testid="button-label" className="font-normal text-white group-hover:text-gray-600">{pending || props.pending ? 'Loading..' : children}</span>
        </button>
    )
}