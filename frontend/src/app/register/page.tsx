"use client";

import register from "@/libs/register";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Select your role here");

  const submit = () => {
    if (name && telephone && email && password && role) {
      const postRegister = async () => {
        await register(name, telephone, email, password, role);
      };
      postRegister();
      alert("Successfully register!");
      router.push("/api/auth/signin");
    } else {
      alert("Please fill in the missing field!");
    }
  };
  return (
    <main className="justify-start  mx-[30%] my-[5%] pb-5">
      <div className="text-4xl text-left font-bold mb-[8%] ">Register</div>
      <label className="w-auto block text-gray-700 mb-2" htmlFor="name">
        Name - Surname
      </label>
      <input
        type="text"
        required
        id="name"
        name="name"
        placeholder="Enter your name and surname here"
        value={name}
        className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:outline-none focus:border-emerald-500"
        onChange={(e) => setName(e.target.value)}
      />
      <label className="w-auto block text-gray-700 mb-2" htmlFor="name">
        Telephone
      </label>
      <input
        type="tel"
        required
        id="telephone"
        name="telephone"
        placeholder="Enter your phone number here"
        value={telephone}
        className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mb-4 text-gray-700 focus:outline-none focus:border-emerald-500"
        onChange={(e) => setTelephone(e.target.value)}
      />
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
      <div
        className="flex flex-row justify-end text-gray-500 text-sm"
        onClick={togglePassword}
      >
        <input type="checkbox" />
        <div className="ml-3">Show Password</div>
      </div>
      <label htmlFor="role">Role</label>
      <select
        id="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
      >
        <option disabled selected>
          Select your role here
        </option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <div className="text-center">
        <button
          className="bg-emerald-500 px-10 py-1 my-5 text-white font-medium rounded-full"
          onClick={submit}
        >
          Register
        </button>
      </div>
      <div className="text-center">
        Already have an account?
        <Link href="/api/auth/signin">
          <button className="ml-1 py-1 my-5 font-bold">Login here</button>
        </Link>
      </div>
    </main>
  );
}
function togglePassword(): void {
  var x: HTMLInputElement | null = document.getElementById(
    "password"
  ) as HTMLInputElement;
  if (x !== null) {
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}
