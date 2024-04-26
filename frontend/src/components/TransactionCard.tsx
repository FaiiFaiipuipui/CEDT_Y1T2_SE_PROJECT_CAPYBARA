import Link from "next/link";
import { CampgroundAppt, TransactionAppt } from "interface";

export default function TransactionCard({
  user,
  campground,
  date,
  transaction,
  role,
}: {
  user: string;
  campground: CampgroundAppt;
  date: Date;
  transaction?: TransactionAppt | null;
  role: string;
}) {
  return (
    <div>
      {
        transaction === null ?
          <div>
            <div className="flex flex-row text-center items-center justify-center my-5">
              <div className="w-1/5">
                <div>{user}</div>
              </div>
              <div className="w-1/5">
                <div>{campground.name}</div>
              </div>
              <div className="w-1/5">
                <div>{date.toDateString()}</div>
              </div>
              <div className="w-2/5 items-left justify-left flex px-16">
                Do not have a transaction yet
              </div>
            </div>
          </div> :
          <div className="flex flex-row text-center items-center justify-center my-5">
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
              {transaction.status === "REJECTED" ? (
                <div className="flex flex-row space-x-2">
                  <div className="w-5 h-5 bg-rose-500 rounded-full"></div>
                  <div className="text-rose-500">{transaction.status}</div>
                </div>
              ) : transaction.status === "VERIFYING" ? (
                <div className="flex flex-row space-x-2">
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                  <div className="text-gray-400">{transaction.status}</div>
                </div>
              ) : transaction.status === "COMPLETED" ? (
                <div className="flex flex-row space-x-2">
                  <div className="w-5 h-5 bg-fern rounded-full"></div>
                  <div className="text-fern">{transaction.status}</div>
                </div>
              ) : transaction.status === "WAITING" ? (
                <div className="flex flex-row space-x-2">
                  <div className="w-5 h-5 bg-amber-500 rounded-full"></div>
                  <div className="text-amber-500">{transaction.status}</div>
                </div>
              ) : (
                <div className="flex flex-row space-x-2">
                  <div className="w-5 h-5 bg-caramel rounded-full"></div>
                  <div className="text-caramel">{transaction.status}</div>
                </div>
              )}
            </div>

            {transaction.status === "REJECTED" && role !== "admin" ? (
              <Link href={`/payment/edit?tid=${transaction._id}`} className="w-1/5">
                <button className="justify-center bg-rose-500 border-[2px] border-rose-500 px-8 py-1 text-white font-medium rounded-full hover:shadow-lg">
                  Edit
                </button>
              </Link>
            ) : transaction.status === "WAITING" && role !== "admin" ? (
              <Link href={`/payment?tid=${transaction._id}`} className="w-1/5">
                <button className="justify-center bg-fern border-[2px] border-fern px-8 py-1 text-white font-medium rounded-full hover:shadow-lg">
                  Pay
                </button>
              </Link>
            ) : transaction.status === "WAITING" ? <div className="w-1/5"></div> :transaction.status === "VERIFYING" ||
            transaction.status === "COMPLETED" ||
              role === "admin" ? (
              <Link href={`/transaction/${transaction._id}`} className="w-1/5">
                <button className="justify-center bg-white border-[2px] border-fern px-6 py-1 text-fern font-medium rounded-full hover:shadow-lg">
                  Detail
                </button>
              </Link>
            ) : (
              <div className="w-1/5">{role}</div>
            )}
          </div>
      }
    </div>
  );
}
