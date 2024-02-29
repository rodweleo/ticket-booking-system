import { useTickets } from "../../../../../../hooks/useTickets"

export const MyTickets = () => {
    const { userTickets } = useTickets()

    return <section className="space-y-4">
        <h1 className="text-white font-bold text-2xl">My Tickets</h1>
        <div className="bg-white w-fit p-5 rounded-md shadow-lg shadow-slate-600">
            <h2 className="text-slate-400 font-bold  text-xl">Tickets</h2>
            <p className="text-slate-800 font-bold text-2xl">{userTickets?.length}</p>
        </div>

        <table className="text-left">
            <thead>
                <tr>
                    <th className="p-2.5">#</th>
                    <th>Ticket ID</th>
                    <th>Ticket Type</th>
                    <th>Event ID</th>
                    <th>Event Name</th>
                    <th>Ticket Price</th>
                    <th>Date of Purchase</th>
                    <th>Validity</th>
                    <th>Created By</th>
                </tr>
            </thead>
            <tbody>
                {userTickets?.map((ticket, index: number) => {
                    return <tr className=" bg-white border even:bg-slate-200 hover:bg-slate-300 cursor-pointer ">
                        <td className="p-2.5">
                            {index + 1}
                        </td>
                        <td>
                            {ticket.id}
                        </td>
                        <td>
                            {ticket.type}
                        </td>
                        <td>
                            {ticket.eventId}
                        </td>
                        <td>
                            {ticket.eventName}
                        </td>
                        <td>
                            {ticket.price}
                        </td>
                        <td>
                            {ticket.createdAt}
                        </td>
                        <td>
                            {ticket.expiresBy}
                        </td>
                        <td>
                            {ticket.createdBy}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>


    </section>
}