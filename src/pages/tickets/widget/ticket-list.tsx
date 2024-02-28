import { TicketListItem } from "./ticket-list-item"

export const TicketList = ({ tickets }) => {
    return <table className="text-center w-full">
        <thead>
            <tr>
                <th className="p-2.5">#</th>
                <th>Ticket ID</th>
                <th>Owner ID</th>
                <th>Owner Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Date of Purchase</th>
                <th>Validity</th>
                <th>isValid</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {tickets?.filter(ticket => {
                return ticket.isDeleted !== true
            }).map((ticket, index: number) => (
                <TicketListItem ticket={ticket} index={index} />
            ))}
        </tbody>
    </table>
}