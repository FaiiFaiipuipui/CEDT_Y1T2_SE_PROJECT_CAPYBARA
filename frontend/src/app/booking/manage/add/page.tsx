"use client";

import createAppointment from "@/libs/createAppointment";
import createTransaction from "@/libs/createTransaction";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// interface ResponseData {
//   message: string;
//   // include other properties
// }

export default function BookingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const id = urlParams.get("id") as string;
  const cname = urlParams.get("name");

  const [date, setDate] = useState("");

  if (!session || !session.user.token) return null;
  const submit = async () => {
    if (date) {
      try {
        if (date) {
          const createApptResponse = (await createAppointment(
            session.user.token,
            id,
            date
          )) as Response;
          if (!createApptResponse) {
            throw new Error("Failed to submit create Appointment form");
          }

          const createApptResponseData = await createApptResponse.json();
          const aid = createApptResponseData.data._id;

          const createTransactionResponse = (await createTransaction(
            session.user.token,
            aid
          )) as Response;
          if (!createTransactionResponse) {
            throw new Error("Failed to submit create Transaction");

            // const responseData:ResponseData = await response.json();

            // if (response && response.status !== 200) {
            //   alert(responseData.message);
            //   alert('Not Success')
            //   return;
            // }
          }
          alert("Successfully booked!");
          router.push("/dashboard");
        } else {
          alert("Please fill in the missing field!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill in the missing field!");
    }
  };
  return (
    <div className="text-left w-[70%] p-12 mx-auto">
      <div className="text-4xl font-bold mt-[10%] ">
        Booking campground : {cname}
      </div>
      <div className="w-full my-10">
        <label className="w-auto block text-gray-700" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          required
          id="date"
          name="date"
          placeholder="Select the date here"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </div>
      <div className="text-center">
        <button
          className="bg-white border-[2px] border-red-500 px-8 py-1 mr-10 text-red-500 font-medium rounded-full hover:bg-red-500 hover:text-white"
          onClick={() => {
            setDate("");
            router.back();
          }}
        >
          Cancel
        </button>
        <button
          className="border-[2px] border-emerald-500 bg-emerald-500 px-10 py-1 text-white font-medium rounded-full hover:bg-white hover:text-emerald-500"
          onClick={submit}
        >
          Book!
        </button>
      </div>
    </div>
  );
}
