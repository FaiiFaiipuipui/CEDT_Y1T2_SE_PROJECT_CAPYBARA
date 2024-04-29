"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { AnnouncementItemForCreateAndEdit } from "interface";
import CampGroundSelection from "@/components/CampGroundSelection";
import { Announcement } from "@mui/icons-material";
import createAnnouncement from "@/libs/createAnnouncement";

export default function CreateAnnouncementCard({
  closeCreateAnnouncement,
  profileName,
}: {
  closeCreateAnnouncement: Function;
  profileName: string;
}) {
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [noEndDate, setNoEndDate] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedCampground, setSelectedCampground] = useState("");

  const handleOptionChange = (newOption: string) => {
    setSelectedCampground(newOption);
  };

  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };

  const handleNoEndDateChange = (e) => {
    setNoEndDate(e.target.checked);
  };

  const onSubmit = async () => {
    if (title && startDate && content && selectedCampground && profileName) {
      const announcementItem: AnnouncementItemForCreateAndEdit = {
        cid: selectedCampground,
        title: title,
        content: content,
        startDate: startDate,
        author: profileName,
      };
      if (endDate !== null) {
        announcementItem.endDate = endDate;
      }

      try {
        await createAnnouncement(session.user.token, announcementItem);
        alert("Successfully added Announcement!!");
      } catch (error) {
        alert("Failed to add Announcement. Please try again later.");
        console.error(error);
      }

      console.log("///////");
      console.log(title);
      console.log(content);
      console.log(selectedCampground);
      console.log(startDate);
      console.log(endDate);
      console.log(profileName);
      console.log("///////");
    } else {
      alert("Please fill in the missing fields!");
      console.log("///////");
      console.log(title);
      console.log(content);
      console.log(selectedCampground);
      console.log(startDate);
      console.log(endDate);
      console.log(profileName);
      console.log("///////");
    }
  };

  const onCancel = () => {
    setNoEndDate(false);
    setStartDate(null);
    setEndDate(null);
    setContent("");
    setSelectedCampground("");
    setTitle("");
    closeCreateAnnouncement();
  };

  return (
    <div className="bg-white rounded-[20px] py-[6%] px-10 my-5 max-w-lg min-w-sm w-full ">
      <div className="flex flex-col mb-2 ">
        <div className="text-left text-lg font-medium mb-2">
          Create an announcement
        </div>
        <textarea
          className="text-sm max-w-lg min-w-sm min-h-14 w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-4 mb-4"
          title="textArea"
          placeholder="Please enter your title here"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></textarea>
        <textarea
          className="text-sm max-w-lg min-w-sm min-h-14 w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-4 mb-4"
          title="textArea"
          placeholder="Please enter your announcement here"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
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
        <div className="flex flex-col">
          <div
            className="text-left"
            style={{ display: noEndDate ? "none" : "block" }}
          >
            End Date
          </div>
          <input
            type="date"
            required
            id="enddate"
            name="enddate"
            placeholder="Select the date here"
            className="bg-white border-[2px] border-gray-500 rounded-lg w-[90%] text-sm py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
            onChange={handleEndDateChange}
            style={{ display: noEndDate ? "none" : "block" }}
          ></input>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="flex flex-row right-0">
          <div
            id="noEndDateCheckbox"
            className="flex flex-row justify-start items-center mt-5"
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
            className="bg-white border-[2px] border-fern px-3 mr-2 mt-5 text-fern font-medium rounded-full"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="bg-fern border-[2px] border-fern px-3 mr-2 mt-5 text-white font-medium rounded-full"
            onClick={() => onSubmit()}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
