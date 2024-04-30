import Image from "next/image";
import RoleButton from "./RoleButton";

export default function RightMemberCard({
  Name,
  role,
  description,
  workList,
  imgSrc,
}: {
  Name: string;
  role: string;
  description: string;
  workList: string[];
  imgSrc: string;
})

{
  return (
    <div className="w-full px-[14%] py-[3%] flex flex-col">  
        <div className="pt-[120px]">
            <div className="w-full flex flex-row space-x-5 justify-end items-center">
                <div className="text-4xl font-medium text-emerald-700">
                    {Name}
                </div>
                <RoleButton roleString={role}/>
            </div>
        </div>   
        <div className="flex flex-row items-center justify-center">
            <div className="text-xl w-[30%] mr-[10%] mt-2 pt-10">
                <Image src={imgSrc} alt="" width={300} height={200} className="rounded-xl" />
            </div>
            <div className="text-md w-[70%] text-gray-500 pt-10 space-y-5">
                <div className="rounded-3xl p-px bg-gradient-to-b from-gray-200 to-transparent">
                    <div className="bg-gray-50 p-5 rounded-[calc(1.5rem-1px)]">
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                    </div>
                </div>
                <h2 className="text-emerald-500 text-lg font-normol pt-3">Responsibility:</h2>
                <ul className="pl-5 font-light">
                    {
                        workList.map((work:string, index:number)=> (
                        <li key={index}>• {work}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  );
}
