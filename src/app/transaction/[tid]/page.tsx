import Link from "next/link";
import { getServerSession } from "next-auth";
import getUserDashboard from "@/libs/getUserDashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getTransaction from "@/libs/getUserTransaction";
import TransactionCardUser from "@/components/TransactionCardUser";
import TransactionCardAdmin from "@/components/TransactionCardAdmin";
import getTransactionSlip from "@/libs/getTransactionSlip";
import { PaymentItem, PaymentJson, OnePaymentJson } from "interface";

export default async function TransactionPage({
  params,
}: {
  params: { tid: string };
}) {
  const session = await getServerSession(authOptions);
  const transactionJson = await getTransaction(params.tid, session.user.token);
  const transaction = transactionJson.data;
  const status = transaction.status;
  const indexSlipLatest = transaction.submitted_slip_images.length - 1;
  if (indexSlipLatest < 0) {
    return null;
  }

  const imgSlip = transaction.submitted_slip_images[indexSlipLatest].toString();
  const imgData = await getTransactionSlip(imgSlip, session.user.token);

  const profile = await getUserDashboard(session.user.token);
  // console.log("Role: " + profile.data.role);

  return (
    <main className="w-[100vw] h-full flex justify-center items-center px-[45px] ">
      <div className="space-y-[30px] w-[100%] h-[100%] p-[50px] m-50">
        {status === "PENDING" ? (
          <p className="font-bold text-4xl text-left">Transaction Details</p>
        ) : status === "COMPLETE" ? (
          <p className="font-bold text-4xl text-left">Booking Details</p>
        ) : null}

        {/*Detail Card */}
        <div>
          {!profile ? null : (
            <div className="w-full h-full">
              {profile.data.role === "user" ? (
                <div className="w-full space-y-[70px]">
                  <TransactionCardUser
                    status={status}
                    transaction={transaction}
                  />
                  <div className="flex flex-row justify-evenly items-center">
                    <Link href={`/dashboard`}>
                      <button className="bg-white border-[2px] border-emerald-500 px-10 py-1 mr-10 text-emerald-500 font-medium rounded-full hover:shadow-xl">
                        Back
                      </button>
                    </Link>
                  </div>
                </div>
              ) : profile.data.role === "admin" ? (
                <div className="w-full space-y-[70px]">
                  <TransactionCardAdmin
                    status={status}
                    imgBase={imgData}
                    transaction={transaction}
                    price={transactionJson.campgroundPrice}
                  />
                  <div className="flex flex-row justify-center items-center space-x-[100px]">
                    <Link href={`/dashboard`}>
                      <button className="bg-white border-[2px] border-emerald-500 px-10 py-1 mr-10 text-emerald-500 font-medium rounded-full hover:shadow-xl">
                        Back
                      </button>
                    </Link>
                    <Link href={`/dashboard`}>
                      <button className="bg-emerald-500 border-[2px] border-emerald-500 px-10 py-1 mr-10 text-white font-medium rounded-full hover:shadow-xl">
                        Submit
                      </button>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
