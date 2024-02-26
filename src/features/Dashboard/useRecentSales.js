import { useSearchParams } from "react-router-dom";
import { subDays } from 'date-fns'
import { useQuery } from "@tanstack/react-query";
import { getSalesAfterDate } from "../../services/apiSales";

export function useRecentSales(){
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get('duration') ? 7 : Number(searchParams.get('duration'))

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: sales } = useQuery({
        queryFn: () => getSalesAfterDate(queryDate),
        queryKey: ['history', `duration-${numDays}`]
    })

    return { isLoading, sales, numDays }
}


