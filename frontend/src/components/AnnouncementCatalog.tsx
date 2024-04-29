import { AnnouncementItem, AnnouncementJson } from "interface";
import AnnouncementCard from "./AnnouncementCard";

export default async function AnnouncementCatalog({
  announcementJson,
}: {
  announcementJson: any;
}) {
  const announcementJsonReady = await announcementJson;
  console.log(announcementJsonReady);
  const announcementJsonFiltered = announcementJsonReady?.data.filter(
    (announcementItem: AnnouncementItem) => {
      const startDate = new Date(announcementItem.startDate);
      console.log("Now: ", Date.now() - (Date.now() % 86400000));
      console.log("sta: ", startDate.getTime());
      console.log("End: ", announcementItem.endDate);
      return startDate.getTime() >= Date.now() - (Date.now() % 86400000); // StartDate is greater than midnight of today (calculated by: Now in millisecond - millisecond from today midnight till now)
    }
  );
  return (
    <main>
      {announcementJsonFiltered?.map((announcementItem: AnnouncementItem) => (
        <AnnouncementCard
          key={announcementItem._id}
          title={announcementItem.title}
          campground={announcementItem.campground.name}
          content={announcementItem.content}
          startDate={new Date(announcementItem.startDate)}
          endDate={new Date(announcementItem.endDate)}
        />
      ))}
    </main>
  );
}
