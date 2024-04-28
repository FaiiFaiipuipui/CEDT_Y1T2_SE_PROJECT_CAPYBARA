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
import { Button } from "@mui/material";
import Modal from "react-modal";
import Resizer from "react-image-file-resizer";

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
    } else {
      alert("Please upload Slip");
    }
    router.push("/dashboard");
  };

  const resizeFile = (file, callback) => {
    try {
      Resizer.imageFileResizer(
        file,
        1080,
        1080,
        "JPEG",
        25,
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
            Please upload your receipt{" "}
          </div>
          <div className="">
            <div className="">
              {imagePreview ? (
                <div className="flex items-center justify-center">
                  <Image
                    src={imagePreview}
                    alt="Uploaded Image"
                    width={500}
                    height={500}
                    className="relative mt-10 object-contain max-h-[500px]"
                  />
                  <div
                    className="absolute py-2 px-10 rounded-lg bg-gray-100 hover:bg-gray-400 hover:text-white cursor-pointer shadow-lg"
                    onClick={openModal}
                  >
                    <span className="text-lg font-medium ">Click for Preview</span>
                  </div>
                </div>
              ) : (
                <Button
                  variant="contained"
                  component="label"
                  className="bg-emerald-50 w-[100%] min-h-[30vh] mt-8 hover:bg-emerald-50 flex flex-col text-black cursor-default normal-case rounded-[20px]"
                >
                  <label
                    htmlFor="file-upload"
                    className="w-[10vw] h-[5vh] flex items-center justify-center block rounded-[20vh] bg-[#009a62] p-2 mt-2 text-white cursor-pointer shadow-xl"
                  >
                    <span>Browse file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={(event) => handleFileUpload(event)}
                    />
                  </label>
                </Button>
              )}
              <div onClick={closeModal}>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Enlarged Image"
                  className="flex items-center justify-center mt-5"
                >
                  <div className="flex items-center justify-center h-[100vh]">
                    <Image
                      src={imagePreview}
                      alt="Uploaded Image"
                      width={0}
                      height={0}
                      className="flex items-center justify-center flex-col h-1/2 w-auto "
                    />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <div className="flex flex-row p-5 justify-around">
            <div
              className="border border-green-600 border-solid py-1 lg:px-8 px-2 border-2 rounded-[5vh] text-green-700 font-bold hover:cursor-pointer"
              onClick={() => {
                setImagePreview(null);
              }}
            >
              {" "}
              Cancel{" "}
            </div>
            <div
              className="bg-fern py-1 lg:px-8 px-2 border-2 rounded-[5vh] text-white font-bold hover:cursor-pointer"
              onClick={() => {
                handleSubmit();
                // router.push("/dashboard");
              }}
            >
              {" "}
              Submit{" "}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`popup ${showPopup ? "" : "hidden"
          } absolute top-2/3 my-[15vh] py-4 px-5 w-[45%] bg-[#EEFFF7] rounded-lg flex flex-row`}
      >
        <Image src={checkBox} alt="checkbox" className="mr-5" />
        Successfully upload!
      </div>
    </div>
  );
}

