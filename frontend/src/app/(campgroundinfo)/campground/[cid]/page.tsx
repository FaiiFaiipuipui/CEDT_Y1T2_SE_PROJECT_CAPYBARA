import Image from "next/image";
import getCampground from "@/libs/getCampground";
import Link from "next/link";
import { profile } from "console";
import { getServerSession } from "next-auth";
import getUserDashboard from "@/libs/getUserDashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AnnouncementCatalog from "@/components/AnnouncementCatalog";
import EditAnnouncementCard from "@/components/EditAnnouncementCard";
import CreateAnnouncementCard from "@/components/CreateAnnouncementCard";
import getAnnouncement from "@/libs/getAnnouncement";
import { AnnouncementItemForCreateAndEdit } from "interface";
import Announcement from "@/components/Announcement";

export default async function CampgroundDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campgroundDetail = await getCampground(params.cid);
  const announcement = await getAnnouncement(params.cid);
  const session = await getServerSession(authOptions);
  const profile = await getUserDashboard(session.user.token);

  return (
    <main className="flex inset-0">
      <div className="w-[60%] h-screen relative">
        <Image
          src={campgroundDetail.data.picture}
          alt="Campground Picture"
          fill={true}
          className="object-cover"
        ></Image>
        <div className="relative top-[40%] z-20 text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-4xl font-medium">
          {campgroundDetail.data.name}
        </div>
      </div>
      <div className="w-[40%] h-screen bg-cadetblue">
        <div className="mx-[5%]">
          <div className="text-3xl font-medium mt-[50px] text-left text-black">
            General Information
          </div>

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
                <div className="text-md">
                  {campgroundDetail.data.coordinate}
                </div>
              </div>
              <div className="ml-20">
                <div className="text-md font-medium mt-[5px]">Postal Code</div>
                <div className="text-md">
                  {campgroundDetail.data.postalcode}
                </div>
              </div>
            </div>
            <div className="text-md font-medium mt-[5px]">Phone Number</div>
            <div className="text-md">{campgroundDetail.data.telephone}</div>
          </div>

          <div className="text-center my-5">
            <div className="h-[300px] overflow-y-auto mt-10">
              <div className="bg-emerald-100 rounded-[20px] py-6 px-10 my-5 max-w-lg min-w-sm w-full border-lg border-green-500">
                <div className="flex flex-row"></div>
                <Announcement profile={profile} />
                <AnnouncementCatalog
                  announcementJson={announcement}
                  userRole={profile.data.role}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row text-center justify-center">
            <Link href={`/campground`}>
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
          </div>
        </div>
      </div>
    </main>
  );
}
