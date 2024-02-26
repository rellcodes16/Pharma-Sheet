import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateExpense as updateExpenseApi } from "../../services/apiExpense";

export function useUpdateExpense(){
    const queryClient = useQueryClient();

  const { mutate: updateExpense, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newExpenseData, id }) => updateExpenseApi(newExpenseData, id),
    onSuccess: () => {
      toast.success('Expense Item Successfully Updated');
      queryClient.invalidateQueries({ queryKey: ['expense']});
    },
    onError: (err) => toast.error(err.message)
  })

  return { isUpdating, updateExpense }
}