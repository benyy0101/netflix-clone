'use client';

import React from 'react';
import { signOut } from "next-auth/react";
interface ButtonProps {
    method?: string;
    className?: string;
    value?: string;
}

const Button: React.FC<ButtonProps> = ({
    method,
    className,
    value,
}) => {

    const signOutHandler = () => {
        signOut()
    }

    return (
        <button
        className={className}
        onClick={method === "SignOut" ? signOutHandler : () => {}}
        >{value}</button>
    )
}
export default Button;