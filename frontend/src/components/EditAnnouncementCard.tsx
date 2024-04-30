"use client";
import { useState } from "react";
import CampGroundSelection from "@/components/CampGroundSelection";
import { useSession } from "next-auth/react";
import updateAnnouncement from "@/libs/updateAnnouncement";
import { AnnouncementItem } from "interface";

export default function EditAnnouncementCard({
  toggle,
  title,
  campgroundName,
  campgroundId,
  content,
  startDate,
  endDate,
  announcementId,
  createdAt,
}: {
  toggle: Function;
  title: string;
  campgroundName: string;
  campgroundId: string;
  content: string;
  startDate: Date;
  endDate: Date;
  announcementId: string;
  createdAt: Date;
}) {
  var currentStartDate = startDate.toISOString().slice(0, 10);
  var currentEndDate = endDate ? endDate.toISOString().slice(0, 10) : "";

  const [editedStartDate, setEditedStartDate] = useState<Date>(
    new Date(currentStartDate)
  );

  const [checkStartDate, setCheckStartDate] = useState<boolean>(true);
  const [checkEndDate, setCheckEndDate] = useState<boolean>(true);
  const [editedEndDate, setEditedEndDate] = useState<Date>(
    new Date(currentEndDate)
  );
  const [fieldMissing, setFieldMissing] = useState<Set<string>>(new Set());
  const [checkSubmmit, setCheckSubmit] = useState<boolean>(false);

  const [noEndDate, setNoEndDate] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  //const [selectedCampground, setSelectedCampground] = useState(campgroundName);

  const { data: session } = useSession();

  const alertFill = (field: Set<string>) => {
    field.forEach((element) => {
      alert(`Please fill the ${element} field`);
    });
  };

  const createAtForAdmin = new Date(createdAt);

  const checkFillTheField = (e, typeField) => {
    if (e.target.value === null || e.target.value === "") {
      setCheckSubmit(false);
      const newSet = fieldMissing.add(typeField);
      setFieldMissing(newSet);
      return;
    }
    setCheckSubmit(true);
    const newFieldMissing = new Set(fieldMissing); //
    newFieldMissing.delete(typeField);
    setFieldMissing(newFieldMissing);
  };

  const handleNoEndDateChange = (e) => {
    setNoEndDate(e.target.checked);
    setEditedEndDate(null);
  };

  const update = () => {
    try {
      if (session.user.token) {
        const addAnnouncement = async () => {
          try {
            await updateAnnouncement(
              editedTitle,
              editedContent,
              editedStartDate,
              editedEndDate,
              campgroundId,
              announcementId,
              session.user.token
            );
          } catch (error) {
            console.log(error);
          }

          console.log("Pass here Too");
        };
        addAnnouncement();
        alert("Successfully updated announcement");
      }
    } catch (err) {
      alert("Error");
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-[20px] py-[6%] px-10 my-5 max-w-lg min-w-sm w-full ">
      <div className="flex flex-col mb-2 ">
        <div
          className="text-left text-lg font-medium mb-5"
          onClick={() => console.log(session)}
        >
          Edit an announcement
          <div className="text-xs text-gray-400 py-1">
            | Created At : {createAtForAdmin.toDateString()}
          </div>
        </div>
        <div className="text-left">{campgroundName}</div>
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
            defaultValue={currentStartDate}
            onChange={(e) => {
              const date1 = new Date(e.target.value);
              const date2 = new Date(createdAt);
              console.log("Check : ", date1, ",  ", date2);
              checkFillTheField(e, "Start Date");

              date1 < date2
                ? setCheckStartDate(false)
                : setCheckStartDate(true);

              date1 > date2
                ? setEditedStartDate(date1)
                : setEditedStartDate(date2);
            }}
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
            defaultValue={currentEndDate}
            onChange={(e) => {
              console.log(endDate);
              const newEndDate = new Date(e.target.value);
              setEditedEndDate(newEndDate);
              console.log("Here End DAte on Cganeg");
              console.log(newEndDate.toString);
              console.log(editedStartDate);
              checkFillTheField(e, "End Date");
              if (newEndDate !== null && newEndDate < editedStartDate) {
                setCheckEndDate(false);
              } else {
                setCheckEndDate(true);
              }
            }}
            style={{ display: noEndDate ? "none" : "block" }}
          ></input>
        </div>
      </div>
      <textarea
        className="text-sm max-w-lg min-w-sm min-h-14 w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-4"
        title="textArea"
        placeholder="Please enter your announcement here"
        defaultValue={title}
        onChange={(e) => {
          checkFillTheField(e, "Title");
          setEditedTitle(e.target.value);
        }}
      ></textarea>
      <textarea
        className="text-sm max-w-lg min-w-sm min-h-14 w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-4 mb-4"
        title="textArea"
        placeholder="Please enter your announcement here"
        defaultValue={content}
        onChange={(e) => {
          checkFillTheField(e, "Content");
          setEditedContent(e.target.value);
        }}
      ></textarea>
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
            onClick={() => toggle()}
          >
            Cancel
          </button>
          <button
            className="bg-fern border-[2px] border-fern px-3 mr-2 text-white font-medium rounded-full"
            onClick={() => {
              if (!checkStartDate) {
                alert("The Start date is eariler than the Created date");
                return;
              }
              if (!checkEndDate) {
                alert("The End date is eariler than the Start date");
                return;
              }
              if (!checkSubmmit) {
                alertFill(fieldMissing);
                return;
              }
              console.log("00000000000");
              console.log(
                editedTitle,
                editedContent,
                editedStartDate,
                editedEndDate,
                campgroundId,
                announcementId,
                session.user.token
              );
              console.log("00000000000");
              update();
              toggle();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
