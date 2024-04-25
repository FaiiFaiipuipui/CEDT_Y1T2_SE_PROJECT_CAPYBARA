import { AppointmentJson } from "interface";
export default async function getAppointments(token: string):Promise<AppointmentJson> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/appointments/`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: 'no-store'
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  return await response.json();
}
