import { EventListItem } from "./event-list-item"

export const EventList = ({ events }) => {
    return <table className="w-full text-left">
        <thead>
            <tr>
                <th>#</th>
                <th>ID</th>
                <th>Event Name</th>
                <th className="text-center">Tickets
                    <tr className="w-full flex justify-around">
                        <th >Regular</th>
                        <th >VIP</th>
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
            {events.map((event, index: number) => {
                return <EventListItem event={event} index={index} />
            })}
        </tbody>
    </table>
}