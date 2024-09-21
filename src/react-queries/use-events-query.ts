import getEvents from "../api/getEvents"
import { useQuery } from "@tanstack/react-query"

const useEventsQuery = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["events"],
        queryFn: getEvents
    })

    return {data, isLoading, error}
}

export default useEventsQuery;