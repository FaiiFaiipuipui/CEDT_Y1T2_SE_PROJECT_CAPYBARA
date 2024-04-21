export default async function createAppointment(
  token: string,
  cid: string,
  apptDate: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${cid}/appointments/`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apptDate: apptDate }),
      }
    );
    if (!response) {
      throw new Error("Failed to create appointment");
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
