export default async function getUserTransactions(token: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: 'no-store'
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return await response.json();
  }
  