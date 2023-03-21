"use client";

import { useCallback } from "react";
import Input from "../components/Input";
import { useState } from "react";
import {signIn} from "next-auth/react";

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';

import Image from 'next/image';

export default function Home() {
  const [userEmail, setEmail] = useState<string>("");
  const [userPassword, setPassword] = useState<string>("");

  const loginHandler = useCallback(async () => {
    try {
      await signIn("credentials", {
        redirect: false,
        callbackUrl:'/',
        email: userEmail,
        password: userPassword,
      });
    } catch (e) {
        console.log(e);
    }
  },[userEmail, userPassword])

  return (
    <div className="flex justify-center">
      <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
      <div className="px-12 py-5">
              <Image
                width={100}
                height={50}
                alt="Netflix Logo"
                src="/../public/images/logo.png"
              />
            </div>
        <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
        <div className="flex flex-col gap-6">
          <Input
            label="Email"
            id="email"
            value={userEmail}
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label="Password"
            id="password"
            value={userPassword}
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800 transition"
        onClick={loginHandler}>
          Log In
        </button>

        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
          <div className="
          w-10
          h-10
          bg-white
          rounded-full
          flex
          items-center
          justify-center
          cursor-pointer
          hover:opacity-80
          transition
          "
          onClick={async ()=>{
            signIn('google', {callbackUrl:'/browse'})
          }}>
            <FcGoogle size={30}/>
          </div>

          <div className="
          w-10
          h-10
          bg-white
          rounded-full
          flex
          items-center
          justify-center
          cursor-pointer
          hover:opacity-80
          transition
          "
          onClick={()=>{signIn('github', {callbackUrl:'./browse'})}}
          >
            <FaGithub size={30} />
          </div>

        </div>
        <p className="text-neutral-500 mt-12 ">
          First time using Netflix?
          <span className="text-white ml-2 hover:underline cursor-pointer">
            Sign up now!
          </span>
        </p>
      </div>
    </div>
  );
}
