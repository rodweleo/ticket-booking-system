import { TicketListItem } from "./ticket-list-item"

export const TicketList = ({ tickets }) => {
    return <table className="text-left w-full">
        <thead>
            <tr>
                <th>#</th>
                <th>ID</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date of Purchase</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {tickets?.map((ticket, index: number) => (
                <TicketListItem ticket={ticket} index={index} />
            ))}
        </tbody>
    </table>
}