import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import CategoryCard from "@/components/ui/category-card"
import UpcomingEvents from "@/components/ui/upcoming-events"
import HomeHeroSection from "@/components/ui/home-hero-section"
export const HomePage = () => {
    
    return <main className="space-y-10">
        <HomeHeroSection/>
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
            <h1 className="text-white text-3xl font-bold">Popular Events Near You </h1>
            <p className="font-bold text-slate-400 text-xl italic">No Events Near You.</p>
        </section>

        <section className="container z-50 space-y-5">
            <h1 className="text-white text-3xl font-bold">Browse by Categories </h1>
            <p className="font-bold text-slate-400 text-xl italic">No Available Categories.</p>
            <div className="flex flex-wrap gap-5 hidden">
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