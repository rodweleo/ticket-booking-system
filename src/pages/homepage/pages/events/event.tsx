import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router"


export const EventPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const event = useLocation().state.event;

    return (
        <section className="space-y-10">
            <p className="text-white text-xl font-bold"><i className="fa-solid fa-arrow-left text-white" onClick={() => navigate(-1)}></i> {id}</p>
            <section className="flex justify-start max-lg:flex-wrap items-start h-screen space-x-4 transition-all duration-300 ease-in-out">
                <img src="/images/hero-section-bg.png" alt="" className="lg:w-1/2 object-contain rounded-md" />

                <div>
                    <h1 className="text-white font-bold text-2xl">{id}</h1>
                    <div className="space-y-3 p-2.5">
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
                            <h2 className="font-bold text-white text-2xl">About</h2>
                            <p className="text-slate-400">{event.description}</p>
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
        </section >
    )
}