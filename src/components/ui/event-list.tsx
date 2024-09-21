import EventCard from "@/components/ui/event-card"
export const EventList = ({events}: {
    events?: any
}) => {

    return (
       <>
            {
                events ? events.map((event: any) => (
                    <EventCard event={event} />
                )) : <div>No Events Found</div>
            }
       </>
    )
}