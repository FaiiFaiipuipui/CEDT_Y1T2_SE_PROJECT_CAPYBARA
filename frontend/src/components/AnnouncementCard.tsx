"use client";
import deleteAnnouncement from "@/libs/deleteAnnouncement";
import { AnnouncementItem, AnnouncementJson } from "interface";
import { useState } from "react";
import EditAnnouncementCard from "./EditAnnouncementCard";
import { useSession } from "next-auth/react";
import { getUserDashboard } from "@/libs";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default function AnnouncementCard({
  title,
  campground,
  content,
  startDate,
  endDate,
  campgroundId,
  announcementId,
  userRole,
  createdAt,
}: {
  title: string;
  campground: string;
  content: string;
  startDate: Date;
  endDate: Date;
  campgroundId: string;
  announcementId: string;
  userRole: string;
  createdAt: Date;
}) {
  const [hidden, setHidden] = useState<boolean>(false);
  const toggle = () => {
    setHidden(!hidden);
  };
  const { data: session } = useSession();

  const onSubmitDelete = () => {
    try {
      const deleteOne = async () => {
        await deleteAnnouncement(announcementId, session.user.token);
      };
      deleteOne();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Do you confirm your deletion?")) {
      onSubmitDelete();
      alert("Successfully delete Announcement");
    }
  };

  return (
    <div className="">
      {!hidden ? (
        <div className="bg-white rounded-[20px] py-[6%] px-10 my-5 max-w-full min-w-sm w-full border-lg border-green-500">
          <div className="text-left font-semibold text-xl pb-2">{title}</div>
          <div className="border-t-2 border-black pb-2"></div>
          <div className="text-sm font-semibold text-left pb-5">
            {campground}
          </div>
          <div className="text-sm text-left pb-5">{content}</div>
          <div className="flex flex-row justify-between items-center">
            {userRole !== "admin" ? null : (
              <div className="text-sm font-semibold text-center border-solid ">
                Start at{" "}
                <div className="text-xs font-normal">
                  {startDate.toDateString()}
                </div>
              </div>
            )}
            {!isNaN(new Date(endDate).getTime()) &&
            new Date(endDate).getTime() !== 0 ? (
              <div className="text-sm font-semibold text-center">
                Until{" "}
                <div className="text-xs font-normal">
                  {endDate.toDateString()}
                </div>
              </div>
            ) : (
              <div className="text-sm font-semibold text-center">
                Until <div className="text-xs font-normal">-</div>
              </div>
            )}

            {userRole === "admin" ? (
              <div className="flex flex-row z-30">
                <button
                  onClick={() => {
                    toggle();
                  }}
                >
                  <svg
                    className="mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1 9L15 9.9L5.9 19H5V18.1L14.1 9ZM17.7 3C17.5 3 17.2 3.1 17 3.3L15.2 5.1L18.9 8.9L20.7 7C21.1 6.6 21.1 6 20.7 5.6L18.4 3.3C18.2 3.1 17.9 3 17.7 3ZM14.1 6.2L3 17.2V21H6.8L17.8 9.9L14.1 6.2ZM7 2V5H10V7H7V10H5V7H2V5H5V2H7Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    confirmDelete(e);
                  }}
                >
                  <svg
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.2487 20.5833C6.2487 21.158 6.46819 21.7091 6.85889 22.1154C7.24959 22.5217 7.7795 22.75 8.33203 22.75H16.6654C17.2179 22.75 17.7478 22.5217 18.1385 22.1154C18.5292 21.7091 18.7487 21.158 18.7487 20.5833V7.58333H6.2487V20.5833ZM8.33203 9.75H16.6654V20.5833H8.33203V9.75ZM16.1445 4.33333L15.1029 3.25H9.89453L8.85286 4.33333H5.20703V6.5H19.7904V4.33333H16.1445Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <EditAnnouncementCard
          toggle={toggle}
          content={content}
          title={title}
          campgroundName={campground}
          campgroundId={campgroundId}
          startDate={startDate}
          endDate={endDate}
          announcementId={announcementId}
          createdAt={createdAt}
        />
      )}
    </div>
  );
}
