export default async function getTransactionSlips(token: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactionslips/`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response) {
        throw new Error("Failed to fetch transaction");
      }
      return await response.json();
}