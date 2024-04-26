import { AnnouncementItem, AnnouncementJson } from "interface";
import AnnouncementCard from "./AnnouncementCard";
import { Html } from "next/document";

export default async function AnnouncementCatalog({
  announcementJson,
}: {
  announcementJson: any;
}) {
  const announcementJsonReady = await announcementJson;

  return (
    <main>
      {announcementJsonReady?.data.map((announcementItem: AnnouncementItem) => (
        <AnnouncementCard
          key={announcementItem._id}
          title={announcementItem.title}
          campground={announcementItem.campground.name}
          content={announcementItem.content}
          endDate={new Date(announcementItem.endDate)}
          campgroundId={announcementItem.campground._id}
          announcementId={announcementItem._id}
        />
      ))}
    </main>
  );
}
