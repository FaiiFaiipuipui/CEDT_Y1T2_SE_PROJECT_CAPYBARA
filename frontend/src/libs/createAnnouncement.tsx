export default async function createAnnouncement(token: string, cid: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${cid}/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Cannot create Announcement");
  }
  return await response.json();
}
