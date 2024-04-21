"use client";

import logout from "@/libs/logout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session || !session.user.token) return null;

  const getLogout = logout(session.user.token);
  return (
    <main className="text-center">
      <div className="text-4xl text-center font-bold mt-[15%] mb-[4%]">
        Sign Out
      </div>
      <div className="text-xl text-center font-medium mb-[4%]">
        Are you sure to sign out?
      </div>
      <div className="text-center">
        <button
          className="bg-white border-[2px] border-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-1 mr-10 text-emerald-500 font-medium rounded-full"
          onClick={() => {
            router.push("/");
          }}
        >
          Cancel
        </button>
        <button
          className="bg-white border-[2px] border-red-500 hover:bg-red-500 hover:text-white px-8 py-1 text-red-500 font-medium rounded-full"
          onClick={() => {
            router.push("/");
          }}
        >
          Sure!
        </button>
      </div>
    </main>
  );
}
