"use client"
import EditAnnouncementCard from "./EditAnnouncementCard";
import AnnouncementCard from "./AnnouncementCard";
import CreateAnnouncementCard from "./CreateAnnouncementCard";

export default function Announcement(){
    
    return (
            <div className="flex flex-row">
            <div className="text-4xl font-bold my-10 text-left">Announcement</div>
            <button>
            <svg className="my-10 ml-[70px]" width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="41" height="38.9758" rx="10" fill="#9A5C00"/>
                <rect width="41" height="38.9758" rx="10" fill="#009A62"/>
                <path d="M19.494 24.932V14.4206H22.6759V24.932H19.494ZM15.8293 21.2672V18.0854H26.3406V21.2672H15.8293Z" fill="white"/>
            </svg>
            </button>
            </div>
    )
}