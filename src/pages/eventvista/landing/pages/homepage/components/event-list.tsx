import { useEvents } from "../../../../../../hooks/useEvents"
import { EventListItem } from "../pages/events/widgets/event-list-item"

export const EventList = () => {
    const { events } = useEvents()

    return <section className="flex bg-red-300">
        {events?.map((event, index: number) => (
            <EventListItem event={event} index={index} />
        ))}
    </section >
}