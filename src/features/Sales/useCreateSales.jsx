import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSales as createSalesApi } from "../../services/apiSales";
import toast from "react-hot-toast";

export function useCreateSales(){
    const queryClient = useQueryClient()

    const { mutate: createSale, isLoading: isCreating } = useMutation({
      mutationFn: createSalesApi,
      onSuccess: () => {
        toast.success('New Sale Item Created');
        queryClient.invalidateQueries({ queryKey: ['sales'] });
      },
      onError: (err) => {
        toast.err(err.message)
      }
    })

    return { createSale, isCreating }
}

// setValue('medName', medName)