import { AnnouncementItem, AnnouncementJson } from "interface";
import AnnouncementCard from "./AnnouncementCard";
import CreateAnnouncementCard from "./CreateAnnouncementCard";
import { useState } from "react";

export default async function AnnouncementCatalog({
  announcementJson,
}: {
  announcementJson: any;
}) {
  // const [createButtonIsClicked, setCreateButtonState] = useState(false);
  const announcementJsonReady = await announcementJson;

  // const openCreateAnnouncementCard = () => {
  //   setCreateButtonState(true);
  // };

  return (
    <main>
      {/* <button onClick={openCreateAnnouncementCard}>
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
      </button> */}

      {announcementJsonReady?.data.map((announcementItem: AnnouncementItem) => (
        <AnnouncementCard
          key={announcementItem._id}
          title={announcementItem.title}
          campground={announcementItem.campground.name}
          content={announcementItem.content}
          endDate={new Date(announcementItem.endDate)}
        />
      ))}
    </main>
  );
}
