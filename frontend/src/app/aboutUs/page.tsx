'use client'
import Image from "next/image"; 
import MemberCardMini from "@/components/MemberCardMini";
import LeftMemberCard from "@/components/LeftMemberCard";
import RightMemberCard from "@/components/RightMemberCard";

export default function AboutUs(){
    
function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
    return (
        <main className="bg-white min-w-fit h-100 m-5 rounded-2xl sticky flex flex-col justify-start z-40 p-1 align-middle items-center gap-x-3 drop-shadow-2xl pb-5">
            
            <div className="w-full grid grid-cols-5 px-[20px] justify-center items-center mt-7 mb-10">
                <div className="col-span-5 text-center mb-[30px]">
                    
                    <div className=" flex flex-row justify-center items-center space-x-1">
                        <Image src="/img/capybaraNoCaption.jpg" alt="" width={150} height={150} style={{ objectFit: "cover", objectPosition: "center" }} />
                        
                        <div className="flex flex-col justify-start items-start space-y-1">
                            <h1 className="text-5xl font-semibold text-emerald-500">Capybara Team</h1>
                            <p className="text-medium font-light text-gray-500 pl-1">We are a funny group อยู่ที่ไหนมีแต่ความเอนจอย</p>
                        </div>
                    </div>
                    
                    <div className="mt-[25px] px-[200px]">
                        <hr className=""/>
                    </div>
                </div>
                <div className="col-span-5 flex flex-row justify-center items-start px-[125px] mb-[40px]">
                    <div className="w-1/4" onClick={() => scrollToElement("Gift")}>
                        <MemberCardMini imgSrc="/img/aboutus1.jpg" name="Gift" role="Project Manager"/>
                    </div>
                    <div className="w-1/4" onClick={() => scrollToElement("Puifaii")}>
                        <MemberCardMini imgSrc="/img/aboutus2.jpg" name="Puifaii" role="Supervisor"/>
                    </div>
                    <div className="w-1/4" onClick={() => scrollToElement("Champ")}>
                        <MemberCardMini imgSrc="/img/aboutus3.jpg" name="Champ" role="Scrum master"/>
                    </div>
                    <div className="w-1/4" onClick={() => scrollToElement("Model")}>
                        <MemberCardMini imgSrc="/img/aboutus4.jpg" name="Model" role="Cool designer"/>
                    </div>
                </div>
                <div className="col-span-5 flex flex-row justify-center items-start">
                    <div className="w-1/5" onClick={() => scrollToElement("Caning")}>
                        <MemberCardMini imgSrc="/img/aboutus5.jpg" name="Caning" role="Enjoy eating code"/>
                    </div>
                    <div className="w-1/5" onClick={() => scrollToElement("Nair")}>
                        <MemberCardMini imgSrc="/img/aboutus6.jpg" name="Nair" role="Cute catty"/>
                    </div>
                    <div className="w-1/5" onClick={() => scrollToElement("Cherry")}>
                        <MemberCardMini imgSrc="/img/aboutus7.jpg" name="Cherry" role="Is sweet fruit"/>
                    </div>
                    <div className="w-1/5" onClick={() => scrollToElement("Yiwah")}>
                        <MemberCardMini imgSrc="/img/aboutus8.jpg" name="Yiwah" role="Night owl"/>
                    </div>
                    <div className="w-1/5" onClick={() => scrollToElement("Anda")}>
                        <MemberCardMini imgSrc="/img/aboutus9.jpg" name="Anda" role="Invisible man"/>
                    </div>
                </div>
            </div>
            
            <div id="Gift">
                <LeftMemberCard Name="Tippaphanun Kungwarnkanok" role="Project manager" description="Meet our meticulous contributor, Tippaphanun! She&apos;s the backbone of our project, ensuring precision in every aspect. With her dedication and attention to detail, she keeps our website running smoothly."
                workList={["Implement API for tourist to submit the payment.",
                "Create dynamics individual transaction page.",
                "Create page for tourist to edit their own payment.",
                "Implement edit payment function.",
                "Implement API for admin to delete announcement.",
                "Implement get announcements function.",
                "Implement dashboard page to get appointments (instead of get transactions).",
                "Implement edit payment page (use component as same as create payment page).",
                "Implement filter status in dashboard (add waiting, verifying)."]} imgSrc="/img/aboutus1.jpg"/>
            </div>

            <div id="puifaii">
                <RightMemberCard Name="Pakarn Pahulo" role="Supervisor" description="Introducing Pakarn, the epitome of hard work and dedication. Her unwavering commitment to excellence shines through in every task she undertakes. With her precision and drive, she&apos;s an invaluable asset to our team."
                workList={["Design payment schema.",
                "Implement API for generating payment QR code.",
                "Implement QR code generation function.",
                "Design announcement schema.",
                "Design announcement component.",
                "Implement get announcements function.",
                "Implement to compress slip.",
                "Edit Login Page."]} imgSrc="/img/aboutus2.jpg"/>
            </div>

            <div id="Champ">
                <LeftMemberCard Name="Shama Wachanachai" role="Scrum master" description="Meet Shama, the creative mind driving the UI design of the website. With a primary focus on aesthetics and user experience, he also delves into coding to bring the vision to life. He finds pleasure in being part of this front-end development practice project."
                workList={["Implement API for admin to get all and get one transaction.",
                "Alter dashboard page.",
                "Design payment editing page.",
                "Create page for tourist to edit their own payment.",
                "Create announcement component.",
                "Implement API for admin to update announcement.",
                "Implement appointment schema  (add transaction ref).",
                "Implement edit payment page (use component as same as create payment page)."]} imgSrc="/img/aboutus3.jpg"/>
            </div>

            <div id="Model">
                <RightMemberCard Name="Panisara Kanjanachotkamol" role="Cool designer" description="Introducing Panisara K., the epitome of hard work and dedication. Her unwavering commitment to excellence shines through in every task she undertakes. With her precision and drive, she&apos;s an invaluable asset to our team."
                workList={["Implement API for generating payment QR code.",
                "Design payment page.",
                "Implement payment creation function.",
                "Design dynamics individual transaction page.",
                "Implement get user's transaction.",
                "Design payment editing page.",
                "Implement get announcements function.",
                "Create announcement component.",
                "Implement announcement deletion function.",
                "Implement payment component.",
                "Edit and decorate About Us Page."]} imgSrc="/img/aboutus4.jpg"/>
            </div>

            <div id="Caning">
                <LeftMemberCard Name="Thawaree Khanjai" role="Enjoy eating code" description="Meet Thawaree, the creative mind driving the UI design of the website. With a primary focus on aesthetics and user experience, he also delves into coding to bring the vision to life. He finds pleasure in being part of this front-end development practice project."
                workList={["Alter campground schema to include pricing.",
                "Implement payment creation function",
                "Implement API for admin to get all and get one transaction.",
                "Implement edit payment function.",
                "Implement API for admin to create announcement.",
                "Implement API for admin to update announcement.",
                "Implement API for tourist to get all, get one and get announcements for campground.",
                "Implement status in transaction.",
                "Edit and decorate About Us Page."]} imgSrc="/img/aboutus5.jpg"/>
            </div>

            <div id="Nair">
                <RightMemberCard Name="Boonda Panichakul" role="Cute catty" description="Introducing Boonda, the epitome of hard work and dedication. Her unwavering commitment to excellence shines through in every task she undertakes. With her precision and drive, she&apos;s an invaluable asset to our team."
                workList={["Design payment page.",
                "Create payment page.",
                "Implement get user's transaction.",
                "Alter Dashboard page to include status filtering function.",
                "Design announcement component.",
                "Implement announcement creation function.",
                "Implement API for admin to delete announcement.",
                "Implement filter status in dashboard (add waiting, verifying)."]} imgSrc="/img/aboutus6.jpg"/>
            </div>

            <div id="Cherry">
                <LeftMemberCard Name="Panisara Chakkaew" role="Is sweet fruit" description="Meet Panisara C., the creative mind driving the UI design of the website. With a primary focus on aesthetics and user experience, he also delves into coding to bring the vision to life. He finds pleasure in being part of this front-end development practice project."
                workList={["Alter campground schema to include pricing.",
                "Implement API for tourist to submit the payment.",
                "Alter dashboard page.",
                "Implement API for tourist to resubmit the payment.",
                "Implement announcement update function.",
                "Implement announcement deletion function.",
                "Implement API for tourist to get announcements.",
                "Edit Login Page."]} imgSrc="/img/aboutus7.jpg"/>
            </div>
            
            <div id="Yiwah">
                <RightMemberCard Name="Patsaporn Kaewkong" role="Night owl" description="Introducing Patsaporn, the epitome of hard work and dedication. Her unwavering commitment to excellence shines through in every task she undertakes. With her precision and drive, she&apos;s an invaluable asset to our team."
                workList={["Implement QR code generation function.",
                "Create dynamics individual transaction page.",
                "Implement API for tourist to resubmit the payment.",
                "Alter Dashboard page to include status filtering function.",
                "Design announcement schema.",
                "Implement API for admin to create announcement.",
                "Implement to compress slip.",
                "Implement appointment schema  (add transaction ref).",
                "Implement dashboard page to get appointments (instead of get transactions).",
                "Implement status in transaction."]} imgSrc="/img/aboutus8.jpg"/>
            </div>
            
            <div id="Anda">
                <LeftMemberCard Name="Varinthorn Chatburapachai" role="Invisible man" description="Meet Varinthorn, the creative mind driving the UI design of the website. With a primary focus on aesthetics and user experience, he also delves into coding to bring the vision to life. He finds pleasure in being part of this front-end development practice project."
                workList={["Design payment schema.",
                "Create payment page.",
                "Design dynamics individual transaction page.",
                "Implement announcement creation function.",
                "Implement announcement update function.",
                "Implement payment component."]} imgSrc="/img/aboutus9.jpg"/>
            </div>
        </main>
    );
}