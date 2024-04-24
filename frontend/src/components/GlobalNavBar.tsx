import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Link } from "@mui/material";

async function GlobalNavBar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="top-0 w-full h-[55px] bg-green-50 rounded-full fixed flex flex-row justify-start items-center z-40 p-1 gap-x-3 mt-2 drop-shadow-xl">
      <Link href="/">
        <Image
          src="/img/logo.svg"
          alt="Logo"
          width="160"
          height="100"
          className="rounded-full inline bg-white border border-emerald-500"
          priority
        />
      </Link>
      {session ? (
      <Link href="/booking">
        <button className="transition h-[90%] w-[200px] text-emerald-500 text-lg font-black bg-white rounded-full border-white border-4 ring-4 ring-emerald-500 hover:bg-emerald-500 hover:text-white hover:text-xl">
          <p className=" ">BOOKING</p>
        </button>
      </Link>
      ): null}
      <Link href="/campground">
        <button className="transition h-[90%] w-[200px] text-emerald-500 text-lg font-black bg-white rounded-full border-white border-4 ring-4 ring-emerald-500 hover:bg-emerald-500 hover:text-white hover:text-xl">
          <p className=" ">CAMPGROUND</p>
        </button>
      </Link>
      <Link href="/aboutUs">
        <button className="transition h-[90%] w-[170px] text-emerald-500 text-lg font-black bg-white rounded-full border-white border-4 ring-4 ring-emerald-500 hover:bg-emerald-500 hover:text-white hover:text-xl">
          <p className=" ">ABOUT US</p>
        </button>
      </Link>

      <div className="ml-auto p-2 flex items-center">
        {session ? (
          <>
            <Link href="/dashboard">
              <button className="transition h-[90%] w-[200px] text-emerald-500 text-xl font-black bg-white rounded-full border-white border-4 ring-4 ring-emerald-500 hover:bg-emerald-500 hover:text-white hover:text-2xl mr-3">
                <p className=" ">DASHBOARD</p>
              </button>
            </Link>
            <Link href="/api/auth/signout">
              <button className="transition h-[90%] w-[170px] text-rose-500 text-lg font-black bg-white rounded-full border-white border-4 ring-4 ring-rose-500 hover:bg-rose-500 hover:text-white hover:text-xl">
                <p className=" ">SIGN OUT</p>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/register">
              <button className="transition h-[90%] w-[170px] text-cyan-500 text-xl font-black bg-white rounded-full border-white border-4 ring-4 ring-cyan-500 hover:bg-cyan-500 hover:text-white hover:text-2xl mr-3">
                <p className=" ">REGISTER</p>
              </button>
            </Link>
            <Link href="/api/auth/signin">
              <button className="transition h-[90%] w-[170px] text-blue-500 text-lg font-black bg-white rounded-full border-white border-4 ring-4 ring-blue-500 hover:bg-blue-500 hover:text-white hover:text-xl ">
                <p className=" ">SIGN IN</p>
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default GlobalNavBar;
