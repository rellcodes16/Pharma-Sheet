import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteExpense as deleteExpenseApi } from "../../services/apiExpense";

export function useDeleteExpense() {
    const queryClient = useQueryClient()

    const { mutate: deleteExpense, isLoading: isDeleting } = useMutation({
      mutationFn: deleteExpenseApi,
      onSuccess: () => {
        toast.success('Expense Item was Deleted');
        queryClient.invalidateQueries({ queryKey: ['expense'] });
      },
      onError: (err) => {
        toast.err(err.message)
      }
    })

    return { deleteExpense, isDeleting }
}

