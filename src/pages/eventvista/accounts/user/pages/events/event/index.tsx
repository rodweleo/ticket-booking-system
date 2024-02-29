import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router"
import { useTickets } from "../../../../../../../hooks/useTickets";

export const EventPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const event = useLocation().state.event;

    const { reserveTickets } = useTickets();
    const [selectedTickets, setSelectedTickets] = useState({
        regular: 0,
        totalRegularAmount: 0,
        vip: 0,
        totalVipAmount: 0,
        totalAmount: 0,
    })

    // Update totalRegularAmount whenever the number of selected regular tickets changes
    useEffect(() => {
        const regularPrice = event.tickets.types.regular.price;
        setSelectedTickets(prevState => ({
            ...prevState,
            totalRegularAmount: prevState.regular * regularPrice
        }));
    }, [selectedTickets.regular]);

    // Update totalVipAmount whenever the number of selected vip tickets changes
    useEffect(() => {
        const vipPrice = event.tickets.types.vip.price;
        setSelectedTickets(prevState => ({
            ...prevState,
            totalVipAmount: prevState.vip * vipPrice
        }));
    }, [selectedTickets.vip]);

    useEffect(() => {
        setSelectedTickets({
            ...selectedTickets, totalAmount: selectedTickets.totalRegularAmount + selectedTickets.totalVipAmount
        })
    }, [selectedTickets.totalRegularAmount, selectedTickets.totalVipAmount])

    const increaseRegularTicketCount = () => {
        if ((selectedTickets.regular + selectedTickets.vip) !== 5 && (selectedTickets.regular + selectedTickets.vip) < event.tickets.types.regular.number) {
            setSelectedTickets({ ...selectedTickets, regular: selectedTickets.regular + 1 })
        }

    }

    const decreaseRegularTicketCount = () => {
        if (selectedTickets.regular > 0) {
            setSelectedTickets({ ...selectedTickets, regular: selectedTickets.regular - 1 })
        }
    }

    const increaseVIPTicketCount = () => {
        if ((selectedTickets.regular + selectedTickets.vip) !== 5 && (selectedTickets.regular + selectedTickets.vip) < event.tickets.types.vip.number) {
            setSelectedTickets({ ...selectedTickets, vip: selectedTickets.vip + 1 })
        }
    }

    const decreaseVIPTicketCount = () => {
        if (selectedTickets.vip > 0) {
            setSelectedTickets({ ...selectedTickets, vip: selectedTickets.vip - 1 })
        }
    }

    const handleTicketReservation = async () => {
        const response = await reserveTickets(event, selectedTickets);

        if (response.errors.length === 0) {
            if (response.successes.length === (selectedTickets.regular + selectedTickets.vip)) {
                alert(response.emailSentResponse)
            }

            setSelectedTickets({
                totalAmount: 0,
                regular: 0,
                totalRegularAmount: 0,
                totalVipAmount: 0,
                vip: 0
            })
        }
    }
    return (
        <section className="space-y-10">
            <p className="text-white text-xl font-bold"><i className="fa-solid fa-arrow-left text-white" onClick={() => navigate(-1)}></i> {id}</p>
            <section className="flex justify-start max-lg:flex-wrap h-screen space-x-4 transition-all duration-300 ease-in-out">
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
                            <p className="text-slate-300 text-lg">{event.description}</p>
                        </div>
                        <div className="space-y-3">
                            <h2 className="font-bold text-white text-2xl">Tickets</h2>
                            <table>
                                <thead>
                                    <tr className="text-slate-700">
                                        <th className="p-2.5">Ticket Type</th>
                                        <th className="p-2.5">Tickets Available</th>
                                        <th className="p-2.5">Price (KES)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(event.tickets.types).map((ticketType: any, index: number) => (
                                        <tr className="border text-center font-bold" key={index}>
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


                            <div className="flex flex-col justify-around space-y-4">
                                <h2 className="font-bold text-slate-200 text-xl">Reserve Tickets: </h2>
                                <div className="grid grid-cols-2 w-fit space-x-10">
                                    <div className="space-y-4">
                                        <h3 className="text-white font-bold">Regular Tickets</h3>
                                        <div className="space-x-4">
                                            <button className="text-slate-300 scale-110" onClick={() => decreaseRegularTicketCount()}><i className="fa-solid fa-minus"></i></button>
                                            <span className="text-blue-900 font-bold bg-white p-2 rounded-md">{selectedTickets.regular}</span>
                                            <button className="text-slate-300 scale-110" onClick={() => increaseRegularTicketCount()}><i className="fa-solid fa-add"></i></button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-white font-bold">VIP Tickets</h3>
                                        <div className="space-x-4">
                                            <button className="text-slate-300 scale-110" onClick={() => decreaseVIPTicketCount()}><i className="fa-solid fa-minus"></i></button>
                                            <span className="text-blue-900 font-bold bg-white p-2 rounded-md">{selectedTickets.vip}</span>
                                            <button className="text-slate-300 scale-110" onClick={() => increaseVIPTicketCount()}><i className="fa-solid fa-add"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="flex justify-end gap-10">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-slate-200 font-bold">Total Amount:</h2>
                                <span className="text-blue-500 font-bold text-lg">{(selectedTickets.totalRegularAmount + selectedTickets.totalVipAmount).toLocaleString("en", {
                                    style: "currency",
                                    currency: "KES"
                                })}</span>
                            </div>
                            <button className="bg-blue-900 rounded-md p-2.5 text-white font-bold disabled:bg-slate-400 disabled:text-slate-600" onClick={() => handleTicketReservation()} disabled={(selectedTickets.regular + selectedTickets.vip) === 0}>Reserve Tickets</button>
                        </div>
                    </div >
                </div>
            </section>
        </section >
    )
}