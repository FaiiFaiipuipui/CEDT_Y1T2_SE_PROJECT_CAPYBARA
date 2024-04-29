export default async function getAnnouncements() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/announcements/?limit=10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch announcements");
  }
  return await response.json();
}
