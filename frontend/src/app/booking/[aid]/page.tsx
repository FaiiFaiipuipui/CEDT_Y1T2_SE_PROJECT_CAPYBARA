import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getAppointment from "@/libs/getAppointment";
import Link from "next/link";
import getUserDashboard from "@/libs/getUserDashboard";

export default async function AppointmentDetailPage({
  params,
}: {
  params: { aid: string };
}) {
  const session = await getServerSession(authOptions);
  const profile = await getUserDashboard(session.user.token);
  if (!session || !session.user.token) return null;
  const apptDetail = await getAppointment(params.aid, session.user.token);

  return (
    <main className="text-left mx-[20%] top-[55px] pt-[120px] pb-5">
      <div className="text-4xl font-bold ">Add new campground</div>
      <div className="ml-[10%] my-[10px] text-left text-black">
        <div className="text-md font-medium mt-[20px]">User ID</div>
        <div className="text-md">{JSON.stringify(apptDetail.data.user)}</div>
        <div className="text-md font-medium mt-[20px]">Campground</div>
        <div className="text-md">
          {JSON.stringify(apptDetail.data.campground.name)}
        </div>
        <div className="text-md font-medium mt-[20px]">Date</div>
        <div className="text-md">
          {JSON.stringify(apptDetail.data.apptDate)}
        </div>
      </div>

      <div className="text-center my-20">
        <Link href={"/dashboard"}>
          <button className="bg-white border-[2px] border-emerald-500 px-10 py-1 mr-10 text-emerald-500 font-medium rounded-full hover:bg-emerald-500 hover:text-white">
            Back
          </button>
        </Link>
        <Link href={`/booking/manage/edit?id=${params.aid}`}>
          <button className="border-[2px] border-blue-800 bg-blue-800 px-10 py-1 mr-10 text-white font-medium rounded-full hover:bg-white hover:text-blue-800">
            Edit
          </button>
        </Link>
        <Link href={`/booking/manage/delete?id=${params.aid}`}>
          <button className="border-[2px] border-red-800 bg-red-800 px-10 py-1 text-white font-medium rounded-full hover:bg-white hover:text-red-800">
            Delete
          </button>
        </Link>
      </div>
    </main>
  );
}
