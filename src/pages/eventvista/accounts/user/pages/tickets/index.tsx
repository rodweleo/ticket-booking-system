import { useTickets } from "../../../../../../hooks/useTickets"
import { TicketList } from "../../../../../tickets/widget/ticket-list";

export const MyTickets = () => {
    const { userTickets } = useTickets()

    return <section className="space-y-4">
        <h1 className="text-white font-bold text-2xl">My Tickets</h1>
        <div className="bg-white w-fit p-5 rounded-md shadow-lg shadow-slate-600">
            <h2 className="text-slate-400 font-bold  text-xl">Tickets</h2>
            <p className="text-slate-800 font-bold text-2xl">{userTickets?.length}</p>
        </div>

        <TicketList tickets={userTickets} />
    </section>
}