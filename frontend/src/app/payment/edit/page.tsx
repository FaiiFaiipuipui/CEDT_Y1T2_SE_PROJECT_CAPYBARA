"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import getTransaction from "@/libs/getUserTransaction";
import createTransactionSlip from "@/libs/createTransactionSlip";
import createPromptpayQR from "@/libs/createPromptpayQR";
import { PaymentItem } from "interface";
import { useEffect } from "react";

export default function PaymentPage() {
  // This use State is for save image data
  const [imagePreview, setImagePreview] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      setImagePreview(fileReader.result);
      console.log(fileReader.result);
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
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
          className="p-11 text-left flex flex-col rounded-r-[50px] w-1/2 border-ash border-y-2 border-r-2"
          id="showQr"
        >
          <div className="flex flex-row place-items-center">
            <div className="mt-8 ml-12 text-4xl text-teal-700 font-medium">
              Total price
            </div>
            <div className="mt-10 ml-3 text-lg text-lightteal font-semibold">
              (Tax included)
            </div>
          </div>
          {promptpayQr ? (
            <div className="mt-3 ml-12 text-3xl text-gray-700 font-medium">
              THB {price}.00
            </div>
          ) : (
            <div className="mt-3 ml-12 text-xl text-rose-500">Pending...</div>
          )}

          <div className="flex items-center justify-center mt-2 ">
            <div className="relative h-[38vh] w-[38vh]">
              {promptpayQr ? (
                <Image
                  src={`data:image/svg+xml;base64,${promptpayQr}`}
                  alt="qrcode"
                  fill={true}
                  object-fit="contain"
                />
              ) : (
                <div className="mt-10 ml-12 text-xl text-rose-500">
                  Loading QR code...
                </div>
              )}
            </div>
          </div>
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

          {imagePreview ? (
            <div className="flex items-center justify-center">
              <Image
                src={imagePreview}
                alt="Preview Uploaded Image"
                width={280}
                height={370}
                className="mt-5 object-contain"
              ></Image>
              <div
                className="absolute py-2 px-10 rounded-lg bg-gray-100 hover:bg-gray-400 hover:text-white cursor-pointer shadow-lg"
                id="preview_button"
                onClick={openModal}
              >
                Click for Preview
              </div>
            </div>
          ) : (
            <div className="mx-10 mt-5 text-center py-28 bg-emerald-50">
              <button
                className="mt-2 border-[2px] border-fern bg-fern px-10 py-1 text-white rounded-full"
                onClick={() => document.getElementById("upload_slip").click()}
              >
                Browse files
              </button>
              <input
                type="file"
                id="upload_slip"
                className="hidden"
                onChange={(event) => upload(event)}
              />
            </div>
          )}
          <div onClick={closeModal}>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Enlarged Image"
              className="flex items-center justify-center mt-5"
            >
              <div className="flex flex-col items-center justify-center mt-20">
                <Image
                  src={imagePreview}
                  alt="Preview Uploaded Image"
                  width={350}
                  height={350}
                ></Image>
              </div>
            </Modal>
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
