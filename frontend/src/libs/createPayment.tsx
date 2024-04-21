export default async function createPayment(
  token: string,
  status: string,
  rent_date: Date,
  successful_payment_date: Date,
  submitted_slip_images: Object[],
  successful_payment_slip_image: Object,
  campground: Object,
  user: Object,
  appointment: Object
) {
  let bodyData = {
    status: status,
    rent_date: rent_date,
    successful_payment_date: successful_payment_date,
    submitted_slip_images: submitted_slip_images,
    successful_payment_slip_image: successful_payment_slip_image,
    campground: campground,
    user: user,
    appointment: appointment,
  };
  console.log(bodyData);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payments/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }
  );

  if (!response.ok) {
    throw new Error("Cannot fetch payment");
  }

  return await response.json();
}
