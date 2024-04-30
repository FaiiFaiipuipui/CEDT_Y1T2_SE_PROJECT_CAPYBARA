import { AnnouncementItem, AnnouncementJson } from "interface";
import AnnouncementCard from "./AnnouncementCard";

export default async function AnnouncementCatalog({
  announcementJson, userRole
}: {
  announcementJson: any;
  userRole: string;
}) {
  const announcementJsonReady = await announcementJson;
  console.log(announcementJsonReady);
  const announcementJsonFiltered = announcementJsonReady?.data.filter(
    (announcementItem: AnnouncementItem) => {
      const startDate = new Date(announcementItem.startDate);
      const endDate = new Date(announcementItem.endDate);
      console.log(announcementItem.title);
      console.log("Now: ", Date.now() - (Date.now() % 86400000));
      console.log("sta: ", startDate.getTime());
      console.log("End: ", endDate.getTime());
      const afterStartRange = Date.now() - (Date.now() % 86400000) >= startDate.getTime(); // StartDate is greater than midnight of today (calculated by: Now in millisecond - millisecond from today midnight till now)
      console.log("afterStartRange: ", afterStartRange);
      const beforeEndRange = (!isNaN(new Date(endDate).getTime()) && new Date(endDate).getTime() !== 0) ? Date.now() + (86400000 - Date.now() % 86400000) <= endDate.getTime() : true // EndDate is lower than end of today (calculated by: Now in millisecond + millisecond now till end of day)
      console.log("beforeEndRange :",  beforeEndRange);
      console.log("\n");
      return afterStartRange && beforeEndRange;
    }
  );

  console.log(announcementJsonFiltered.length);

  return (
    <main>
      {announcementJsonFiltered?.map((announcementItem: AnnouncementItem) => (
        <AnnouncementCard
          key={announcementItem._id}
          title={announcementItem.title}
          campground={announcementItem.campground.name}
          content={announcementItem.content}
          startDate={new Date(announcementItem.startDate)}
          endDate={announcementItem.endDate? new Date(announcementItem.endDate):null}
          campgroundId={announcementItem.campground._id}
          announcementId={announcementItem._id}
          userRole={userRole}
        />
      ))}
    </main>
  );
}
