import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHistory } from "../../services/apiHistory";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/helpers";

export function useHistory(){
    // const [searchParams] = useSearchParams()
    // const queryClient = useQueryClient()

    // const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    const { isLoading, data: history, error} = useQuery({
        queryKey: ['history'],
        queryFn: getHistory,
    })

    // const pageCount = Math.ceil(count / PAGE_SIZE)

    // if(page < pageCount){
    //     queryClient.prefetchQuery({
    //         queryKey: ['sales', page + 1],
    //         queryFn: () => getHistory({ page: page + 1 }),
    //     })
    // }
    // if(page > 1){
    //     queryClient.prefetchQuery({
    //         queryKey: ['sales', page - 1],
    //         queryFn: () => getHistory({ page: page - 1 }),
    //     })
    // }

    return { isLoading, history, error }
}

