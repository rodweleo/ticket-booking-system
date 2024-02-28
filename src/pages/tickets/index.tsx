import { useTickets } from "../../hooks/useTickets"
import { TicketList } from "./widget/ticket-list";

export const Tickets = () => {
    const { tickets } = useTickets();
    return <section className="space-y-4">
        <h1 className="text-white font-bold text-2xl">All Tickets</h1>
        <div className="bg-white w-fit p-5 shadow-md shadow-slate-500 rounded-md">
            <h1 className="font-bold text-slate-400">Total Tickets</h1>
            <p className="font-bold text-slate-600">{tickets?.length}</p>
        </div>
        <TicketList tickets={tickets} />
    </section>
}