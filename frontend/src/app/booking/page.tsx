"use client";

import createAppointment from "../../libs/createAppointment";
import CampGroundSelection from "@/components/CampGroundSelection";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import createTransaction from "@/libs/createTransaction";

export default function AddAppointmentPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [date, setDate] = useState("");
  const [appointmentID, setAppointmentID] = useState("");

  const [selectedCampground, setSelectedCampground] = useState<string>("");
  const handleOptionChange = (newOption: string) => {
    setSelectedCampground(newOption);
  };

  if (!session || !session.user.token) return null;

  const submit = async () => {
    console.log(selectedCampground, date);
    if (selectedCampground && date) {
      try {
        const createApptResponse = await createAppointment(
          session.user.token,
          selectedCampground,
          date
        );
        if (!createApptResponse) {
          throw new Error("Failed to submit create Appointment form");
        }

        const createApptResponseData = await createApptResponse.json();
        console.log(createApptResponseData);
        console.log("------------------------------------");
        const aid = createApptResponseData.data._id;
        setAppointmentID(aid);
        console.log("aid : ", typeof aid);
        console.log("------------------------------------");

        const createTransactionResponse = (await createTransaction(
          session.user.token,
          aid
        )) as Response;
        console.log(createTransactionResponse);

        if (!createTransactionResponse) {
          throw new Error("Failed to submit create Transaction");
        }

        alert("Successfully booked!");

        router.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill in the missing field!");
    }
  };

  return (
    <main className="text-left mx-[20%] pb-5">
      <div className="text-4xl font-bold mt-[8%] ">Add Appointment</div>
      <div className="w-full my-10">
        <label className="w-auto block text-gray-700" htmlFor="name">
          Campground
        </label>
        <CampGroundSelection onSelection={handleOptionChange} />
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
          className="bg-white border-[2px] border-red-800 px-8 py-1 mr-10 text-red-800 font-medium rounded-full hover:bg-red-800 hover:text-white"
          onClick={() => {
            setSelectedCampground("");
            setDate("");
            router.back();
          }}
        >
          Cancel
        </button>
        <button
          className="border-[2px] border-emerald-500 bg-emerald-500 px-10 py-1 text-white font-medium rounded-full hover:bg-white hover:text-emerald-500"
          onClick={() => {
            submit();
          }}
        >
          Book!
        </button>
      </div>
    </main>
  );
}
