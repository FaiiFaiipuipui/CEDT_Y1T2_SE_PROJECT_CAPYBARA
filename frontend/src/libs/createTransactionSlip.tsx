export default async function createTransactionSlip(
  token: string,
  tid: string,
  slip_image: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${tid}/transactionslips/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slip_image: slip_image }),
    }
  );
  console.log(response);
  if (!response) {
    console.log(response);
    throw new Error("Cannot add Transaction Slip");
  }
  return await response.json();
}
