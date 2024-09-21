import useEventsQuery from "../../react-queries/use-events-query"
import { EventList } from "./event-list"

export default function UpcomingEvents(){
    const { data, isLoading, error } = useEventsQuery()


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Something went wrong: {error.message}</div>
    }

    if(!data){
        return <div>No Upcoming events</div>
    }

    return (
        <><EventList events={data}/></>
    )
}