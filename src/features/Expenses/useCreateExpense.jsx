import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense as createExpenseApi} from "../../services/apiExpense";
import toast from "react-hot-toast";

export function useCreateExpense(){
    const queryClient = useQueryClient()

    const { mutate: createExpense, isLoading: isCreating } = useMutation({
      mutationFn: createExpenseApi,
      onSuccess: () => {
        toast.success('New Expense Item Created');
        queryClient.invalidateQueries({ queryKey: ['expense'] });
      },
      onError: (err) => {
        toast.err(err.message)
      }
    })

    return { createExpense, isCreating }
}