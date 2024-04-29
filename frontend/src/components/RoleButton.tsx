export default function RoleButton({ roleString}:
    {
    roleString: string}
){
    return(
        <div className="text-white text-sm py-1 border-double bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] cursor-pointer px-3 text-center rounded-xl bg-stone-950 hover:cursor-pointer hover:bg-stone-900 hover:shadow-lg hover:transition-transform hover:transform hover:scale-105">
            {roleString}
        </div>
    );
}