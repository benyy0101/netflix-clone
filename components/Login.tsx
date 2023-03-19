"use client";

import Image from "next/image";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import { useCallback } from "react";

function Login() { 
    const [userEmail, setEmail] = useState<string>("");
    const [userPassword, setPassword] = useState<string>("");
    const [userName, setName] = useState<string>("");

    const [hasAccount, setHasAccount] = useState<boolean>(true);

    const register = useCallback(async () => {
        try{
            await axios.post('/api/register', {
                email: userEmail,
                password: userPassword,
                name: userName
            })
        }
        catch(e){

        }
    },[])
    

    return (
        <div className="h-full w-full bg-hero bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <div className="px-12 py-5">
                    <Image 
                    width={100}
                    height={50}
                    src="/../public/images/logo.png"/>
                </div>

                <div className="flex justify-center">
                    <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {hasAccount ? "Sign In" : "Sign Up"}
                        </h2>
                        <div className="flex flex-col gap-6">
                        {!hasAccount && <Input 
                            label="Username"
                            id = "name"
                            value = {userName}
                            type = "text"
                            onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)}}
                             />}

                            <Input 
                            label="Email"
                            id = "email"
                            value = {userEmail}
                            type = "email"
                            onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}}
                             />
                             <Input 
                            label="Password"
                            id = "password"
                            value = {userPassword}
                            type = "password"
                            onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}
                             />
                        </div>
                        <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800 transition">
                            {hasAccount ? "Log In" : "Submit"}
                        </button>
                        {hasAccount && <p className="text-neutral-500 mt-12 ">
                            First time using Netflix?
                            <span className="text-white ml-2 hover:underline cursor-pointer" 
                            onClick={() => setHasAccount(!hasAccount)}>
                                Sign up now!
                            </span>
                        </p>}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;