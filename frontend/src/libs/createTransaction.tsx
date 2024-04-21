export default async function createTransaction(token: string, aid: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${aid}/`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Cannot add Transaction Slip");
  }
  return await response.json();
}
