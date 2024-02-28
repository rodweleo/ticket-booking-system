import { useContext } from "react"
import { Ticket } from "../../../utils/interfaces"
import { TicketListItem } from "./ticket-list-item"
import { UserContext } from "../../../context/UserContext"


interface TicketListProps {
    tickets: Ticket[] | null
}
export const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
    const userContext = useContext(UserContext)
    return <table className="text-left w-full">
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
                {userContext?.role === "admin" && <th>Action</th>}
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