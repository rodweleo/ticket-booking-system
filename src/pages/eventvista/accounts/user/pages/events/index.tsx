import { Link } from "react-router-dom";
import { EventCard } from "../../../../../../components/cards/event-card";
import { useEvents } from "../../../../../../hooks/useEvents"
import { EventCardSkeleton } from "../../../../../../components/skeletons/event-card-skeleton";

export const MyEvents = () => {
    const { events, isFetchingEvents } = useEvents();
    return <section className="space-y-4">
        <h1 className="text-white font-bold text-2xl">My Events</h1>

        {isFetchingEvents && <div className="flex flex-wrap gap-4">
            <EventCardSkeleton /><EventCardSkeleton /></div>}
        <section className="flex flex-wrap gap-5">
            {events?.map((event, index: number) => {
                return <Link to={`${event.title}`} state={{ event: event }} key={index}>
                    <EventCard event={event} index={index} /></Link>
            })}
        </section>
    </section >
}