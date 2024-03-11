import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventory as createInventoryApi } from "../../services/apiInventory";
import toast from "react-hot-toast";

export function useCreateInventory(){
    const queryClient = useQueryClient()

    const { mutate: createInventory, isLoading: isCreating } = useMutation({
      mutationFn: createInventoryApi,
      onSuccess: () => {
        toast.success('New Inventory Item Created');
        queryClient.invalidateQueries({ queryKey: ['inventory'] });
      },
      onError: (err) => {
        toast.err(err.message)
      }
    })

    return { createInventory, isCreating }
}
