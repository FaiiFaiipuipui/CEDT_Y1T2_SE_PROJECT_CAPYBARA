"use client";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { PaymentItem } from "interface";
import { createPromptpayQR, getTransaction } from "@/libs";
import {
  QrCodeComponent,
  PaymentInformationDetail,
  UploadSlip,
} from "@/components";

export default function PaymentPage() {
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [rentDate, setRentDate] = useState<Date>();
  const [campgroundName, setCampgroundName] = useState<string>("");
  const [promptpayQr, setPromptpayQr] = useState<ReactNode | null>(null);
  const [campgroundPrice, setCampgroundPrice] = useState<String | null>();

  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const tid = urlParams.get("tid") as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user.token) return null;
        const transactionData = await getTransaction(tid, session.user.token);
        const transaction: PaymentItem = transactionData.data;
        const name = transaction.user.name;
        const userId = transaction.user._id;
        const rentDate = transaction.rent_date;
        const campgroundName = transaction.campground.name;
        setName(name);
        setUserId(userId);
        setRentDate(rentDate);
        setCampgroundName(campgroundName);

        const response = await createPromptpayQR(session.user.token, tid);

        // Update state with QR code data
        const jsonRes = await response.json();
        console.log(response);
        console.log(jsonRes);
        setPromptpayQr(
          btoa(decodeURIComponent(encodeURIComponent(jsonRes.data)))
        );
        setCampgroundPrice(jsonRes.campgroundPrice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [tid]);

  return (
    <div className=" flex justify-center items-center p-10 flex-col">
      <div className="text-5xl font-black font-bold text-center">
        Payment Information
      </div>
      <div className="flex border border-ash border-solid w-full grid grid-cols-3 gap-3 flex mt-10 rounded-[50px]">
        {/* The first col */}
        <div className="bg-cadetblue w-[100%] h-[100%] rounded-l-[50px] pt-2">
          <PaymentInformationDetail
            name={name}
            userId={userId}
            rentDate={rentDate}
            campgroundName={campgroundName}
          />
        </div>

        {/* Second column */}
        <QrCodeComponent
          campgroundPrice={campgroundPrice}
          promptpayQr={promptpayQr}
        />

        {/* Third Column */}
        <div className="flex justify-center flex-col pr-[5vw] rounded-[50px]">
          <div className="pt-7 font-medium text-xl">
            Please upload your receipt
          </div>
          <UploadSlip token={session.user.token} tid={tid} isEditPage={false} />
        </div>
      </div>
    </div>
  );
}
