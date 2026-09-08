'use client'

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";


interface SubmitButtonProps {
    children: ReactNode,
    disabled?: boolean,
    className?: string
}

export function SubmitButton({children, disabled, className}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    const isDisabled = disabled || pending;

    return(
        <button
        type="submit"
        disabled={isDisabled}
        className={className}
        >
            {pending ? "Loading..." : children}
        </button>
    )
}