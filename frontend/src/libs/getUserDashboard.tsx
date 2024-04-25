export default async function getUserDashboard(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response) {
      throw new Error("Failed to fetch user profile");
    }
    return await response.json();
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
}
