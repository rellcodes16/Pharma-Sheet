import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSales } from "../../services/apiSales";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/helpers";

export function useSales(){
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    const { isLoading, data: {data: sales, count} = {}, error} = useQuery({
        queryKey: ['sales', page],
        queryFn: () => getSales({ page }),
    })

    const pageCount = Math.ceil(count / PAGE_SIZE)

    if(page < pageCount){
        queryClient.prefetchQuery({
            queryKey: ['sales', page + 1],
            queryFn: () => getSales({ page: page + 1 }),
        })
    }
    if(page > 1){
        queryClient.prefetchQuery({
            queryKey: ['sales', page - 1],
            queryFn: () => getSales({ page: page - 1 }),
        })
    }

    return { isLoading, sales, error, count }
}

