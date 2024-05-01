import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  campgroundName,
  imgSrc,
  campgroundProvince,
}: {
  campgroundName: string;
  imgSrc: string;
  campgroundProvince: string;
}) {
  return (
    <InteractiveCard >
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Campground Picture"
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[30%] p-[10px] text-base mt-[10px]">
        <div id="campground-name" className="campground-name">{campgroundName}</div>
        <div>จังหวัด{campgroundProvince}</div>
      </div>
    </InteractiveCard>
  );
}
