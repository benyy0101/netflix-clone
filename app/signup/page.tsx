"use client";

import React from "react";
import Input from "../../components/Input";
import { useState, useCallback } from "react";
import axios from "axios";


export default function Page() {
  const [userEmail, setEmail] = useState<string>("");
  const [userPassword, setPassword] = useState<string>("");
  const [userName, setName] = useState<string>("");

  const register = useCallback(async () => {
    try {
      await axios.post("./api/register", {
        email: userEmail,
        password: userPassword,
        name: userName,
      });
    } catch (e) {}
  }, [userEmail, userPassword, userName]);

  return (
    <div className="flex justify-center">
      <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
        <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
        <div className="flex flex-col gap-6">
          <Input
            label="Username"
            id="name"
            value={userName}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />

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

        <button
          className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-800 transition"
          onClick={register}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
