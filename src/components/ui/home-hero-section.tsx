import { useState, useEffect } from "react"
import {Button} from "./button"
import useEventsQuery from "@/react-queries/use-events-query";
import moment from "moment";
const HomeHeroSection = () => {
    const [activeTab, setActiveTab] = useState(1)
    const { data } = useEventsQuery()
    const MAX_NUM_TABS: number = data?.length;
    useEffect(() => {
        setTimeout(() => {
            if (activeTab < MAX_NUM_TABS) {
                setActiveTab((prev) => prev + 1)
            } else if (activeTab === MAX_NUM_TABS) {
                setActiveTab(1);
            }
        }, 5000)
    }, [activeTab, MAX_NUM_TABS])

    const handleTabClick = (tabNum: number) => {
        setActiveTab(tabNum)
    }

    const tabs = data?.map((tabNum) => (
        <li key={`tab-${tabNum.title}`} onClick={() => handleTabClick(tabNum)} className={`w-[25px] h-[5px] cursor-pointer  ${tabNum === activeTab ? "bg-blue-500" : "bg-slate-500"}`}></li>
    ))

    // console.log(data[activeTab - 1])
    const activeEvent = data && data[activeTab - 1];
    return (
        <section id="intro" className="h-screen">
            {
                activeEvent && (
                    <div className="z-50 absolute left-5 top-2/4 space-y-3 w-full max-w-xl">
                        <p className="text-slate-100 text-2xl">{moment(activeEvent.dateOfEvent).format("LLL")}</p>
                        <h1 className="text-white text-8xl font-bold">{activeEvent.title}</h1>
                        <p className="text-slate-100 text-2xl">Nairobi, Kenya</p>
                        <Button className="bg-blue-900 hover:bg-blue-600 px-24 py-7 rounded-full">Get a Ticket</Button>
                    </div>
                )
            }
            <div className={`absolute inset-0 bg-fill w-full bg-cover bg-center bg-no-repeat h-screen -z-50  bg-[url('https://citizentv.obs.af-south-1.myhuaweicloud.com/111511/conversions/Sauti-og_image.webp')]`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-transparent to-transparent z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-transparent z-20"></div>
            <div className="absolute bottom-20 z-20 w-full grid place-items-center space-y-10">
                <ul className="flex gap-5 w-fit">
                    {tabs}
                </ul>
                
            </div>
        </section>
    )
}

export default HomeHeroSection