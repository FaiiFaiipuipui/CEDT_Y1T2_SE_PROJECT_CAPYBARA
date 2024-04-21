import getCampgrounds from "@/libs/getCampgrounds";
import { useEffect, useState } from "react";
import { CampgroundItem, CampgroundJson } from "interface";

export const getPollute = async () => {
  const campgrounds: CampgroundJson = await getCampgrounds(50);
  return campgrounds;
};

function CampGroundSelection({ onSelection }: { onSelection: Function }) {
  const [campgrounds, setCampgrounds] = useState<CampgroundJson | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      const data = await getPollute();
      setCampgrounds(data);
      setIsLoading(false);
    };

    fetchCampgrounds();
  }, []);

  if (isLoading) {
    return (
      <select
        id="campground"
        name="campground"
        className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
      >
        <option value="Loading..." defaultValue={"Loading..."} hidden>
          Loading...
        </option>
      </select>
    );
  }

  return (
    <select
      id="campground"
      name="campground"
      defaultValue={"default"}
      className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
      onChange={(e) => {
        onSelection(e.target.value);
      }}
    >
      <option value={"default"} key={"default"} hidden>
        Please Select ...
      </option>
      {campgrounds &&
        campgrounds.data.map((campgroundObj: CampgroundItem) => {
          return (
            <option value={campgroundObj._id} key={campgroundObj._id}>
              {campgroundObj.name}
            </option>
          );
        })}
    </select>
  );
}

export default CampGroundSelection;
