import { Link } from "react-router-dom"
import { useEvents } from "../../../../hooks/useEvents"
import { EventList } from "../../components/event-list"
import { EventListItem } from "./widgets/event-list-item"

export const Events = () => {
    const { events } = useEvents()

    return <section>
        {events.map((event, index: number) => (
            <Link to={`${event.title}`} state={{ event: event }}>
                <EventListItem event={event} index={index} /></Link>
        ))}
    </section>
}