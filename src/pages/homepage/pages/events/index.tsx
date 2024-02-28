import { Link } from "react-router-dom"
import { useEvents } from "../../../../hooks/useEvents"
import { EventListItem } from "./widgets/event-list-item"

export const Events = () => {
    const { events } = useEvents()

    return <section className="h-screen w-full">
        {events.map((event, index: number) => (
            <Link to={`${event.title}`} state={{ event: event }} key={index}>
                <EventListItem event={event} index={index} /></Link>
        ))}
    </section>
}