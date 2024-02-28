import { useEvents } from "../../../../../hooks/useEvents"
import { EventList } from "./widgets/event-list"

export const Events = () => {
    const { events } = useEvents()
    return <section className="w-full">
        <div className="bg-white w-fit p-5 rounded-md shadow-2xl">
            <h1 className="text-slate-400 font-bold">Total Events</h1>
            <span className="text-slate-800 font-bold">{events?.length}</span>
        </div>
        <div className="h-4"></div>
        <EventList events={events} />
    </section>
}