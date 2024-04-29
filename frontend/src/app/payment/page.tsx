"use client";
import { qrcode, checkBox } from "public/img";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { ReactNode, useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { PaymentItem } from "interface";
import {
  createPromptpayQR,
  getTransaction,
  createTransactionSlip,
} from "@/libs";
import {
  QrCodeComponent,
  PaymentInformationDetail,
  UploadSlip,
} from "@/components";

export default function PaymentPage() {
  // This use State is for save image data
  const [imagePreview, setImagePreview] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [rentDate, setRentDate] = useState<Date>();
  const [campgroundName, setCampgroundName] = useState<string>("");
  const [promptpayQr, setPromptpayQr] = useState<ReactNode | null>(null);
  const [campgroundPrice, setCampgroundPrice] = useState<String | null>();

  const router = useRouter();
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

  // This function is for recieve the image data from user

  //   This function just for alert to see what we have got from user.
  //   Note that if in backend wnat to use it, you need to do these steps
  //        1. Convert the URL --> base64
  //        2. Convert base64 --> Buffer
  const handleSubmit = () => {
    console.log("imagePreview ", imagePreview);
    if (imagePreview != null) {
      if (session.user && tid) {
        createTransactionSlip(session.user.token, tid, imagePreview);
        setShowPopup(true);
      }

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
      router.push("/dashboard");
    } else {
      alert("Please upload Slip");
    }
  };

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
          <UploadSlip />
          <div className="flex flex-row p-5 justify-around">
            <button
              className="border border-green-600 border-solid py-1 lg:px-8 px-2 border-2 rounded-[5vh] text-green-700 font-bold hover:cursor-pointer"
              onClick={() => {
                window.location.reload();
              }}
            >
              Cancel
            </button>
            <button
              className="bg-fern py-1 lg:px-8 px-2 border-2 rounded-[5vh] text-white font-bold hover:cursor-pointer"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div
        className={`popup ${
          showPopup ? "" : "hidden"
        } absolute top-2/3 my-[15vh] py-4 px-5 w-[45%] bg-[#EEFFF7] rounded-lg flex flex-row`}
      >
        <Image src={checkBox} alt="checkbox" className="mr-5" />
        Successfully upload!
      </div>
    </div>
  );
}
