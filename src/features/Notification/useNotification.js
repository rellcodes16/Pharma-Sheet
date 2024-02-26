import { useQuery } from "@tanstack/react-query";
import { getNotification } from "../../services/apiNotification";

export function useNotification() {
  const { isLoading, data: notification, error } = useQuery({
    queryKey: ["notification"],
    queryFn: getNotification,
  });

  return { isLoading, error, notification };
}
