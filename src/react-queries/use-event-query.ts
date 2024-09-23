import getEventBySlug from "../api/getEventBySlug"
import { useQuery } from "@tanstack/react-query"

const useEventQuery = (slug: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["event"],
        queryFn: () => getEventBySlug(slug)
    })

    return { data, isLoading, error }
}


export default useEventQuery;