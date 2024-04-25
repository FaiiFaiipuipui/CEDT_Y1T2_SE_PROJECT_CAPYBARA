export default async function getAnnouncement(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/announcements/${id}`
  );
  if (!response) {
    throw new Error("Failed to fetch announcement");
  }
  return await response.json();
}
