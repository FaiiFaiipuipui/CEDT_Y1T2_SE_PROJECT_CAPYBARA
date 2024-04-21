//"use client";

import Image from "next/image";
import getCampground from "@/libs/getCampground";
import Link from "next/link";
import { profile } from "console";
import { getServerSession } from "next-auth";
import getUserDashboard from "@/libs/getUserDashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CampgroundDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campgroundDetail = await getCampground(params.cid);
  const session = await getServerSession(authOptions);
  const profile = await getUserDashboard(session.user.token);

  return (
    <main>
      <div className="block w-screen h-[550px] relative">
        <Image
          src={campgroundDetail.data.picture}
          alt="Campground Picture"
          fill={true}
          className="object-cover"
        ></Image>
        <div className="relative top-[200px] z-20 text-center text-white text-4xl font-medium">
          {campgroundDetail.data.name}
        </div>
      </div>
      <div className="text-xl font-medium mt-[50px] text-left text-black text-center">
        General Information
      </div>
      <div className="my-[10px] text-left text-black text-center">
        <div className="text-md font-medium mt-[20px]">Name</div>
        <div className="text-md">{campgroundDetail.data.name}</div>
        <div className="flex flex-row justify-center ">
          <div>
            <div className="text-md font-medium mt-[20px]">Province</div>
            <div className="text-md">{campgroundDetail.data.province}</div>
          </div>
          <div className="ml-20">
            <div className="text-md font-medium mt-[20px]">Region</div>
            <div className="text-md">{campgroundDetail.data.region}</div>
          </div>
        </div>
        <div className="text-md font-medium mt-[20px]">Coordinate</div>
        <div className="text-md">{campgroundDetail.data.coordinate}</div>
        <div className="text-md font-medium mt-[20px]">Postal Code</div>
        <div className="text-md">{campgroundDetail.data.postalcode}</div>
        <div className="text-md font-medium mt-[20px]">Phone Number</div>
        <div className="text-md">{campgroundDetail.data.telephone}</div>
      </div>
      <div className="text-center my-20">
        <button className="bg-white border-[2px] border-emerald-500 px-10 py-1 mr-10 text-emerald-500 font-medium rounded-full hover:bg-emerald-500 hover:text-white">
          Back
        </button>
        <Link
          href={`/booking/manage/add?id=${params.cid}&name=${campgroundDetail.data.name}`}
        >
          <button className="border-[2px] border-emerald-800 bg-emerald-800 px-10 py-1 text-white font-medium rounded-full hover:bg-white hover:text-emerald-800">
            Book
          </button>
        </Link>
        {profile.data.role == "admin" ? (
          <>
            <Link
              href={`/campground/manage/edit?id=${params.cid}&name=${campgroundDetail.data.name}`}
            >
              <button className="border-[2px] border-blue-800 bg-blue-800 px-10 py-1 ml-10 mr-10 text-white font-medium rounded-full hover:bg-white hover:text-blue-800">
                Edit
              </button>
            </Link>
            <Link
              href={`/campground/manage/delete?id=${params.cid}&name=${campgroundDetail.data.name}`}
            >
              <button className="border-[2px] border-red-800 bg-red-800 px-10 py-1 text-white font-medium rounded-full hover:bg-white hover:text-red-800">
                Delete
              </button>
            </Link>
          </>
        ) : null}
      </div>
    </main>
  );
}
