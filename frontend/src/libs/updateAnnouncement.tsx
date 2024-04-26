import { AnnouncementItem } from "interface";

export default async function updateAnnoucement(announcementItem:AnnouncementItem, id: string, token: string) {
  let bodyData = {
    title: announcementItem.title,
    content: announcementItem.content,
    startDate: announcementItem.startDate,
    endDate: announcementItem.endDate,
    campground: announcementItem.campground,
    author: announcementItem.author
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/announcements/${id}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }
  );

  if (!response.ok) {
    throw new Error("Cannot update announcement");
  }

  return await response.json();
}
