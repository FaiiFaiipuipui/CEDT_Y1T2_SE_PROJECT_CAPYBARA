"use client";
import deleteAppoinment from "@/libs/deleteAppoinment";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DeleteAppointmentPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const id = urlParams.get("id") as string;

  if (!session || !session.user.token) return null;
  const submit = async () => {
    const handleDelete = async () => {
      await deleteAppoinment(id, session.user.token);
    };
    await handleDelete();
    alert("Successfully deleted!");
    router.push("/dashboard");
  };

  return (
    <main className="text-center mx-[20%] pb-5">
      <div className="text-4xl font-bold mt-[25%] ">Delete Appoinment</div>
      <div className="mt-10 text-lg font-">
        Are you sure to delete this appontment?
      </div>
      <div className="text-center mt-10">
        <button
          className="bg-white border-[2px] border-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-1 mr-10 text-emerald-500 font-medium rounded-full"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </button>
        <button
          className="bg-white border-[2px] border-red-500 hover:bg-red-500 hover:text-white px-8 py-1 mr-10 text-red-500 font-medium rounded-full"
          onClick={submit}
        >
          Sure!
        </button>
      </div>
    </main>
  );
}
