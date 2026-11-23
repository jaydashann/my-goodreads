import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../api/api";

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn() {
      await axiosInstance.delete("auth/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER_PROFILE_KEY"] });
      queryClient.resetQueries({ queryKey: ["USER_PROFILE_KEY"] });
    },
  });
}
