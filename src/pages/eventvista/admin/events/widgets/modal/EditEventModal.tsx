import { TextField } from "../../../../../../components/TextField"
import { FieldValues, useForm } from "react-hook-form";
import { useEvents } from "../../../../../../hooks/useEvents";
import { Event } from "../../../../../../utils/interfaces";

interface EditEventModalProps {
    event: Event,
    setEditEvent: React.Dispatch<React.SetStateAction<Event | null>>
}
export const EditEventModal: React.FC<EditEventModalProps> = ({ event, setEditEvent }) => {
    const { editEvent } = useEvents()
    const { register, handleSubmit } = useForm();

    const handleEventEdit = async (data: FieldValues) => {
        const response = await editEvent(data)
        if (response) {
            alert(response)
            setEditEvent(null)
        }
    }

    return <dialog open className="bg-black bg-opacity-50 w-full h-screen fixed top-0 flex items-center justify-center">
        <i className="fa-solid fa-close absolute top-0 right-0 bg-red-300 p-2.5 rounded-full cursor-pointer text-red-900 hover:bg-red-400 m-10" onClick={() => setEditEvent(null)}></i>
        <form className="bg-white w-1/2 rounded-md relative p-5 text-left h-4/5 overflow-y-scroll" onSubmit={handleSubmit(handleEventEdit)}>
            <h1 className="font-bold">Edit Event <span className="font-bold"><input type="text" {...register("id")} defaultValue={event.id} className="outline-0 border-0 readonly" /></span></h1>
            <div className="h-4"></div>
            <hr className=" h-[2px] bg-slate-300" />

            <div className="flex flex-col gap-6">
                <TextField options={{
                    register,
                    name: "eventName",
                    defaultValue: event.title,
                    label: "Event Name",
                    type: "string"
                }} />
                <div className="w-full">
                    <label htmlFor="" className="font-bold text-slate-500">Event Description</label>
                    <textarea defaultValue={event.description} {...register("description")} className="bg-slate-300 p-2.5 rounded-md min-h-36 w-full"></textarea>
                </div>


                <hr className=" h-[2px] bg-slate-300" />
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-xl">Tickets</h2>
                    <div>
                        <h2 className="font-bold">Regular</h2>
                        <div className="flex gap-4">
                            <TextField options={{
                                register,
                                name: "numberOfRegularTickets",
                                defaultValue: event.tickets.types.regular.number,
                                label: "Number of Tickets",
                                type: "number"
                            }} />
                            <TextField options={{
                                register,
                                name: "regularTicketPrice",
                                defaultValue: event.tickets.types.regular.price,
                                label: "Price per Ticket (KES)",
                                type: "number"
                            }} />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold">VIP</h2>
                        <div className="flex gap-4">
                            <TextField options={{
                                register,
                                name: "numberOfVIPTickets",
                                defaultValue: event.tickets.types.vip.number,
                                label: "Number of Tickets",
                                type: "number"
                            }} />
                            <TextField options={{
                                register,
                                name: "vipTicketPrice",
                                defaultValue: event.tickets.types.vip.price,
                                label: "Price per Ticket (KES)",
                                type: "number"
                            }} />
                        </div>
                    </div>
                </div>

                <hr className=" h-[2px] bg-slate-300" />
                <div>
                    <h2 className="font-bold text-xl">Location</h2>
                    <div className="w-full grid grid-cols-2 gap-4">
                        <TextField
                            options={{
                                register,
                                name: "venue",
                                label: "Venue",
                                type: "string",
                                defaultValue: event.location.venue
                            }} />

                        <TextField
                            options={{
                                register,
                                name: "address",
                                label: "Address",
                                type: "address",

                            }} />
                        <TextField
                            options={{
                                register,
                                name: "county",
                                label: "County",
                                type: "address",
                                defaultValue: event.location.address.county
                            }} />
                    </div>
                </div>
                <hr className=" h-[2px] bg-slate-300" />

                <h1 className="font-bold text-xl">Date & Time</h1>
                <TextField options={{
                    register,
                    name: "dateOfEvent",
                    defaultValue: event.dateOfEvent,
                    label: "Date",
                    type: "date"
                }} />
                <div className="flex flex-col">
                    <h2 className="font-bold text-slate-500">Time</h2>
                    <div className="flex space-x-4">
                        <TextField options={{
                            register,
                            name: "from",
                            label: "From",
                            type: "time",
                            defaultValue: event.time.from
                        }} />
                        <TextField options={{
                            register,
                            name: "to",
                            label: "To",
                            type: "time",
                            defaultValue: event.time.to
                        }} />
                    </div>
                </div>

                <hr className=" h-[2px] bg-slate-300 my-4" />
            </div>
            <div className="flex gap-5 justify-center ">
                <button type="button" className="border border-slate-300 transition-all duration-300 hover:bg-slate-300 p-2.5 rounded-md" onClick={() => setEditEvent(null)}><i className="fa-solid fa-cancel"></i> Cancel</button>
                <button type="submit" className="bg-green-300 hover:bg-green-500 transition-all duration-300 p-2.5 rounded-md"><i className="fa-solid fa-save"></i> Save changes</button>
            </div>
        </form>
    </dialog>
}