import { Link, Route, Routes } from "react-router-dom"
import { EventListItem } from "./event-list-item"
import { AddEventModal } from "./modal/AddEventModal"
import { Event } from "../../../../../utils/interfaces"
interface EventsProps {
    events: Event[] | null | undefined
}
export const EventList: React.FC<EventsProps> = ({ events }) => {


    return (
        <section className="space-y-8">
            <h1 className="text-white font-bold text-2xl">Events</h1>
            <div className="bg-white w-fit p-5 shadow-md shadow-slate-500 rounded-md">
                <h1 className="font-bold text-slate-400">Total Events</h1>
                <p className="font-bold text-slate-600">{events?.filter((event) => {
                    return event.isDeleted === false
                }).length}</p>
            </div>

            <Routes>
                <Route path="add" element={<AddEventModal />} />
            </Routes>

            <section className="mt-4">
                <Link to="add" className="bg-blue-900 text-white p-2.5 rounded-md"><i className="fa-solid fa-add"></i> Add Event</Link>
                <table className="w-full text-center mt-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Event ID</th>
                            <th>Event Name</th>
                            <th className="text-center">Tickets
                                <tr className="w-full flex gap-10">
                                    <th>
                                        Regular
                                        <tr className="w-full flex gap-4">
                                            <th>Tickets</th>
                                            <th>Reserved</th>
                                            <th>Remaining</th>
                                        </tr>
                                    </th>
                                    <th> <th>
                                        VIP
                                        <tr className="w-full flex gap-4">
                                            <th>Tickets</th>
                                            <th>Reserved</th>
                                            <th>Remaining</th>
                                        </tr>
                                    </th></th>
                                </tr>
                            </th>
                            <th className="text-center">
                                Ticket Price
                                <tr className="w-full flex justify-around">
                                    <th>Regular</th>
                                    <th>VIP</th>
                                </tr>
                            </th>
                            <th>Date of Event</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events?.map((event, index: number) => {
                            return <EventListItem event={event} index={index} />
                        })}
                    </tbody>
                </table>
            </section>
        </section>
    )
}