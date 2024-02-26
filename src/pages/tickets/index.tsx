import { useTickets } from "../../hooks/useTickets"
import { TicketList } from "./widget/ticket-list";

export const Tickets = () => {
    const { tickets } = useTickets();
    return <main className="h-screen">All Tickets
        <TicketList tickets={tickets} />
    </main>
}