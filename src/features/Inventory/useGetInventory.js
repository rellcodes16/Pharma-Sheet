import { useQuery } from "@tanstack/react-query";
import { getInventoryWithoutPagination } from "../../services/apiInventory";

export function useGetInventory(){
   const { isLoading, data: inventory, error} = useQuery({
        queryKey: ['inventory'],
        queryFn: getInventoryWithoutPagination,
    })

    return { isLoading, inventory, error }
}
