export default async function getAppointment(id: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/appointments/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response) {
    throw new Error("Failed to fetch appointment");
  }
  return await response.json();
}
