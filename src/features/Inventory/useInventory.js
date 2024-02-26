import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInventory } from "../../services/apiInventory";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/helpers";

export function useInventory(){
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    const { isLoading, data: {data: inventory, count } = {}, error} = useQuery({
        queryKey: ['inventory', page],
        queryFn: () => getInventory({ page }),
    })

    const pageCount = Math.ceil(count / PAGE_SIZE)

    if(page < pageCount){
        queryClient.prefetchQuery({
            queryKey: ['inventory', page + 1],
            queryFn: () => getInventory({ page: page + 1 }),
        })
    }

    if(page > 1){
        queryClient.prefetchQuery({
            queryKey: ['inventory', page - 1],
            queryFn: () => getInventory({ page: page - 1 }),
        })
    }

    return { isLoading, inventory, error, count }
}