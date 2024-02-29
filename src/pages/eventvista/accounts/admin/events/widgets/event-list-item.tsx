import { useEffect, useId, useState } from "react"
import { useEvents } from "../../../../../../hooks/useEvents"
import { EditEventModal } from "./modal/EditEventModal"
import moment from "moment"
import { Event, Ticket } from "../../../../../../utils/interfaces"


interface EventProps {
    event: Event,
    index: number
}
export const EventListItem: React.FC<EventProps> = ({ event, index }) => {
    const { deleteEvent, fetchEventTickets } = useEvents()
    const eventActionMenuId = useId()

    const [editEvent, setEditEvent] = useState<Event | null>(null);
    const [eventTickets, setEventTickets] = useState<Ticket[] | null>([]);
    function toggleEventActionMenu() {
        document.getElementById(eventActionMenuId)?.classList.toggle("hidden")
    }

    //GET THE TICKETS FOR A GIVEN EVENT
    useEffect(() => {
        fetchEventTickets(event).then((eventTickets) => {
            setEventTickets(eventTickets)
        })

    }, [])

    return <>
        <tr>
            <td>{index + 1}</td>
            <td>{event.id}</td>
            <td>{event.title}</td>
            <td>
                <tr className="flex gap-28 w-full">
                    <td>
                        <tr className="flex gap-16">
                            <td>{event.tickets.types.regular.number} </td>
                            <td>{eventTickets?.filter(ticket => {
                                return ticket.type === "Regular"
                            }).length} </td>
                            <td>{event.tickets.types.regular.number - eventTickets!.filter(ticket => {
                                return ticket.type === "Regular"
                            }).length} </td>
                        </tr>
                    </td>
                    <td><tr className="flex gap-16">
                        <td>{event.tickets.types.vip.number} </td>
                        <td>{eventTickets?.filter(ticket => {
                            return ticket.type === "VIP"
                        }).length} </td>
                        <td>{event.tickets.types.vip.number - eventTickets!.filter(ticket => {
                            return ticket.type === "VIP"
                        })?.length} </td>
                    </tr></td>
                </tr>
            </td>
            <td className="text-center">
                <tr className="flex w-full justify-around">
                    <td>{event.tickets.types.regular.price.toLocaleString("en", {
                        style: "currency",
                        currency: "KES"
                    })}</td>
                    <td>{event.tickets.types.vip.price.toLocaleString("en", {
                        style: "currency",
                        currency: "KES"
                    })}</td>
                </tr>
            </td>

            <td>{moment(event.dateOfEvent).format("dddd, MMMM Do YYYY")}</td>
            <td className="relative">
                <i className="fa-solid fa-ellipsis-vertical cursor-pointer" onClick={() => toggleEventActionMenu()}></i>
                <ul id={eventActionMenuId} className="absolute hidden bg-slate-400 text-white w-40 top-16 right-0 text-left space-y-1 ">
                    <li className="text-green-900 px-2 py-2 font-bold hover:bg-green-300"><button onClick={() => setEditEvent(event)}><i className="fa-solid fa-edit"></i> Edit Event</button></li>
                    <li className="text-red-900 font-bold px-2 py-2 hover:bg-red-300"><button onClick={() => deleteEvent(event)}><i className="fa-solid fa-trash"></i> Delete Event</button></li>
                </ul>
            </td>
        </tr>
        {editEvent && <EditEventModal event={event} setEditEvent={setEditEvent} />}
    </>
}