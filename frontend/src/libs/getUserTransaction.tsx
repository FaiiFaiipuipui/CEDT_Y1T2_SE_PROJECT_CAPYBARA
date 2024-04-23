import { OnePaymentJson } from "interface";

export default async function getTransaction(id: string, token: string): Promise<OnePaymentJson> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response) {
      throw new Error(`Failed to fetch transaction: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
}