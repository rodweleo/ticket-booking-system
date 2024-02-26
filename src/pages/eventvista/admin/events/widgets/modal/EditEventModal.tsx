import { TextField } from "../../../../../../components/TextField"

export const EditEventModal = ({ event, setEditEvent }) => {
    return <dialog open className="bg-black bg-opacity-50 w-full h-screen fixed top-0 flex items-center justify-center">
        <form className="bg-white w-1/2 h-auto rounded-md relative p-5">
            <h1>Edit event <span className="font-bold">{event.id}</span></h1>
            <div className="h-4"></div>
            <i className="fa-solid fa-close absolute top-[-40px] right-[-40px] bg-red-300 p-2.5 rounded-full cursor-pointer text-red-900 hover:bg-red-400" onClick={() => setEditEvent(null)}></i>
            <div className="flex flex-col gap-6">
                <TextField options={{
                    defaultValue: event.title,
                    label: "Event Name",
                    type: "string"
                }} />

                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl">Tickets</h2>
                    <div>
                        <h2 className="font-bold">Regular</h2>
                        <div className="flex gap-4">
                            <TextField options={{
                                defaultValue: event.tickets.types.vip.number,
                                label: "Number of Tickets",
                                type: "number"
                            }} />
                            <TextField options={{
                                defaultValue: event.tickets.types.vip.amount,
                                label: "Price per Ticket (KES)",
                                type: "number"
                            }} />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold">VIP</h2>
                        <div className="flex gap-4">
                            <TextField options={{
                                defaultValue: event.tickets.types.regular.number,
                                label: "Number of Tickets",
                                type: "number"
                            }} />
                            <TextField options={{
                                defaultValue: event.tickets.types.regular.amount,
                                label: "Price per Ticket (KES)",
                                type: "number"
                            }} />
                        </div>
                    </div>
                </div>

                <TextField options={{
                    defaultValue: event.dateOfEvent,
                    label: "Date of Event",
                    type: "date"
                }} />
            </div>
            <div className="flex gap-5 justify-center mt-5">
                <button type="button" className="border border-slate-300 transition-all duration-300 hover:bg-slate-300 p-2.5 rounded-md" onClick={() => setEditEvent(null)}><i className="fa-solid fa-cancel"></i> Cancel</button>
                <button type="button" className="bg-green-300 hover:bg-green-500 transition-all duration-300 p-2.5 rounded-md"><i className="fa-solid fa-save"></i> Save changes</button>
            </div>
        </form>
    </dialog>
}