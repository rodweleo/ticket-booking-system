import { Link } from "react-router-dom"
import { EventListItem } from "./widgets/event-list-item"
import { useEvents } from "../../../../../../../hooks/useEvents"

export const Events = () => {
    const { events } = useEvents()

    return <section className="flex w-full">
        {events?.map((event, index: number) => (
            <Link to={`${event.title}`} state={{ event: event }}>
                <EventListItem event={event} index={index} /></Link>
        ))}
    </section>
}