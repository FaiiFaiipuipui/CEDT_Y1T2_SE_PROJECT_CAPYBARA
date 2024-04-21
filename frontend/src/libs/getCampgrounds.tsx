export default async function getCampgrounds(limit?: number, page?: number) {
  // add timeout
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const limitParam = limit ? `?limit=${limit}` : "";
  const pageParam = page ? `&page=${page}` : "";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${limitParam}${pageParam}`,
      { next: { tags: ["campgrounds"] } }
    );
    if (!response.ok) {
      console.log(response);
      
      throw new Error("Failed to fetch campgrounds");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
