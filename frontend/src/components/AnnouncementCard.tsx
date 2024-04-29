import { AnnouncementItem, AnnouncementJson } from "interface";

export default async function AnnouncementCard({
  title,
  campground,
  content,
  startDate,
  endDate,
}: {
  title: string;
  campground: string;
  content: string;
  startDate: Date;
  endDate: Date;
}) {
  return (
    <div className="bg-white rounded-[20px] py-[6%] px-10 my-5 max-w-lg min-w-sm w-full border-lg border-green-500">
      <div className="text-left font-semibold text-xl pb-2">{title}</div>
      <div className="border-t-2 border-black pb-2"></div>
      <div className="text-sm font-semibold text-left pb-5">{campground}</div>
      <div className="text-sm text-left pb-5">{content}</div>
      {process.env.NODE_ENV === "development" ? (
        <div className="text-xs text-left">
          DEV: startDate is {startDate.toDateString()}
        </div>
      ) : null}
      <div className="flex flex-wrap">
        {!isNaN(new Date(endDate).getTime()) ? (
          <div className="text-sm font-semibold pb-2 text-left pr-[33%]">
            until {endDate.toDateString()}
          </div>
        ) : null}

        <div className="flex flex-row right-0 z-30">
          <button>
            <svg
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1 9L15 9.9L5.9 19H5V18.1L14.1 9ZM17.7 3C17.5 3 17.2 3.1 17 3.3L15.2 5.1L18.9 8.9L20.7 7C21.1 6.6 21.1 6 20.7 5.6L18.4 3.3C18.2 3.1 17.9 3 17.7 3ZM14.1 6.2L3 17.2V21H6.8L17.8 9.9L14.1 6.2ZM7 2V5H10V7H7V10H5V7H2V5H5V2H7Z"
                fill="black"
              />
            </svg>
          </button>
          <button>
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2487 20.5833C6.2487 21.158 6.46819 21.7091 6.85889 22.1154C7.24959 22.5217 7.7795 22.75 8.33203 22.75H16.6654C17.2179 22.75 17.7478 22.5217 18.1385 22.1154C18.5292 21.7091 18.7487 21.158 18.7487 20.5833V7.58333H6.2487V20.5833ZM8.33203 9.75H16.6654V20.5833H8.33203V9.75ZM16.1445 4.33333L15.1029 3.25H9.89453L8.85286 4.33333H5.20703V6.5H19.7904V4.33333H16.1445Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
