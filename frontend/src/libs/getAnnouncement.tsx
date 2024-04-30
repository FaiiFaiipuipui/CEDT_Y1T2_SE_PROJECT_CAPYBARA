export default async function getAnnouncement(cid: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${cid}/announcements`,{
      cache: "no-store",
    }
  );
  if (!response) {
    throw new Error("Failed to fetch announcement");
  }
  return await response.json();
}
