"use client";

import getAppointment from "@/libs/getAppointment";
import getAppointments from "@/libs/getAppointments";
import updateAppointment from "@/libs/updateAppointment";
import CampGroundSelection from "@/components/CampGroundSelection";
// import CurrentAppointmentShower from "@/components/CurrentAppointmentShower";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppointmentItem } from "interface";

export default function EditAppointmentPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const id = urlParams.get("id") as string;
  const cname = urlParams.get("name");

  const [date, setDate] = useState("");

  const [selectedCampground, setSelectedCampground] = useState<string>("");
  const handleOptionChange = (newOption: string) => {
    setSelectedCampground(newOption);
  };
  {
    /*
  const [appointmentJsonReady, setAppointmentJsonReady] =
    useState<AppointmentItem>();
  useEffect(() => {
    const setData = async () => {
      const appointment = await getAppointment(id, session.user.token);
      console.log(appointment);
      setAppointmentJsonReady(appointment);
    };
    setData();
  }, []);
  */
  }

  if (!session || !session.user.token) return null;

  const submit = async () => {
    console.log(selectedCampground, date);
    if (selectedCampground && date) {
      const editAppointment = async () => {
        const response = await updateAppointment(
          id,
          session.user.token,
          selectedCampground,
          date
        );
        //alert(JSON.stringify(response));
      };
      await editAppointment();
      alert("Successfully booked!");
      router.push("/dashboard");
    } else {
      alert("Please fill in the missing field!");
    }
  };

  return (
    <main className="text-left mx-[20%] pb-5">
      <div className="text-4xl font-bold mt-[8%] ">
        Edit Appointment : {cname}
      </div>
      {/* <CurrentAppointmentShower appointment={appointmentJsonReady} /> */}
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
          className="border-[2px] border-blue-800 bg-blue-800 px-10 py-1 text-white font-medium rounded-full hover:bg-white hover:text-blue-800 hover:bg-white"
          onClick={() => {
            submit();
          }}
        >
          Edit
        </button>
      </div>
    </main>
  );
}
