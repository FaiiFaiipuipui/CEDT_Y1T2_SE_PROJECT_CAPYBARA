"use client";
import { useState } from "react";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import Image from "next/image";
import updateTransaction from "@/libs/updateTransaction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PaymentItem } from "interface";

export default function TransactionCardAdmin({
  token,
  status,
  imgBase,
  transaction,
  price,
}: {
  token: string;
  status: string;
  imgBase: any;
  transaction: PaymentItem;
  price: string;
}) {
  const router = useRouter();

  const [value, setValue] = useState<string>(status);
  const imgArr = imgBase.data.slip_image.data;

  // Convert the array to a Uint8Array
  const uint8Array = new Uint8Array(imgArr);

  // Convert the Uint8Array to a base64 string
  let base64String = "";
  for (let i = 0; i < uint8Array.length; i++) {
    base64String += String.fromCharCode(uint8Array[i]);
  }
  const finalBase64String = btoa(base64String);

  // console.log("img:" + imgBase.data.slip_image.data);
  // console.log('Base64: '+ finalBase64String);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    const updateStatus = updateTransaction(transaction._id, token, value);

    router.push("/dashboard");
  };

  return (
    <main>
      <div className="w-[100%] h-[100%] min-w-[320px] min-h-[550px]  flex flex-row justify-center items-start space-x-[20px]">
        <div className="w-[75%] bg-white min-h-[550px] rounded-[50px] flex flex-row justify-start border border-2">
          <div className="w-[40%] min-w-[350px] rounded-l-[50px] p-auto flex justify-center items-center">
            <Image
              src={base64String}
              alt="Slip Preview"
              width={0}
              height={0}
              style={{
                width: "270px",
                height: "auto",
                objectFit: "contain",
                borderRadius: "30px",
              }}
            />
          </div>

          <div className="w-[60%] min-w-[500px] flex flex-col ">
            <div className="flex flex-col justify-center items-center p-[50px]">
              <div className="w-full h-full grid grid-cols-2 justify-center items-start text-left space-y-[10px]">
                <div className="col-span-2 text-4xl font-bold text-fern">
                  Customer Information
                </div>
                <div className="col-span-2 font-semibold text-black text-xl">
                  User&apos;s Name
                </div>
                <div className="col-span-2 font-normal text-black text-xl">
                  {transaction.user.name}
                </div>
                <div className="col-span-2 flex flex-row justify-between items-center">
                  <div className="flex flex-col pr-[30px]">
                    <p className="font-semibold text-black text-xl">
                      Campground
                    </p>
                    <p className="font-normal text-black text-xl">
                      {transaction.campground.name}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-black text-xl">Date</p>
                    <p className="font-normal text-black text-xl">
                      {new Date(transaction.rent_date).getDate() +
                        "/" +
                        new Date(transaction.rent_date).getMonth() +
                        "/" +
                        new Date(transaction.rent_date).getFullYear()}
                    </p>
                  </div>
                </div>
                <div className="col-span-2"></div>
                <div className="col-span-2 text-4xl font-bold text-fern">
                  Payment
                </div>
                <div className="col-span-2 flex flex-row justify-between items-center">
                  <div className="font-normal text-black text-xl">
                    Campground booking
                  </div>
                  <div className="font-normal text-black text-xl">
                    {price + " THB"}
                  </div>
                </div>
                <div className="col-span-2 flex flex-row justify-between items-center">
                  <div className="font-normal text-black text-xl">
                    Taxes & Fee
                  </div>
                  <div className="font-normal text-black text-xl">0 THB</div>
                </div>
                <hr className="col-span-2" />
                <div className="col-span-2 flex flex-row justify-between items-center">
                  <div className="font-bold text-black text-xl">Total</div>
                  <div className="font-bold text-black text-xl">
                    {price + " THB"}
                  </div>
                </div>
              </div>
            </div>
            <div
              id="tagStatus"
              className={`w-full py-[20px] rounded-br-[50px] bg-opacity-60 ${
                value === "VERIFYING"
                  ? "bg-[#BDBDBD]"
                  : value === "REJECTED"
                  ? "bg-[#FF0000]"
                  : "bg-fern"
              }`}
            >
              <div className="">
                {value === "VERIFYING" ? (
                  <div className="flex flex-row justify-center items-center space-x-[20px]">
                    <PendingIcon sx={{ fontSize: "50px", color: "#626262" }} />
                    <div className="font-bold text-[40px] text-white drop-shadow-md">
                      Payment Pending
                    </div>
                  </div>
                ) : value === "REJECTED" ? (
                  <div className="flex flex-row justify-center items-center space-x-[20px]">
                    {" "}
                    <CancelIcon sx={{ fontSize: "50px", color: "#B72323" }} />
                    <div className="font-bold text-[40px] text-white drop-shadow-md">
                      Payment Rejected
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-center items-center space-x-[20px]">
                    <CheckCircleIcon
                      sx={{ fontSize: "50px", color: "#29FB57" }}
                    />
                    <div className="font-bold text-[40px] text-white drop-shadow-md">
                      Payment Completed
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[550px] w-[25%] min-w-[350px] border border-2  rounded-[50px] pt-[30px] px-[20px] text-center">
          <p className="text-[32px] font-semibold">Transaction Status</p>
          <hr />
          <RadioGroup
            name="transactionStatus"
            sx={{ margin: "10px 0px 0px 20px" }}
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="COMPLETED"
              label="Completed"
              control={<Radio data-testid="completed-radio" />}
            />
            <FormControlLabel
              value="REJECTED"
              label="Rejected"
              control={<Radio data-testid="rejected-radio" />}
            />
          </RadioGroup>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mt-10 space-x-[100px]">
        <Link href={`/dashboard`}>
          <button className="bg-white border-[2px] border-emerald-500 px-10 py-1 mr-10 text-emerald-500 font-medium rounded-full hover:shadow-xl">
            Back
          </button>
        </Link>

        <button
          className="bg-emerald-500 border-[2px] border-emerald-500 px-10 py-1 mr-10 text-white font-medium rounded-full hover:shadow-xl"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </main>
  );
}
