import Image from "next/image";
import { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-modal";

export default function UploadSlip() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="">
      <div className="">
        {imagePreview ? (
          <div className="flex items-center justify-center">
            <Image
              src={imagePreview}
              alt="Uploaded Image"
              width={150}
              height={300}
              className="relative mt-10"
            />
            <div
              className="absolute py-2 px-10 rounded-lg bg-gray-100 hover:bg-gray-400 hover:text-white cursor-pointer shadow-lg"
              onClick={openModal}
            >
              <span className="text-lg font-medium ">Click for Preview</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center bg-emerald-50 w-full min-h-[30vh] mt-8 cursor-default normal-case rounded-[20px]">
            <button
              className="mt-2 border-[2px] border-fern bg-fern px-10 py-2 text-white rounded-full"
              onClick={() => document.getElementById("file-upload").click()}
            >
              Browse file
            </button>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleFileUpload(event)}
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
            <div className="flex items-center justify-center h-[100vh]">
              <Image
                src={imagePreview}
                alt="Uploaded Image"
                width={300}
                height={600}
                className="flex items-center justify-center flex-col"
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
