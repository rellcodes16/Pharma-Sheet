import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteNotification as deleteNotificationApi } from "../../services/apiNotification";

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteNotification } = useMutation({
    mutationFn: deleteNotificationApi,
    onSuccess: () => {
      toast.success("Notification successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["notification"]
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteNotification };
}
