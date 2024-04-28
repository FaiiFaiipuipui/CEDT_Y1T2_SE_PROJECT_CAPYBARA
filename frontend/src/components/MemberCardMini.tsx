import Image from "next/image";
import Link from "next/link";

export default function MemberCardMini({imgSrc, name, role}:{
    imgSrc: string;
    name:string;
    role:string;
}){
    return(
        <div className="w-full flex flex-col justify-center items-center py-5 rounded-xl hover:shadow-lg">
            <div style={{ width: "125px", height: "125px", borderRadius: "50%", overflow: "hidden", marginBottom:"15px" }}>
                <Image src={imgSrc} alt="" width={125} height={125} style={{ objectFit: "cover", objectPosition: "center" }} />
            </div>
            <div className="text-[16px] font-semibold mb-[7px] text-gray-700">{name}</div>
            <div className="text-white text-sm py-1 border-double bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] cursor-pointer px-3 text-center rounded-xl bg-stone-950 hover:cursor-pointer hover:bg-stone-900 hover:shadow-lg hover:transition-transform hover:transform hover:scale-110">
                {role}
            </div>
        </div>  
    );
}