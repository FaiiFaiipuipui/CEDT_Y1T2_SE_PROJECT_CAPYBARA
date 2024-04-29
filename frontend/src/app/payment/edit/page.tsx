"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getTransaction, createPromptpayQR } from "@/libs";
import { PaymentItem } from "interface";
import { QrCodeComponent, UploadSlip } from "@/components";
import { Button } from "@mui/material";
import Modal from "react-modal";
import Resizer from "react-image-file-resizer";

export default function PaymentPage() {
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

  const nextUpload = () => {
    document.getElementById("upload").style.display = "block";
    document.getElementById("showQr").style.display = "none";
  };


  const resizeFile = (file, callback) => {
    try {
      Resizer.imageFileResizer(
        file,
        1080,
        1080,
        "JPEG",
        100,
        0,
        (uri) => {
          // Callback with the resized file
          callback(uri);
        },
        "base64"
      );
    } catch (err) {
      console.log("Fail to resize the file: " + err);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();

      console.log('originalFile instanceof Blob', file instanceof Blob); // true
      console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

      //resize image before setImagePreview
      resizeFile(file, (resizedFileBase64) => {
        console.log('Resized file size:' + resizedFileBase64.length / 1024 / 1024 + ' MB');
        console.log('Resize Image Base64: ' + resizedFileBase64);

        reader.onloadend = () => {
          // setImagePreview(reader.result);
          setImagePreview(resizedFileBase64);
        };

        //Show Image Preview
        if (resizedFileBase64) {
          // Convert base64 string to Blob
          const byteCharacters = atob(resizedFileBase64.split(',')[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/jpeg' });

          reader.readAsDataURL(blob);
        }
      });

    }
    catch (err) {
      console.log(err);
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

      <div className="flex flex-row">
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
            <button
              className="bg-white border-[2px] border-fern px-8 py-1 mr-10 text-fern font-medium rounded-full"
              onClick={() => router.push("/dashboard")}
            >
              Back
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
            <UploadSlip
              token={session.user.token}
              tid={tid}
              isEditPage={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
