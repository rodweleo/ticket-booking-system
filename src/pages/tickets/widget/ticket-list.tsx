import { Ticket } from "../../../utils/interfaces"
import { TicketListItem } from "./ticket-list-item"



interface TicketListProps {
    tickets: Ticket[] | null
}
export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
    return <table className="text-center w-full">
        <thead>
            <tr>
                <th className="p-2.5">#</th>
                <th>Ticket ID</th>
                <th>Owner</th>
                <th>Ticket Type</th>
                <th>Ticket Price</th>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Date of Purchase</th>
                <th>Validity</th>
                <th>isValid</th>
                <th className="hidden">Action</th>
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