import moment from "moment";
import { useNavigate, useParams } from "react-router"
import { useState, useEffect } from "react"
import { FaCalendarDay, FaUserTie } from "react-icons/fa";
import { FaLocationDot, FaTicket } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import useEventQuery from "../../../react-queries/use-event-query";

export const EventPage = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<string>("event-details")
    const { data, isLoading} = useEventQuery(id as string);
    const navigate = useNavigate();
    const event = data;


    const tabs = [
        {
            name: "Event Details",
            id: "event-details"
        },
        {
            name: "Tickets",
            id: "tickets"
        },
        {
            name: "Reviews",
            id: "reviews"
        }
    ]


    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }

    useEffect(() => {
        document.title = event?.title;
        const favicon = document.getElementById("favicon");
        if (favicon) {
            favicon.setAttribute("href",
                "/images/hero-section-bg.png");
        }
       
    }, [])

    if(!event){
        return (
            <div>No event found</div>
        )
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Perform any necessary validation here
        navigate(`checkout`, {
            state: {
                event: event,
                tickets: 2,
                attendees: 2
        }});
    };


    return (
        <main className="container space-y-10 ">
            <section className="flex justify-between flex-wrap gap-5">
                <div className="relative w-full">
                    <img src="/images/hero-section-bg.png" alt="" className="w-full" />
                    <div className="absolute bottom-5  w-full grid place-items-center">
                        <ul className="w-fit flex justify-between items-center p-5">
                            <li className="w-10 h-1 bg-slate-500"></li>
                        </ul>
                    </div>
                </div>
                <div className="w-full space-y-5">
                    <div id={`about-${event.title}`} className="space-y-3">
                        <h1 className="font-bold text-white text-3xl">About {event.title}</h1>
                        <p className="text-slate-100 text-lg">{event.description}</p>
                    </div>

                    <div className="space-y-5">
                        <ul className="flex gap-5 items-center text-xl">
                            {
                                tabs.map((tab, index) => (
                                    <li key={index} onClick={() => handleTabClick(tab.id)} className={` border-t-0 border-r-0 border-l-0 px-5 py-1 cursor-pointer ${tab.id === activeTab ? "border-4 border-blue-500 text-blue-500" : "text-slate-400"}`}>{tab.name}</li>
                                ))
                            }
                        </ul>
                        <div>
                            {
                                activeTab === "event-details" && (
                                    <div>
                                        <h1 className="text-white font-bold text-2xl"></h1>
                                        <ul className="space-y-5">
                                            <li>
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarDay size={40} className="text-blue-500 bg-blue-500/40 p-2 rounded-full" />
                                                    <div className="*:text-white">
                                                        <h1 >Date & Time</h1>
                                                        <p className="text-lg font-bold">{moment(event.dateofEvent).format("MMMM Do YYYY")}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center gap-2">
                                                    <FaLocationDot size={40} className="text-blue-500 bg-blue-500/40 p-2 rounded-full" />
                                                    <div className="*:text-white">
                                                        <h1 >Location</h1>
                                                        <p className="text-lg font-bold">{event.location.address.address}, {event.location.address.county}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center gap-2">
                                                    <FaUserTie size={40} className="text-blue-500 bg-blue-500/40 p-2 rounded-full" />
                                                    <div className="*:text-white">
                                                        <h1 >Organized By</h1>
                                                        <p className="text-lg font-bold">NULL</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>

            <form onSubmit={handleSubmit}>
                <Button type="submit" className="flex items-center gap-2.5 bg-blue-900 hover:bg-blue-800 text-xl py-6 rounded-md w-full" disabled={isLoading || !event}><FaTicket size={25} /> <span>BOOK NOW</span></Button>
            </form>



            <section className="hidden justify-start max-lg:flex-wrap items-start h-screen space-x-4 transition-all duration-300 ease-in-out">
                

                <div>
                    <h1 className="text-white font-bold text-2xl">{id}</h1>
                    <div className="space-y-3 p-2.5 ">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-4">

                                <ul className="text-white space-y-2">
                                    <li className="flex items-center gap-2"> <i className="fa-regular fa-calendar text-slate-400 scale-125" ></i> {moment(event.dateofEvent).format("MMMM Do YYYY")}</li>
                                    <li className="flex items-center gap-2"> <i className="fa-solid fa-building text-slate-400"></i> {event.location.venue}</li>
                                </ul>
                            </div>
                            <ul className="text-white flex space-x-2">
                                <li><i className="fa-solid fa-clock text-slate-400"></i></li>
                                <li>{event.time.from}</li>
                                <li>-</li>
                                <li>{event.time.to}</li>
                            </ul>
                        </div>


                        <div className="space-y-3">
                            <h2 className="font-bold text-white text-2xl">Tickets</h2>
                            <table className="text-white">
                                <thead>
                                    <tr>
                                        <th className="p-2.5">Ticket Type</th>
                                        <th className="p-2.5">Tickets Available</th>
                                        <th className="p-2.5">Price (KES)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(event.tickets.types).map((ticketType: any, index: number) => (
                                        <tr className="border text-center" key={index}>
                                            <td className="p-2.5 border">{ticketType[0].toUpperCase()}</td>
                                            <td className="border">{ticketType[1].number}</td>
                                            <td>{ticketType[1].price.toLocaleString("en", {
                                                style: "currency",
                                                currency: "KES"
                                            })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>





                        </div>

                    </div >
                </div>
            </section>
        </main >
    )
}