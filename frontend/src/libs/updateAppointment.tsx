export default async function updateAppointment(
    id: string,
    token: string,
    name: string,
    date: string
  ) {
    let bodyData = {
      campground: name,
      apptDate: date,
    };
    console.log(bodyData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/appointments/${id}`,
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
      throw new Error("Cannot update appointment");
    }
  
    return await response.json();
  }
  