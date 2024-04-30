import { AnnouncementItemForCreateAndEdit } from "interface";

export default async function createAnnouncement(
  token: string,
  announcementItemForCreateAndEdit: AnnouncementItemForCreateAndEdit
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/announcements/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: announcementItemForCreateAndEdit.title,
        content: announcementItemForCreateAndEdit.content,
        startDate: announcementItemForCreateAndEdit.startDate,
        endDate: announcementItemForCreateAndEdit.endDate,
        campground: announcementItemForCreateAndEdit.cid,
        author: announcementItemForCreateAndEdit.author,
      }),
    }
  );
  if (!response.ok) {
    // console.log(response);
    throw new Error("Cannot create Announcement");
  }
  return await response.json();
}
