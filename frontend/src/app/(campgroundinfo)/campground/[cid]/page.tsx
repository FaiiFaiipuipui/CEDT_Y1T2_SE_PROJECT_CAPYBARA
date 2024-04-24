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
    <main className="flex">
      <div className="w-[60%] h-screen relative">
        <Image
          src={campgroundDetail.data.picture}
          alt="Campground Picture"
          fill={true}
          className="object-cover"
        ></Image>
        <div className="relative top-[40%] z-20 text-center text-white text-4xl font-medium">
          {campgroundDetail.data.name}
        </div>
      </div>
      <div className="w-[40%] h-screen bg-emerald-100">
      <div className="mx-[5%]">
      <div className="text-3xl font-medium mt-[50px] text-left text-black">General Information</div>
      
      <div className=" text-left text-black">
        <div className="text-md font-medium mt-[5px]">Name</div>
        <div className="text-md">{campgroundDetail.data.name}</div>
        <div className="flex flex-row">
        <div>
            <div className="text-md font-medium mt-[5px]">Province</div>
            <div className="text-md">{campgroundDetail.data.province}</div>
          </div>
          <div className="ml-40">
            <div className="text-md font-medium mt-[5px]">Region</div>
            <div className="text-md">{campgroundDetail.data.region}</div>
          </div>
        </div>
        <div className="flex flex-row">
          <div>
            <div className="text-md font-medium mt-[5px]">Coordinate</div>
            <div className="text-md">{campgroundDetail.data.coordinate}</div>
          </div>
          <div className="ml-20">
            <div className="text-md font-medium mt-[5px]">Postal Code</div>
            <div className="text-md">{campgroundDetail.data.postalcode}</div>
          </div>
        </div>
        <div className="text-md font-medium mt-[5px]">Phone Number</div>
        <div className="text-md">{campgroundDetail.data.telephone}</div>
        
      </div>
      
      <div className="text-center my-5">
        <Link
          href={`/campground`}
        >
          <button className="bg-white border-[2px] border-emerald-500 px-5 py-1 text-emerald-500 font-medium rounded-full hover:bg-emerald-500 hover:text-white">
            Back
          </button>
        </Link>
        <Link
          href={`/booking/manage/add?id=${params.cid}&name=${campgroundDetail.data.name}`}
        >
          <button className="border-[2px] border-emerald-800 bg-emerald-800 px-5 py-1 mr-6 ml-6 text-white font-medium rounded-full hover:bg-white hover:text-emerald-800">
            Book
          </button>
        </Link>
        {profile.data.role == "admin" ? (
          <>
            <Link
              href={`/campground/manage/edit?id=${params.cid}&name=${campgroundDetail.data.name}`}
            >
              <button className="border-[2px] border-blue-800 bg-blue-800 px-5 py-1 text-white font-medium rounded-full hover:bg-white hover:text-blue-800">
                Edit
              </button>
            </Link>
            <Link
              href={`/campground/manage/delete?id=${params.cid}&name=${campgroundDetail.data.name}`}
            >
              <button className="border-[2px] border-red-800 bg-red-800 px-5 py-1 ml-6 mr-6 text-white font-medium rounded-full hover:bg-white hover:text-red-800">
                Delete
              </button>
            </Link>
          </>
        ) : null}
        <div className="text-3xl font-medium mt-[50px] text-left text-black">Announcement</div>
        <div className="h-[270px] overflow-y-auto">
        <div className="bg-white rounded-[20px] py-6 px-10 my-5 max-w-lg min-w-sm w-full border-lg border-green-500">
                <div className="text-left font-semibold text-xl pb-2">อุทยานแห่งชาติคลองลาน จังหวัดกำแพงเพชร</div>
                <div className="border-t-2 border-black pb-2"></div>
                <div className="text-sm text-left pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. 
                    Duis aute irure dolor in reprehenderit in </div>
                    <div className="flex flex-wrap">
                        <div className="pb-2 text-left pr-[33%]">until 25 Apr | 8 pm </div>
                        <div className="flex flex-row right-0 z-30">
                        <button>
                        <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1 9L15 9.9L5.9 19H5V18.1L14.1 9ZM17.7 3C17.5 3 17.2 3.1 17 3.3L15.2 5.1L18.9 8.9L20.7 7C21.1 6.6 21.1 6 20.7 5.6L18.4 3.3C18.2 3.1 17.9 3 17.7 3ZM14.1 6.2L3 17.2V21H6.8L17.8 9.9L14.1 6.2ZM7 2V5H10V7H7V10H5V7H2V5H5V2H7Z" fill="black"/>
                        </svg>
                        </button>
                        <button>
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.2487 20.5833C6.2487 21.158 6.46819 21.7091 6.85889 22.1154C7.24959 22.5217 7.7795 22.75 8.33203 22.75H16.6654C17.2179 22.75 17.7478 22.5217 18.1385 22.1154C18.5292 21.7091 18.7487 21.158 18.7487 20.5833V7.58333H6.2487V20.5833ZM8.33203 9.75H16.6654V20.5833H8.33203V9.75ZM16.1445 4.33333L15.1029 3.25H9.89453L8.85286 4.33333H5.20703V6.5H19.7904V4.33333H16.1445Z" fill="black"/>
                        </svg>
                        </button>
                    </div>
                    </div>
            </div>
            <div className="bg-white rounded-[20px] py-6 px-10 my-5 max-w-lg min-w-sm w-full border-lg border-green-500">
                <div className="text-left font-semibold text-xl pb-2">อุทยานแห่งชาติคลองลาน จังหวัดกำแพงเพชร</div>
                <div className="border-t-2 border-black pb-2"></div>
                <div className="text-sm text-left pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. 
                    Duis aute irure dolor in reprehenderit in </div>
                    <div className="flex flex-wrap">
                        <div className="pb-2 text-left pr-[33%]">until 25 Apr | 8 pm </div>
                        <div className="flex flex-row right-0 z-30">
                        <button>
                        <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1 9L15 9.9L5.9 19H5V18.1L14.1 9ZM17.7 3C17.5 3 17.2 3.1 17 3.3L15.2 5.1L18.9 8.9L20.7 7C21.1 6.6 21.1 6 20.7 5.6L18.4 3.3C18.2 3.1 17.9 3 17.7 3ZM14.1 6.2L3 17.2V21H6.8L17.8 9.9L14.1 6.2ZM7 2V5H10V7H7V10H5V7H2V5H5V2H7Z" fill="black"/>
                        </svg>
                        </button>
                        <button>
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.2487 20.5833C6.2487 21.158 6.46819 21.7091 6.85889 22.1154C7.24959 22.5217 7.7795 22.75 8.33203 22.75H16.6654C17.2179 22.75 17.7478 22.5217 18.1385 22.1154C18.5292 21.7091 18.7487 21.158 18.7487 20.5833V7.58333H6.2487V20.5833ZM8.33203 9.75H16.6654V20.5833H8.33203V9.75ZM16.1445 4.33333L15.1029 3.25H9.89453L8.85286 4.33333H5.20703V6.5H19.7904V4.33333H16.1445Z" fill="black"/>
                        </svg>
                        </button>
                    </div>
                    </div>
            </div>
            </div>
        </div>
      </div>
      </div>
      
    </main>
  );
}
