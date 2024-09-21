import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import EventSearchBox from "@/components/ui/event-search-box"
import EventCard from "@/components/ui/event-card"
import CategoryCard from "@/components/ui/category-card"
import { useState, useEffect } from "react"
import UpcomingEvents from "@/components/ui/upcoming-events"
export const HomePage = () => {
    const [activeTab, setActiveTab] = useState(1)

    const MAX_NUM_TABS: number = 4;

    useEffect(() => {
        setTimeout(() => {
            if(activeTab < MAX_NUM_TABS){
                setActiveTab((prev) => prev + 1)
            } else if (activeTab === MAX_NUM_TABS){
                setActiveTab(1);
            }
        }, 2000)
    }, [activeTab])

    const handleTabClick = (tabNum: number) => {
        setActiveTab(tabNum)
    }

    const tabs = [1, 2, 3, 4].map((tabNum)=> (
        <li key={`tab-${tabNum}`} onClick={() => handleTabClick(tabNum)} className={`w-[25px] h-[5px] cursor-pointer  ${tabNum === activeTab ? "bg-blue-500" : "bg-slate-500"}`}></li>
    ))
    return <main className="space-y-10">
        <section id="intro" className="h-screen">
            <div className="z-50 absolute left-5 top-2/4 space-y-3">
                <p className="text-slate-100 text-xl">Saturday, 24th December 2024 | 06:30 GMT</p>
                <h1 className="text-white text-8xl font-bold">Sauti Sol</h1>
                <p className="text-slate-100 text-2xl">Nairobi, Kenya</p>
                <Button className="bg-blue-900 hover:bg-blue-600 px-24 py-7 rounded-full">Get a Ticket</Button>
            </div>
            <div className="absolute inset-0 bg-fill w-full bg-cover bg-center bg-no-repeat h-screen -z-50  bg-[url('https://citizentv.obs.af-south-1.myhuaweicloud.com/111511/conversions/Sauti-og_image.webp')]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-transparent to-transparent z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-transparent z-20"></div>
            <div className="absolute bottom-20 z-20 w-full grid place-items-center space-y-10">
                <ul className="flex gap-5 w-fit">
                    {tabs}
                </ul>
                <EventSearchBox />
            </div>
        </section>
        

        <section id="events" className="container h-full space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-center font-bold text-4xl text-white">Upcoming Events</h1>
                <NavLink to="/events" className="text-white text-xl font-bold">View All</NavLink>
            </div>
            <div className="flex flex-wrap gap-5">
                <UpcomingEvents/>
            </div>
        </section >

        <section className="container z-50 space-y-5">
            <h1 className="text-white text-3xl">Popular Events Near You </h1>
            <div className="flex flex-wrap gap-5">
                <EventCard/>
                <EventCard />
                <EventCard/>
            </div>
        </section>

        <section className="container z-50 p-5 space-y-5">
            <h1 className="text-white text-3xl font-bold">Browse by Categories </h1>
            <div className="flex flex-wrap gap-5">
                <CategoryCard category="Concerts"/>
                <CategoryCard category="Football" />
                <CategoryCard category="Music Festivals" />
                <CategoryCard category="Basketball" />
                <CategoryCard category="Theatre" />
            </div>
        </section>

        <section className="flex w-full items-center flex-col justify-center space-y-4 bg-blue-950 py-20">
            <h1 className="text-4xl text-white text-center max-w-2xl font-bold">Discover Unforgettable experiences with <span className="">Lyte</span></h1>
            <p className=" max-w-3xl text-xl text-center flex flex-col font-normal text-slate-200">
                Whether you're seeking a night out with friends or planning a special occasion, let us be your guide to the best events in the city.</p>
            <div className="flex gap-2 py-10 flex-col w-full max-w-xl">
                <h1 className="text-white text-xl">Subscribe to our Newsletter</h1>
                <form className="flex w-full">
                    <input type="email" id="email" placeholder="Enter your email" className="px-6 py-3 bg-slate-200 text-black rounded-l-full border focus:border-blue-900 text-lg w-full" />
                    <Button type="button" className="bg-blue-900 hover:bg-blue-800 p-7 rounded-r-full text-xl">Subscribe</Button>
                </form>
            </div>
        </section>
    </main>
}