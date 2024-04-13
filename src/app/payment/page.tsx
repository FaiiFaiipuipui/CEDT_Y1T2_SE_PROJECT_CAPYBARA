"use client";
import { qrcode, checkBox } from "public/img";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@mui/material";
import React, { useState } from "react";

export default function PaymentPage() {
  // This use State is for save image data
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  // This function is for recieve the image data from user
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  //   This function just for alert to see what we have got from user.
  //   Note that if in backend wnat to use it, you need to do these steps
  //        1. Convert the URL --> base64
  //        2. Convert base64 --> Buffer
  const handleSubmit = () => {
    if (imagePreview != null) {
      alert(`Submit Image: ${imagePreview}`);
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
      <div className="flex border border-black border-solid w-full grid grid-cols-3 gap-3 flex mt-10 rounded-2xl">
        {/* The first col */}
        <div className="bg-[#9DCAC2] w-[100%] h-[100%] rounded-l-2xl">
          <div className="flex flex-row font-bold pt-7 pl-6">User</div>
          <div className="pl-6">User1</div>

          <div className="flex flex-row font-bold pt-4 pl-6">UserID</div>
          <div className="pl-6">7894sdafsdaf45665644adsf</div>

          <div className="flex flex-row font-bold pt-4 pl-6">Date</div>
          <div className="pl-6">01/01/1111</div>

          <div className="flex flex-row font-bold pt-4 pl-6">Campground</div>
          <div className="pl-6">อุทยานแห่งชาติหาดนพรัตน์ธารา-หมู่เกาะพีพี</div>
          <div className="mt-10">
            <div className="text-sm text-[#007662] flex flex-row pl-6 font-semibold">
              {" "}
              <span className="h-[3vh] w-[3vh] flex mr-2">
                <Image src={checkBox} alt="checkbox" />
              </span>
              Cannot be refunded
            </div>
            <div className="text-sm text-[#007662] flex flex-row mt-2 pl-6 font-semibold">
              {" "}
              <span className="h-[3vh] w-[3vh] flex mr-2">
                <Image src={checkBox} alt="checkbox" />
              </span>{" "}
              Estimated ticketing time less than 2 Days
            </div>
          </div>
        </div>

        {/* Second column */}
        <div className="pt-7 pl-6 flex flex-col ">
          <div className="text-4xl text-[#007662] font-semibold text-left">
            Total Price{" "}
            <span className="font-medium text-lg text-[#9DCAC2]">
              (Tax included)
            </span>
          </div>
          <div className="text-5xl text-black font-medium mt-2 text-left">
            THB 100.00
          </div>

          <div className="flex items-center justify-center mt-2">
            <Image src={qrcode} alt="qrcode" className="h-[38vh] w-[38vh] " />
          </div>
        </div>
        {/* Third Column */}
        <div className="flex justify-center flex-col pr-[5vw]">
          <div className="pt-7 font-medium text-xl">
            Please upload your receipt{" "}
          </div>
          <div className="flex ">
            <Button
              variant="contained"
              component="label"
              className="bg-[#ECFDF5] w-[100%] min-h-[30vh] mt-8 hover:bg-[#C5FFE4] flex flex-col text-black cursor-default normal-case"
            >
              {/* This function is for adding display the input image, so that user can preview what they have input recently*/}
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded Image"
                  className="px-2  h-[80%]"
                />
              ) : (
                <div className="flex flex-row justify-center items-center pb-0.5">
                  <span className="h-[1.5vh] w-[3vh] flex">
                    <Image
                      src="/img/image.png"
                      alt="image"
                      width={11}
                      height={15}
                    />
                  </span>{" "}
                  filename.jpg
                </div>
              )}
              <label
                htmlFor="file-upload"
                className="w-[10vw] h-[5vh] flex items-center justify-center block rounded-[20vh] bg-green-500 p-2 mt-2 text-white cursor-pointer hover:bg-green-700 shadow-xl"
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
          </div>
          <div className="flex flex-row p-10 justify-around">
            <div className="border border-green-600 border-solid py-1 lg:px-8 px-2 border-2 rounded-[5vh] text-green-700 font-bold hover:cursor-pointer">
              {" "}
              Cancel{" "}
            </div>
            <div
              className="bg-green-600  py-1 lg:px-8 px-2 border-2 rounded-[5vh] text-white font-bold hover:cursor-pointer"
              onClick={() => handleSubmit()}
            >
              {" "}
              Confirm{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
