"use client";
import deleteCampground from "@/libs/deleteCampground";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DeleteCampgroundPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const id = urlParams.get("id") as string;
  const cname = urlParams.get("name");

  if (!session || !session.user.token) return null;
  const submit = () => {
    const handleDelete = async () => {
      await deleteCampground(id, session.user.token);
    };
    handleDelete();
    alert("Successfully deleted!");
    router.push("/campground");
  };

  return (
    <main className="text-center mx-[20%] pb-5">
      <div className="text-4xl font-bold mt-[25%] ">
        Delete Campground : {cname}
      </div>
      <div className="mt-10 text-lg font-">
        Are you sure to delete this campground?
      </div>
      <div className="text-center mt-10">
        <button
          className="bg-white border-[2px] border-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-1 mr-10 text-emerald-500 font-medium rounded-full"
          onClick={() => {
            router.push("/campground");
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
