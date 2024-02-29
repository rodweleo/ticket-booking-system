import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEvents } from "../../../../../../../hooks/useEvents";
import { TextField } from "../../../../../../../components/TextField";
export const AddEventModal = () => {
    const { addEvent } = useEvents()
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const handleEventEdit = async (data: FieldValues) => {
        const response = await addEvent(data)
        if (response) {
            alert(response)
            navigate(-1)
        }
    }

    return <dialog open className="bg-black bg-opacity-50 w-full h-screen fixed top-[-20px] flex items-center justify-center">
        <i className="fa-solid fa-close absolute top-0 right-0 bg-red-300 p-2.5 rounded-full cursor-pointer text-red-900 hover:bg-red-400 m-10" onClick={() => navigate(-1)}></i>
        <form className="bg-white w-1/2 rounded-md relative p-5 text-left h-4/5 overflow-y-scroll" onSubmit={handleSubmit(handleEventEdit)}>
            <h1 className="font-bold">Add Event</h1>
            <div className="h-4"></div>
            <hr className=" h-[2px] bg-slate-300" />

            <div className="flex flex-col gap-6">
                <TextField options={{
                    register,
                    name: "eventName",
                    label: "Event Name",
                    type: "string"
                }} />
                <div className="w-full">
                    <label htmlFor="" className="font-bold text-slate-500">Event Description</label>
                    <textarea  {...register("description")} className="bg-slate-300 p-2.5 rounded-md min-h-36 w-full"></textarea>
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

                                label: "Number of Tickets",
                                type: "number",
                                min: 0
                            }} />
                            <TextField options={{
                                register,
                                name: "regularTicketPrice",
                                label: "Price per Ticket (KES)",
                                type: "number",
                                min: 0
                            }} />
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold">VIP</h2>
                        <div className="flex gap-4">
                            <TextField options={{
                                register,
                                name: "numberOfVIPTickets",
                                min: 0,
                                label: "Number of Tickets",
                                type: "number",
                                defaultValue: 0
                            }} />
                            <TextField options={{
                                register,
                                name: "vipTicketPrice",
                                min: 0,
                                label: "Price per Ticket (KES)",
                                type: "number",
                                defaultValue: 0
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

                            }} />
                    </div>
                </div>
                <hr className=" h-[2px] bg-slate-300" />

                <h1 className="font-bold text-xl">Date & Time</h1>
                <TextField options={{
                    register,
                    name: "dateOfEvent",
                    min: new Date().toISOString().split('T')[0],
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

                        }} />
                        <TextField options={{
                            register,
                            name: "to",
                            label: "To",
                            type: "time",

                        }} />
                    </div>
                </div>

                <hr className=" h-[2px] bg-slate-300" />
            </div>
            <div className="flex gap-5 justify-center mt-5">
                <button type="reset" className="border border-slate-300 transition-all duration-300 hover:bg-slate-300 p-2.5 rounded-md" onClick={() => navigate(-1)}><i className="fa-solid fa-cancel"></i> Cancel</button>
                <button type="submit" className="bg-green-300 hover:bg-green-500 transition-all duration-300 p-2.5 rounded-md"><i className="fa-solid fa-save"></i> Save changes</button>
            </div>
        </form>
    </dialog>
}