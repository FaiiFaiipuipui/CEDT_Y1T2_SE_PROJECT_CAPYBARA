export default async function deleteAnnouncement(id: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/announcements/${id}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to delete Announcement: ${JSON.stringify(response)}`
    );
  }
  
  return await response.json();
}
