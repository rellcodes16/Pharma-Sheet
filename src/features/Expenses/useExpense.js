import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/helpers";
import { getExpense } from "../../services/apiExpense";

export function useExpense(){
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

    const { isLoading, data: {data: expense, count } = {}, error} = useQuery({
        queryKey: ['expense', page],
        queryFn: () => getExpense({ page }),
    })

    const pageCount = Math.ceil(count / PAGE_SIZE)

    if(page < pageCount){
        queryClient.prefetchQuery({
            queryKey: ['expense', page + 1],
            queryFn: () => getExpense({ page: page + 1 }),
        })
    }

    if(page > 1){
        queryClient.prefetchQuery({
            queryKey: ['expense', page - 1],
            queryFn: () => getExpense({ page: page - 1 }),
        })
    }

    return { isLoading, expense, error, count }
}