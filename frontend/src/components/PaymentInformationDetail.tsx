import { AddPhotoAlternate, CheckCircleOutline } from "@mui/icons-material";

export default function PaymentInformationDetail({
  name,
  userId,
  rentDate,
  campgroundName,
}: {
  name: String;
  userId: String;
  rentDate: Date;
  campgroundName: String;
}) {
  return (
    <div className="ml-3">
      <div className="flex flex-row font-bold pt-7 pl-6">User</div>
      {name ? (
        <div className="pl-6">{name}</div>
      ) : (
        <div className="pl-6 text-red-500">Pending...</div>
      )}

      <div className="flex flex-row font-bold pt-4 pl-6">UserID</div>
      {userId ? (
        <div className="pl-6">{userId}</div>
      ) : (
        <div className="pl-6 text-red-500">Pending...</div>
      )}

      <div className="flex flex-row font-bold pt-4 pl-6">Date</div>
      {rentDate ? (
        <div className="pl-6">{rentDate.toString().split("T")[0]}</div>
      ) : (
        <div className="pl-6 text-red-500">Pending...</div>
      )}

      <div className="flex flex-row font-bold pt-4 pl-6">Campground</div>
      {campgroundName ? (
        <div className="pl-6">{campgroundName}</div>
      ) : (
        <div className="pl-6 text-red-500">Pending...</div>
      )}
      <div className="mt-10">
        <div className="text-sm text-[#007662] flex flex-row pl-6 font-semibold">
          {" "}
          <span className="h-[3vh] w-[3vh] flex mr-2">
            {/* <Image src={checkBox} alt="checkbox" /> */}
            <CheckCircleOutline className="pb-1" />
          </span>
          Cannot be refunded
        </div>
        <div className="text-sm text-[#007662] flex flex-row mt-2 pl-6 font-semibold">
          {" "}
          <span className="lg:h-[3vh] lg:w-[3vh]  flex mr-2">
            {/* <Image src={checkBox} alt="checkbox" /> */}
            <CheckCircleOutline className="pb-1" />
          </span>{" "}
          Estimated ticketing time less than 2 Days
        </div>
      </div>
    </div>
  );
}
