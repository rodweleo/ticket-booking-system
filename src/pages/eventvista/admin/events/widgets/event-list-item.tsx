import { useId, useState } from "react"
import { useEvents } from "../../../../../hooks/useEvents"
import { EditEventModal } from "./modal/EditEventModal"

export const EventListItem = ({ event, index }) => {
    const { deleteEvent } = useEvents()
    const eventActionMenuId = useId()

    const [editEvent, setEditEvent] = useState(null);
    function toggleEventActionMenu() {
        document.getElementById(eventActionMenuId)?.classList.toggle("hidden")
    }


    return <>
        <tr>
            <td>{index + 1}</td>
            <td>{event.id}</td>
            <td>{event.title}</td>
            <td>
                <tr className="w-full flex justify-around">
                    <td>{event.tickets.types.regular.number} Ticket(s)</td>
                    <td>{event.tickets.types.vip.number} Tickets(s)</td>
                </tr>
            </td>
            <td className="text-center">
                <tr className="flex w-full justify-around">
                    <td>{event.tickets.types.regular.amount.toLocaleString("en", {
                        style: "currency",
                        currency: "KES"
                    })}</td>
                    <td>{event.tickets.types.vip.amount.toLocaleString("en", {
                        style: "currency",
                        currency: "KES"
                    })}</td>
                </tr>
            </td>
            <td>{event.dateOfEvent}</td>
            <td className="relative">
                <i className="fa-solid fa-ellipsis-vertical cursor-pointer" onClick={() => toggleEventActionMenu()}></i>
                <ul id={eventActionMenuId} className="absolute bg-slate-400 text-white w-40 top-16 right-0 text-left space-y-1 ">
                    <li className="text-green-900 px-2 py-2 font-bold hover:bg-green-300"><button onClick={() => setEditEvent(event)}><i className="fa-solid fa-edit"></i> Edit Event</button></li>
                    <li className="text-red-900 font-bold px-2 py-2 hover:bg-red-300"><button onClick={() => deleteEvent(event.id)}><i className="fa-solid fa-trash"></i> Remove Event</button></li>
                </ul>
            </td>
        </tr>
        {editEvent && <EditEventModal event={event} setEditEvent={setEditEvent} />}
    </>
}