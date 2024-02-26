import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateInventory as updateInventoryApi } from "../../services/apiInventory";

export function useUpdateInventory(){
    const queryClient = useQueryClient();

  const { mutate: updateInventory, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newInventoryData, id }) => updateInventoryApi(newInventoryData, id),
    onSuccess: () => {
      toast.success('Inventory Item Successfully Updated');
      queryClient.invalidateQueries({ queryKey: ['inventory']});
    },
    onError: (err) => toast.error(err.message)
  })

  return { isUpdating, updateInventory }
}