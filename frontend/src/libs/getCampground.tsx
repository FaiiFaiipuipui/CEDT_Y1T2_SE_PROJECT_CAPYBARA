export default async function getCampground(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch campground");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
