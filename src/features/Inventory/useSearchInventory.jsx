import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchInventory as searchInventoryApi } from "../../services/apiInventory";
import toast from "react-hot-toast";

export function useSearchInventory(){
    const queryClient = useQueryClient()

    const { mutate: searchInventory, isLoading: isSearching } = useMutation({
      // mutationFn: ({ medicationName }) => searchInventoryApi(medicationName),
      mutationFn: searchInventoryApi,
      onSuccess: () => {
        toast.success('Search Successful 😁');
        queryClient.invalidateQueries({ queryKey: ['inventory'] });
      },
      onError: (err) => {
        toast.err(err.message)
      }
    })

    return { searchInventory, isSearching }
}





