"use client";

import { useCallback } from "react";
import Input from "../components/Input";
import { useState } from "react";
import {signIn} from "next-auth/react";

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

    }
  },[userEmail, userPassword])

  return (
    <div className="flex justify-center">
      <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
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
