import { NavLink } from "react-router-dom"
import { EventList } from "./components/event-list"

export const HomePage = () => {
    return <section>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-50" style={{ backgroundImage: 'url("/images/hero-section-bg.png")', filter: "brightness(50%)" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent -z-40"></div>
        <section id="#" className="flex w-full h-screen items-center flex-col justify-center space-y-8">
            <h1 className="text-5xl text-white text-center max-w-sm font-bold">Discover unforgettable experiences with <span className="text-blue-900 font-bold">EventVista</span></h1>
            <p className=" max-w-2xl text-center flex flex-col font-bold text-slate-300">
                Whether you're seeking a night out with friends or planning a special occasion, let us be your guide to the best events in the city. Join us today and embark on a journey filled with excitement, discovery, and unforgettable memories. Explore a world of entertainment and convenience, where every ticket purchase unlocks a new adventure. </p>
            <div className="flex gap-4 py-10 -z-50">
                <NavLink to="/login" className="border border-blue-900 p-2.5 bg-blue-900 text-white rounded-md hover:bg-blue-600 transition-all duration-300">Get a Ticket</NavLink>
                <NavLink to="events" className="border border-blue-900 p-2.5 text-white rounded-md hover:bg-slate-800 transition-all duration-300">More Gallery</NavLink>
            </div>
        </section>

        <section id="events" className="h-full space-y-8">
            <h1 className="text-center font-bold text-4xl text-white">Our Recent Events</h1>
            <EventList />
        </section >
    </section>
}