import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getInventoryItemUnit } from "../../services/apiInventory";

export function useRefillInventory() {
  const queryClient = useQueryClient();

  const { isLoading: isRefilling, mutate: refill } = useMutation({
    mutationFn: getInventoryItemUnit,
    onSuccess: () => {
      toast.success("Notification successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["inventory"]
      });
    },
    onError: (err) =>{ 
      console.error(err.message)
      toast.error(err.message)
    }
  });

  return { isRefilling, refill };
}
