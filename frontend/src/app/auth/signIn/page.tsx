"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    if (email && password) {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/",
      });
    }
  };

  return (
    <main className="justify-start  mx-[30%] my-[5%] pb-5">
      <div className="text-4xl text-left font-bold mb-[8%] ">Sign In</div>
      <label className="w-auto block text-gray-700 mb-2" htmlFor="name">
        Email
      </label>
      <input
        type="email"
        required
        id="email"
        name="email"
        placeholder="Enter your email address here"
        value={email}
        className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:outline-none focus:border-emerald-500"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="w-auto block text-gray-700 mb-2" htmlFor="name">
        Password
      </label>
      <input
        type="password"
        required
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:outline-none focus:border-emerald-500"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="text-center">
        <button
          className="bg-emerald-500 px-10 py-1 my-5 text-white font-medium rounded-full"
          onClick={onSubmit}
        >
          Login
        </button>
      </div>
      <div className="text-center">
        Don&lsquo;t have any account?
        <Link href="/register">
          <button className="ml-1 py-1 my-5 font-bold">Register</button>
        </Link>
      </div>
    </main>
  );
}
