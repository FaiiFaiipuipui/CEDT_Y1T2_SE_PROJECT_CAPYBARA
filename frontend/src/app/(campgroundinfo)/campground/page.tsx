// "use client";

import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserDashboard from "@/libs/getUserDashboard";
import Announcement from "@/components/Announcement";
import CreateAnnouncementCard from "@/components/CreateAnnouncementCard";
import EditAnnouncementCard from "@/components/EditAnnouncementCard";
import AnnouncementCatalog from "@/components/AnnouncementCatalog";
import getAnnouncements from "@/libs/getAnnouncements";

export default async function Campground() {
  const campgrounds = getCampgrounds(50);
  const announcements = getAnnouncements();
  const session = await getServerSession(authOptions);
  const profile = await getUserDashboard(session.user.token);
  // const [createButtonIsClicked, setCreateButtonState] = useState(false);
  // const [campgrounds, setCampgrounds] = useState([]);
  // const [profile, setProfile] = useState(null);

  if (!campgrounds) return null;

  // useEffect(() => {
  //   getCampgrounds(50)
  //     .then((campgrounds) => setCampgrounds(campgrounds))
  //     .catch((error) => console.error("Error fetching campgrounds:", error));

  //   getServerSession(authOptions)
  //     .then((session) => getUserDashboard(session.user.token))
  //     .then((profile) => setProfile(profile))
  //     .catch((error) => console.error("Error fetching profile:", error));
  // }, []);

  // const openCreateAnnouncementCard = () => {
  //   setCreateButtonState(true);
  // };

  return (
    <main className="text-center p-5 mx-[4%] flex flex-row">
      <div className="bg-cadetblue rounded-[20px] py-2 pl-10 pr-6 my-10 w-[35%] flex flex-col h-full">
        <div className="flex flex-col my-[3%] h-[700px] overflow-y-auto pr-2">
          <Announcement />
          <AnnouncementCatalog announcementJson={announcements} />
          <CreateAnnouncementCard />
          <EditAnnouncementCard />
        </div>
      </div>

      <div className="ml-[5%]">
        <div className="text-4xl font-bold mt-10 mb-5 text-left">
          Campground
        </div>

        {profile.data.role == "admin" ? (
          <Link href="/campground/manage/add">
            <button className="absolute top-[17%] right-[6%] bg-emerald-500 px-4 py-1 text-white font-medium rounded-full hover:bg-white hover:text-emerald-500 border-[2px] border-emerald-500">
              Add Campground
            </button>
          </Link>
        ) : null}
        <Suspense
          fallback={
            <p>
              Loading...
              <LinearProgress />
            </p>
          }
        >
          <CampgroundCatalog campgroundJson={campgrounds} />
        </Suspense>
      </div>
    </main>
  );
}
