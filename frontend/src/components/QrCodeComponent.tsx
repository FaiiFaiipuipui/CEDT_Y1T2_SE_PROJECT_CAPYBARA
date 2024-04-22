import Image from "next/image";
import { ReactNode } from "react";
export default function QrCodeComponent({
  campgroundPrice,
  promptpayQr,
}: {
  campgroundPrice: String | null;
  promptpayQr: ReactNode | null;
}) {
  return (
    <div className="">
      {/* Second column */}
      <div className="pt-7 pl-6 flex flex-col ">
        <div className="text-4xl text-teal-700 font-semibold text-left">
          Total Price{" "}
          <span className="font-medium text-lg text-[#80bab0]">
            (Tax included)
          </span>
        </div>
        <div className="text-5xl text-black font-medium mt-2 text-left">
          {campgroundPrice ? `${campgroundPrice} THB` : "Please wait..."}
        </div>

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
              <p>Loading QR code...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
