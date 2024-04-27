export default async function updateAnnoucement(
  title: string,
  content: string,
  startDate: Date,
  endDate: Date,
  campgroundId: string,
  announcementId: string,
  token: string) {
  let bodyData = {
    title: title,
    content: content,
    startDate: startDate,
    endDate: endDate,
    campground: campgroundId,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/announcements/${announcementId}`,
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
