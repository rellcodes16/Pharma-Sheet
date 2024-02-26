import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInventory as deleteInventoryApi } from "../../services/apiInventory";
import toast from "react-hot-toast";

export function useDeleteInventory() {
    const queryClient = useQueryClient()

    const { mutate: deleteInventoryItem, isLoading: isDeleting } = useMutation({
      mutationFn: deleteInventoryApi,
      onSuccess: () => {
        toast.success('Inventory Item was Deleted');
        queryClient.invalidateQueries({ queryKey: ['inventory'] });
      },
      onError: (err) => {
        toast.err(err.message)
      }
    })

    return { deleteInventoryItem, isDeleting }
}

