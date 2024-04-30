import Image from "next/image";
import { useState } from "react";
import { Button } from "@mui/material";
import Modal from "react-modal";
import { createTransactionSlip } from "@/libs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Resizer from "react-image-file-resizer";

export default function UploadSlip({
  token,
  tid,
  isEditPage,
}: {
  token: string;
  tid: string;
  isEditPage: boolean;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

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

      console.log("originalFile instanceof Blob", file instanceof Blob); // true
      console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

      //resize image before setImagePreview
      resizeFile(file, (resizedFileBase64) => {
        console.log(
          "Resized file size:" + resizedFileBase64.length / 1024 / 1024 + " MB"
        );
        console.log("Resize Image Base64: " + resizedFileBase64);

        reader.onloadend = () => {
          // setImagePreview(reader.result);
          setImagePreview(resizedFileBase64);
        };

        //Show Image Preview
        if (resizedFileBase64) {
          // Convert base64 string to Blob
          const byteCharacters = atob(resizedFileBase64.split(",")[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/jpeg" });

          reader.readAsDataURL(blob);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (imagePreview != null) {
      if (session.user && tid) {
        createTransactionSlip(token, tid, imagePreview);
        setShowButton(false);
        setShowPopup(true);
      }

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
        router.push("/dashboard");
      }, 3000);
    } else {
      alert("Please upload Slip");
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const back = () => {
    if (isEditPage) {
      document.getElementById("upload").style.display = "none";
      document.getElementById("showQr").style.display = "block";
    } else {
      router.push("/dashboard");
    }
  };

  const cancelUpload = () => {
    setImagePreview(null);
  };
  return (
    <main>
      <div>
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
                accept="image/*"
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
                width={300}
                height={600}
                className="flex items-center justify-center flex-col"
              />
            </div>
          </Modal>
        </div>
      </div>
      {showButton ? (
        <div className="flex mt-5 text-center">
          {isEditPage ? (
            <button
              className="bg-white border-[2px] border-fern px-8 py-1 mr-10 text-fern font-medium rounded-full"
              onClick={back}
            >
              Back
            </button>
          ) : (
            <div className="px-[7%]"></div>
          )}
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
      ) : null}
      <div
        className={`popup ${
          showPopup ? "" : "hidden"
        } my-5 mx-[15%] py-4 px-5 w-[70%] bg-emerald-50 rounded-lg flex flex-row`}
      >
        <Image
          src="/img/Check.jpg"
          width={25}
          height={25}
          alt="checkbox"
          className="mr-5"
        />
        Successfully upload!
      </div>
    </main>
  );
}
