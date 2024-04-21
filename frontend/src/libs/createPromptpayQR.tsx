export default async function createPromptpayQR(
    token: string,
    transactionId: string
  ) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transactions/promptpayqr/`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionId : transactionId }),
        }
      );
      if (!response) {
        throw new Error("Failed to create promptpayqr");
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  