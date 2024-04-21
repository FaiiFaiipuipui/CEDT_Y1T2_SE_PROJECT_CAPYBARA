import Link from "next/link";
import { CampgroundAppt } from "interface";

export default function TransactionCard({
  tid,
  user,
  campground,
  date,
  status,
  submitImage,
  role,
}: {
  tid: string;
  user: string;
  campground: CampgroundAppt;
  date: Date;
  status: string;
  submitImage: String[];
  role: string;
}) {
  return (
    <main>
      <div className="flex flex-row text-center items-center justify-center space-x-2 space-y-3">
        <div className="w-1/5">
          <div>{user}</div>
        </div>
        <div className="w-1/5">
          <div>{campground.name}</div>
        </div>
        <div className="w-1/5">
          <div>{date.toDateString()}</div>
        </div>
        <div className="w-1/5 items-left justify-left flex px-16">
          {status === "REJECTED" ? (
            <div className="flex flex-row space-x-2">
              <div className="w-5 h-5 bg-rose-500 rounded-full"></div>
              <div className="text-rose-500">{status}</div>
            </div>
          ) : status === "VERIFYING" ? (
            <div className="flex flex-row space-x-2">
              <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
              <div className="text-gray-400">{status}</div>
            </div>
          ) : status === "COMPLETED" ? (
            <div className="flex flex-row space-x-2">
              <div className="w-5 h-5 bg-fern rounded-full"></div>
              <div className="text-fern">{status}</div>
            </div>
          ) : status === "WAITING" ? (
            <div className="flex flex-row space-x-2">
              <div className="w-5 h-5 bg-amber-500 rounded-full"></div>
              <div className="text-amber-500">{status}</div>
            </div>
          ) : (
            <div className="flex flex-row space-x-2">
              <div className="w-5 h-5 bg-caramel rounded-full"></div>
              <div className="text-caramel">{status}</div>
            </div>
          )}
        </div>

        {status === "REJECTED" && role !== "admin" ? (
          <Link href={`/payment/edit?tid=${tid}`} className="w-1/5">
            <button className="justify-center bg-rose-500 border-[2px] border-rose-500 px-8 py-1 text-white font-medium rounded-full hover:shadow-lg">
              Edit
            </button>
          </Link>
        ) : status === "WAITING" && role !== "admin" ? (
          <Link href={`/payment?tid=${tid}`} className="w-1/5">
            <button className="justify-center bg-fern border-[2px] border-fern px-8 py-1 text-white font-medium rounded-full hover:shadow-lg">
              Pay
            </button>
          </Link>
        ) : status === "VERIFYING" ||
          status === "COMPLETED" ||
          role === "admin" ? (
          <Link href={`/transaction/${tid}`} className="w-1/5">
            <button className="justify-center bg-white border-[2px] border-fern px-6 py-1 text-fern font-medium rounded-full hover:shadow-lg">
              Detail
            </button>
          </Link>
        ) : (
          <div className="w-1/5">{role}</div>
        )}
      </div>
    </main>
  );
}
