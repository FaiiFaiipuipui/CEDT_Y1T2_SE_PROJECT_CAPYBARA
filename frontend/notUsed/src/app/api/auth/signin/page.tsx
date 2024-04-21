"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const submit = async () => {
    if (email && password) {
      try {
        await signIn("credentials", { email: email, password: password })
        alert("Successfully login!");
        //redirect('./');
      } catch (error) {
        console.error(error);
        alert("Failed to login!");
      }
    } else {
      alert("Please fill in the missing field!");
    }
  };
  return (
    <main className="justify-start  mx-[30%] my-[5%] pb-5">
      <div className="text-4xl text-left font-bold mb-[8%] ">Login</div>
      <div className="text-left">
        <label className="w-auto block text-gray-700 mb-2" htmlFor="name">
          Email
        </label>
        <input
          type="email"
          required
          id="email"
          name="email"
          placeholder="Email"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:outline-none focus:border-emerald-500"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label className="w-auto block text-gray-700 mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          required
          id="password"
          name="password"
          placeholder="Password"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mb-2 text-gray-700 focus:outline-none focus:border-emerald-500"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="text-center">
        <button
          className="bg-emerald-500 px-10 py-1 my-5 text-white font-medium rounded-full"
          onClick={async () => {
            await signIn("credentials", { email: email, password: password, callbackUrl: '/' });
          }}
        >
          Login
        </button>
      </div>
      <div className="text-center">
        Don&apos;t have any account yet?
        <Link href={"/api/auth/register"}>
          <button className="ml-1 py-1 my-5 font-bold">Register here</button>
        </Link>
      </div>
    </main>
  );
}
