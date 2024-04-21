export default async function deleteAppoinment(id: string, token: string) {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/appointments/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to delete Appointment: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.log(error);
    }
}
