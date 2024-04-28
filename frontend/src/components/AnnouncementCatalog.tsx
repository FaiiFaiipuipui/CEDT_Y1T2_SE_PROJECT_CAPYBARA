import { AnnouncementItem, AnnouncementJson } from "interface";
import AnnouncementCard from "./AnnouncementCard";

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
        />
      ))}
    </main>
  );
}
