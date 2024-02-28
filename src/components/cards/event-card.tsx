import { Event } from "../../utils/interfaces"

interface EventProp {
    event: Event,
    index: number
}

export const EventCard: React.FC<EventProp> = ({ event, index }) => {
    return <div className=" w-80 bg-white rounded-md border border-white relative" key={index}>
        <img src="/images/hero-section-bg.png" alt="" className="object-fill rounded-t-md" />
        <div className="p-1">
            <h1 className="font-bold text-2xl">{event.title}</h1>
            <p className="text-slate-500 overflow-ellipsis">{event.description}</p>
        </div>
    </div>
}