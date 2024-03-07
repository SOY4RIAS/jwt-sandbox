import { useMutation } from "@tanstack/react-query";
import { useApiService } from "./useApiService";

export const useSendRequest = (callback: (data: any) => void) => {
  const { apiService } = useApiService();

  return useMutation({
    mutationFn: (data: any) => apiService.sendRequest(data),
    onSuccess: (data) => {
      callback(data);
    },
  });
};
