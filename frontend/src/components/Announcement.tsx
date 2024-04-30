"use client";
import CreateAnnouncementCard from "./CreateAnnouncementCard";
import { useState } from "react";

export default function Announcement({ profile }: { profile: any }) {
  console.log(profile.data.role);

  const [createButtonIsClicked, setCreateButtonState] =
    useState<boolean>(false);

  const openCreateAnnouncementCard = () => {
    setCreateButtonState(true);
  };

  const closeCreateAnnouncementCard = () => {
    setCreateButtonState(false);
  };

  return (
    <div className="">
      <div className="sticky flex flex-row">
        <div className="text-4xl font-bold my-10 text-left">Announcement</div>
        {profile.data.role === "admin" ? (
          <button
            onClick={(e) => {
              console.log(createButtonIsClicked);
              openCreateAnnouncementCard();
            }}
          >
            <svg
              className="my-10 ml-[75px]"
              width="41"
              height="39"
              viewBox="0 0 41 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="41" height="38.9758" rx="10" fill="#9A5C00" />
              <rect width="41" height="38.9758" rx="10" fill="#009A62" />
              <path
                d="M19.494 24.932V14.4206H22.6759V24.932H19.494ZM15.8293 21.2672V18.0854H26.3406V21.2672H15.8293Z"
                fill="white"
              />
            </svg>
          </button>
        ) : null}
      </div>
      {createButtonIsClicked ? (
        <CreateAnnouncementCard
          closeCreateAnnouncement={closeCreateAnnouncementCard}
          profileName={profile.data.name}
        />
      ) : null}
    </div>
  );
}
