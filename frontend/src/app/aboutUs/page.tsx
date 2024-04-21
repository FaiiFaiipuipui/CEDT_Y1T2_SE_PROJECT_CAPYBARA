import Image from "next/image";

export default function AboutUs(){
    return (
        <main className="bg-white min-w-fit h-100 m-5 rounded-2xl sticky flex flex-col justify-start z-40 p-1 align-middle items-center gap-x-3 drop-shadow-2xl">
            <div className="px-[14%] py-[3%] flex flex-col">
                <div className="text-3xl mb-3">
                    Tippaphanun Kungwarnkanok
                </div>
                <div className="flex flex-row items-center justify-center">
                    <div className="text-md w-[70%]">
                        Meet our meticulous contributor, Tippaphanun! She&apos;s the backbone of our project, ensuring precision in every aspect. With her dedication and attention to detail, she keeps our website running smoothly.
                        <h2 className="pt-2">Responsobility:</h2>
                        <ul>
                            <li>• Schedule a planning meeting and assign tasks to everyone in the group.</li>
                            <li>• Create a detailed page for the campground locations for users and admins.</li>
                            <li>• Helping to take care of and design the User Interface.</li>
                            <li>• Add functionality to the Register, Login, and Logout pages.</li>
                            <li>• Implement functionality on the page for booking campground locations.</li>
                            <li>• Fix bugs on the Register, Login, and Logout pages.</li>
                            <li>• Review the completeness of the presentation documents before submission.</li>
                            <li>• Review the completeness of the final website pages before submission.</li>
                        </ul>
                    </div>
                    <div className="text-xl w-[30%] ml-[10%] mt-5">
                        <Image src="/img/aboutus1.jpg" alt="Tippaphanun's picture" width={300} height={200} />
                    </div>
                </div>
            </div>
            
            <div className="px-[14%] py-[3%] flex flex-col">
                <div className="text-3xl mb-3">
                    Pakarn Pahulo
                </div>
                <div className="flex flex-row items-center justify-center">
                    <div className="text-xl w-[30%] mr-[10%] mt-5">
                        <Image src="/img/aboutus2.jpg" alt="Pakarn's picture" width={300} height={200} />
                    </div>
                    <div className="text-md w-[70%]">
                        Introducing Pakarn, the epitome of hard work and dedication. Her unwavering commitment to excellence shines through in every task she undertakes. With her precision and drive, she&apos;s an invaluable asset to our team.
                        <h2 className="pt-2">Responsobility:</h2>
                        <ul>
                            <li>• Generate the initial files of the website from the Next.js API.</li>
                            <li>• Create the homepage and the top navigation menu.</li>
                            <li>• Add functionality for accessing campground locations.</li>
                            <li>• Implement functionality on the page for booking campground locations.</li>
                            <li>• Fix bugs on the Register, Login, and Logout pages.</li>
                            <li>• Bug finding / Bug solving.</li>
                            <li>• Proofread the spelling of the presentation documents before submission.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="px-[14%] py-[3%] flex flex-col">
                <div className="text-3xl mb-3">
                    Shama Wachanachai
                </div>
                <div className="flex flex-row items-center justify-center">
                    <div className="text-md w-[70%]">
                        Meet Shama, the creative mind driving the UI design of the website. With a primary focus on aesthetics and user experience, he also delves into coding to bring the vision to life. He finds pleasure in being part of this front-end development practice project.
                        <h2 className="pt-2">Responsobility:</h2>
                        <ul>
                            <li>• Manage User Interface design through Figma.</li>
                            <li>• Create the About Us page.</li>
                            <li>• Develop specific UI web pages.</li>
                            <li>• Integrate Next Authentication.</li>
                            <li>• Update details in the alerts for each page.</li>
                            <li>• Deploy the backend and frontend parts to Vercel.</li>
                            <li>• Create presentation documents.</li>
                        </ul>
                    </div>
                    <div className="text-xl w-[30%] ml-[10%] mt-5">
                        <Image src="/img/aboutus3.jpg" alt="Shama's picture" width={300} height={200} />
                    </div>
                </div>
            </div>
        </main>
    );
}