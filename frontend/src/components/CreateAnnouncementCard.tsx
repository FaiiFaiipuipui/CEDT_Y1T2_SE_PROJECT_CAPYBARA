"use client"
import { useState } from "react";
import CampGroundSelection from "@/components/CampGroundSelection";

export default function CreateAnnouncementCard(){
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [noEndDate, setNoEndDate] = useState(false);
    const [selectedCampground,setSelectedCampground] = useState("");
    const handleOptionChange = (newOption: string) => {
        setSelectedCampground(newOption);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleNoEndDateChange = (e) => {
        setNoEndDate(e.target.checked);
    };

    return(
        <div className="bg-white rounded-[20px] py-[6%] px-10 my-5 max-w-lg min-w-sm w-full ">
        <div className="flex flex-col mb-2 ">
        <div className="text-left text-lg font-medium mb-2">Create an announcement</div>
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
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                ></input>
            </div>
            <div className="flex flex-col">
                <div className="text-left" 
                    onChange={handleEndDateChange}
                    style={{ display: noEndDate ? 'none' : 'block' }}>
                        End Date
                </div>
                <input
                    type="date"
                    required
                    id="enddate"
                    name="enddate"
                    placeholder="Select the date here"
                    className="bg-white border-[2px] border-gray-500 rounded-lg w-[90%] text-sm py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
                    value={endDate}
                    onChange={handleEndDateChange}
                    style={{ display: noEndDate ? 'none' : 'block' }}
                ></input>
            </div>
        </div>
        <textarea className="text-sm max-w-lg min-w-sm min-h-14 w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-4 mb-4" title="textArea" placeholder="Please enter your announcement here"></textarea>
        <div className="flex flex-wrap">
        <div className="flex flex-row right-0">
            <div id="noEndDateCheckbox" className="flex flex-row justify-start items-center">
                <input
                    id="noEndDateCheckbox"
                    type="checkbox"
                    placeholder="Indefinite date"
                    onChange={handleNoEndDateChange}
                />
                <div className="text-center font-semibold text-sm ml-2 mr-6">No end date</div>
                </div>
    
                    <button className="bg-white border-[2px] border-fern px-3 mr-2 text-fern font-medium rounded-full">
                        Cancel
                    </button>
                    <button className="bg-fern border-[2px] border-fern px-3 mr-2 text-white font-medium rounded-full">
                        OK
                    </button>
        
                </div>
        </div>
        
    </div>
    )
}