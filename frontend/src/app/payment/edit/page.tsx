"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  getTransaction,
  createTransactionSlip,
  createPromptpayQR,
} from "@/libs";
import { PaymentItem } from "interface";
import { QrCodeComponent, UploadSlip } from "@/components";

export default function PaymentPage() {
  // This use State is for save image data
  const [imagePreview, setImagePreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [name, setName] = useState<string>("");
  const [rentDate, setRentDate] = useState<string>("");
  const [campgroundName, setCampgroundName] = useState<string>("");
  const [price, setPrice] = useState<String | null>();
  const [status, setStatus] = useState<string>("");
  const [promptpayQr, setPromptpayQr] = useState<ReactNode | null>(null);

  const router = useRouter();
  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const tid = urlParams.get("tid") as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session || !session.user.token) return null;

        const transactionData = await getTransaction(tid, session.user.token);
        const transaction: PaymentItem = transactionData.data;
        setName(transaction.user.name);
        setRentDate(transaction.rent_date.toString());
        setCampgroundName(transaction.campground.name);
        setPrice(transaction.campground.price.toString());
        setStatus(transaction.status);

        const response = await createPromptpayQR(session.user.token, tid);

        // Update state with QR code data
        const jsonRes = await response.json();
        console.log(response);
        console.log(jsonRes);
        setPromptpayQr(
          btoa(decodeURIComponent(encodeURIComponent(jsonRes.data)))
        );
        setPrice(jsonRes.campgroundPrice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the async function immediately
  }, [tid]);

  const handleSubmit = () => {
    if (imagePreview != null) {
      if (session.user && tid) {
        createTransactionSlip(session.user.token, tid, imagePreview);
        setShowPopup(true);
      }

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      router.push("/dashboard");
    } else {
      alert("Please upload Slip");
    }
  };

  const nextUpload = () => {
    document.getElementById("upload").style.display = "block";
    document.getElementById("showQr").style.display = "none";
  };
  const back = () => {
    document.getElementById("upload").style.display = "none";
    document.getElementById("showQr").style.display = "block";
  };

  const cancelUpload = () => {
    setImagePreview(null);
  };

  return (
    <main className="text-center p-5 mx-[8%]">
      <div className="text-4xl font-bold m-10 text-left">Edit Payment</div>

      <div className="flex felx-row">
        <div className="bg-cadetblue ml-10 p-11 text-left text-lg rounded-l-[50px] w-1/2 border-ash border-y-2 border-l-2">
          <div className="m-8">
            <div className="font-semibold">Name</div>
            {name ? (
              <div>{name}</div>
            ) : (
              <div className="pl-6 text-rose-500">Pending...</div>
            )}
          </div>
          <div className="m-8">
            <div className="font-semibold">Campground</div>
            {campgroundName ? (
              <div>{campgroundName}</div>
            ) : (
              <div className="pl-6 text-rose-500">Pending...</div>
            )}
          </div>
          <div className="m-8">
            <div className="font-semibold">Date</div>
            {rentDate ? (
              <div>{rentDate}</div>
            ) : (
              <div className="pl-6 text-rose-500">Pending...</div>
            )}
          </div>
          <div className="m-8">
            <div className="font-semibold">Transaction Status</div>

            {status ? (
              <div className="flex flex-row mt-1">
                <svg width="30" height="30">
                  <circle cx="12" cy="12" r="12" fill="#f43f5e" />
                </svg>
                <div className="text-rose-500 ml-1 place-items-center">
                  {status}
                </div>
              </div>
            ) : (
              <div className="pl-6 text-rose-500">Pending...</div>
            )}
          </div>
          <div className="m-8">
            <div className="font-semibold">Outstanding Balance</div>
            {promptpayQr ? (
              <div className="text-rose-500">{price}.00 THB</div>
            ) : (
              <div className="pl-6 text-rose-500">Pending...</div>
            )}
          </div>
        </div>
        <div
          className="p-11 flex flex-col rounded-r-[50px] w-1/2 border-ash border-y-2 border-r-2"
          id="showQr"
        >
          <QrCodeComponent campgroundPrice={price} promptpayQr={promptpayQr} />
          <div className="mt-9 text-center">
            <button className="bg-white border-[2px] border-fern px-8 py-1 mr-10 text-fern font-medium rounded-full">
              Cancel
            </button>
            <button
              className="border-[2px] border-fern bg-fern px-10 py-1 text-white font-medium rounded-full"
              onClick={nextUpload}
            >
              Next
            </button>
          </div>
        </div>
        <div
          className="p-11 text-left rounded-r-[50px] w-1/2 border-ash border-y-2 border-r-2 hidden"
          id="upload"
        >
          <div className="mt-8 ml-12 text-2xl text-teal-700 font-semibold">
            Upload new receipt
          </div>
          <div className="mx-10 mb-20">
            <UploadSlip />
          </div>
          <div className="mt-5 text-center">
            <button
              className="bg-white border-[2px] border-fern px-8 py-1 mr-10 text-fern font-medium rounded-full"
              onClick={back}
            >
              Back
            </button>
            <button
              className="bg-white border-[2px] border-rose-500 px-8 py-1 mr-10 text-rose-500 font-medium rounded-full"
              onClick={cancelUpload}
            >
              Cancel
            </button>
            <button
              className="border-[2px] border-fern bg-fern px-10 py-1 text-white font-medium rounded-full"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div
        className={`popup ${
          showPopup ? "" : "hidden"
        } my-20 mx-[30%] py-4 px-5 w-[45%] bg-[#EEFFF7] rounded-lg flex flex-row`}
      >
        <Image
          src="/img/Check.jpg"
          width={32}
          height={32}
          alt="checkbox"
          className="mr-5"
        />
        Successfully upload!
      </div>
    </main>
  );
}
