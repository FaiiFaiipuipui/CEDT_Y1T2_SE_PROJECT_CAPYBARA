import { AnnouncementItem, AnnouncementJson } from "interface";
import AnnouncementCard from "./AnnouncementCard";
import { Html } from "next/document";

export default async function AnnouncementCatalog({
  announcementJson, userRole
}: {
  announcementJson: any;
  userRole: string;
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
          startDate={new Date(announcementItem.startDate)}
          endDate={new Date(announcementItem.endDate)}
          campgroundId={announcementItem.campground._id}
          announcementId={announcementItem._id}
          userRole={userRole}
        />
      ))}
    </main>
  );
}
