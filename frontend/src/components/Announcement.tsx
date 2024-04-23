"use client"
import { useState } from "react";
import CampGroundSelection from "@/components/CampGroundSelection";

export default function Announcement(){
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [noEndDate, setNoEndDate] = useState(false);
    const handleOptionChange = (newOption: string) => {
        setSelectedCampground(newOption);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleNoEndDateChange = (e) => {
        setNoEndDate(e.target.checked);
    };
    
    return (
        <div className="bg-cadetblue rounded-[20px] py-2 px-10 my-10 w-[35%] flex flex-col h-full">
            <div className="flex flex-row">
            <div className="text-4xl font-bold my-10 text-left">Announcement</div>
            <svg className="my-10 ml-[90px]" width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="41" height="38.9758" rx="10" fill="#9A5C00"/>
                <rect width="41" height="38.9758" rx="10" fill="#009A62"/>
                <path d="M19.494 24.932V14.4206H22.6759V24.932H19.494ZM15.8293 21.2672V18.0854H26.3406V21.2672H15.8293Z" fill="white"/>
            </svg>

            {/* Announcement */}

            </div>
            <div className="flex flex-col my-[3%]">
            <div className="bg-white rounded-[20px] py-6 px-10 my-5 max-w-lg min-w-sm w-full border-lg border-green-500">
                <div className="text-left font-semibold text-xl pb-2">อุทยานแห่งชาติคลองลาน จังหวัดกำแพงเพชร</div>
                <div className="border-t-2 border-black pb-2"></div>
                <div className="text-sm text-left pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. 
                    Duis aute irure dolor in reprehenderit in </div>
                    <div className="flex flex-wrap">
                        <div className="pb-2 text-left pr-[33%]">until 25 Apr | 8 pm </div>
                        <div className="flex flex-row right-0 z-30">
                        <button>
                        <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1 9L15 9.9L5.9 19H5V18.1L14.1 9ZM17.7 3C17.5 3 17.2 3.1 17 3.3L15.2 5.1L18.9 8.9L20.7 7C21.1 6.6 21.1 6 20.7 5.6L18.4 3.3C18.2 3.1 17.9 3 17.7 3ZM14.1 6.2L3 17.2V21H6.8L17.8 9.9L14.1 6.2ZM7 2V5H10V7H7V10H5V7H2V5H5V2H7Z" fill="black"/>
                        </svg>
                        </button>
                        <button>
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.2487 20.5833C6.2487 21.158 6.46819 21.7091 6.85889 22.1154C7.24959 22.5217 7.7795 22.75 8.33203 22.75H16.6654C17.2179 22.75 17.7478 22.5217 18.1385 22.1154C18.5292 21.7091 18.7487 21.158 18.7487 20.5833V7.58333H6.2487V20.5833ZM8.33203 9.75H16.6654V20.5833H8.33203V9.75ZM16.1445 4.33333L15.1029 3.25H9.89453L8.85286 4.33333H5.20703V6.5H19.7904V4.33333H16.1445Z" fill="black"/>
                        </svg>
                        </button>
                    </div>
                    </div>
            </div>

            {/* admin add announcement */}

            <div className="bg-white rounded-[20px] py-6 px-10 my-5 max-w-lg min-w-sm w-full ">
                <div className="flex flex-col mb-2 ">
                <div className="text-left text-lg font-medium">Create an annoucement</div>
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
                <textarea className="text-sm max-w-lg min-w-sm w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-2" title="textArea" placeholder="Please enter your annoucement here"></textarea>
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
                                Submit
                            </button>
                        </div>
                </div>
                
            </div>

            {/* admin edit announcement */}

            <div className="bg-white rounded-[20px] py-6 px-10 my-5 max-w-lg min-w-sm w-full ">
                <div className="flex flex-col mb-2 ">
                <div className="text-left text-lg font-medium">Edit an annoucement</div>
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
                <textarea className="text-sm max-w-lg min-w-sm w-full border rounded-md p-2 bg-gray-100 border-1 border-cadetblue mt-2" title="textArea" placeholder="Please enter your annoucement here"></textarea>
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

            {/* Announcement */}

            </div>
            <div className="flex flex-col my-[3%]">
            <div className="bg-white rounded-[20px] py-6 px-10 my-5 max-w-lg min-w-sm w-full border-lg border-green-500">
                <div className="text-left font-semibold text-xl pb-2">อุทยานแห่งชาติคลองลาน จังหวัดกำแพงเพชร</div>
                <div className="border-t-2 border-black pb-2"></div>
                <div className="text-sm text-left pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. 
                    Duis aute irure dolor in reprehenderit in </div>
                    <div className="flex flex-wrap">
                        <div className="pb-2 text-left pr-[33%]">until 25 Apr | 8 pm </div>
                        <div className="flex flex-row right-0 z-30">
                        <button>
                        <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1 9L15 9.9L5.9 19H5V18.1L14.1 9ZM17.7 3C17.5 3 17.2 3.1 17 3.3L15.2 5.1L18.9 8.9L20.7 7C21.1 6.6 21.1 6 20.7 5.6L18.4 3.3C18.2 3.1 17.9 3 17.7 3ZM14.1 6.2L3 17.2V21H6.8L17.8 9.9L14.1 6.2ZM7 2V5H10V7H7V10H5V7H2V5H5V2H7Z" fill="black"/>
                        </svg>
                        </button>
                        <button>
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.2487 20.5833C6.2487 21.158 6.46819 21.7091 6.85889 22.1154C7.24959 22.5217 7.7795 22.75 8.33203 22.75H16.6654C17.2179 22.75 17.7478 22.5217 18.1385 22.1154C18.5292 21.7091 18.7487 21.158 18.7487 20.5833V7.58333H6.2487V20.5833ZM8.33203 9.75H16.6654V20.5833H8.33203V9.75ZM16.1445 4.33333L15.1029 3.25H9.89453L8.85286 4.33333H5.20703V6.5H19.7904V4.33333H16.1445Z" fill="black"/>
                        </svg>
                        </button>
                    </div>
                    </div>
            </div>

            </div>
        </div>
    )
}