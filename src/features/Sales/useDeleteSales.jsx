import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSales as deleteSalesApi } from "../../services/apiSales";
import toast from "react-hot-toast";

export function useDeleteSale() {
    const queryClient = useQueryClient()

    const { mutate: deleteSale, isLoading: isDeleting } = useMutation({
      mutationFn: deleteSalesApi,
      onSuccess: () => {
        toast.success('Sale Item was Deleted');
        queryClient.invalidateQueries({ queryKey: ['sales'] });
      },
      onError: (err) => {
        toast.err(err.message)
      }
    })

    return { deleteSale, isDeleting }
}

