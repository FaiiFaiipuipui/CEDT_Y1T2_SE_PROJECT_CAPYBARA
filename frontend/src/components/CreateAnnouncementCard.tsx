"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { AnnounmentItem } from "interface";
import CampGroundSelection from "@/components/CampGroundSelection";
import { Announcement } from "@mui/icons-material";

export default function CreateAnnouncementCard() {
  const { data: session } = useSession();

  if (!session || !session.user.token) return null;

  const name = session.user.name;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [noEndDate, setNoEndDate] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedCampground, setSelectedCampground] = useState("");
  const handleOptionChange = (newOption: string) => {
    setSelectedCampground(newOption);
  };

  const handleNoEndDateChange = (e) => {
    setNoEndDate(e.target.checked);
  };

  const onSubmit = () => {
    if (
      title &&
      startDate &&
      endDate &&
      content &&
      selectedCampground &&
      name
    ) {
      const announmentItem: AnnounmentItem = {
        title: title,
        content: content,
        startDate: startDate,
        endDate: endDate,
        campground: selectedCampground,
        author: name,
      };
      const addAnnouncement = async () => {
        // await createAnnouncement(session.user.token, announmentItem);
      };
      addAnnouncement();
      alert("Successfully add Annnouncement!!");
    } else {
      alert("Please fill in the missing field!");
    }
  };
  const onCancel = () => {
    setNoEndDate(false);
    setStartDate(null);
    setEndDate(null);
    setContent("");
    setSelectedCampground("");
    setTitle("");
  };

  return (
    <div className="bg-white rounded-[20px] py-[6%] px-10 my-5 max-w-lg min-w-sm w-full ">
      <div className="flex flex-col mb-2 ">
        <div className="text-left text-lg font-medium mb-2">
          Create an announcement
        </div>
        <CampGroundSelection onSelection={handleOptionChange} />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="text-left">Start Date</div>
          <input
            type="date"
            required
            id="startdate"
            name="startdate"
            placeholder="Select the date here"
            className="bg-white border-[2px] border-gray-500 rounded-lg w-[90%] text-sm py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
            onChange={(e) => setStartDate(new Date(e.target.value))}
          ></input>
        </div>
        <div
          className="flex flex-col"
          style={{ display: noEndDate ? "none" : "block" }}
        >
          <div className="text-left">End Date</div>
          <input
            type="date"
            required
            id="enddate"
            name="enddate"
            placeholder="Select the date here"
            className="bg-white border-[2px] border-gray-500 rounded-lg w-[90%] text-sm py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
            onChange={(e) => {
              console.log(".");
              console.log(new Date(e.target.value));
              console.log(".");
              setEndDate(new Date(e.target.value));
            }}
          ></input>
        </div>
      </div>
      <textarea
        className="text-sm max-w-lg min-w-sm min-h-14 w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-4"
        title="textArea"
        placeholder="Please enter your annoucement here"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        className="text-sm max-w-lg min-w-sm min-h-14 w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-2 mb-4"
        title="textArea"
        placeholder="Please enter your annoucement here"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <div className="flex flex-wrap">
        <div className="flex flex-row right-0">
          <div
            id="noEndDateCheckbox"
            className="flex flex-row justify-start items-center"
          >
            <input
              id="noEndDateCheckbox"
              type="checkbox"
              placeholder="Indefinite date"
              onChange={handleNoEndDateChange}
            />
            <div className="text-center font-semibold text-sm ml-2 mr-6">
              No end date
            </div>
          </div>

          <button
            className="bg-white border-[2px] border-fern px-3 mr-2 text-fern font-medium rounded-full"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            className="bg-fern border-[2px] border-fern px-3 mr-2 text-white font-medium rounded-full"
            onClick={() => {
              console.log("/////////////");
              console.log(startDate);
              console.log(endDate);
              console.log(selectedCampground);
              console.log(title);
              console.log(content);
              console.log("/////////////");
              onSubmit();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
