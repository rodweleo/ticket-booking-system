import { useEvents } from "../../../hooks/useEvents"
import { EventListItem } from "../pages/events/widgets/event-list-item"

export const EventList = () => {
    const { events } = useEvents()

    return <section className="flex gap-5 flex-wrap items-start -z-50">
        {events?.map((event, index: number) => (
            <EventListItem event={event} index={index} />
        ))}
    </section >
}