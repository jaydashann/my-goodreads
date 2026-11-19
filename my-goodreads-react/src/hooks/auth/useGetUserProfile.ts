import { useQuery } from "@tanstack/react-query";
import { axiosInstance, publicInstance } from "../../api/api";
import type { User } from "../../types/users";

export default function useGetUserProfile() {
  return useQuery({
    queryKey: ["USER_PROFILE_KEY"],
    retry: 1,
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me");

      return response.data as User;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetSocketId() {
  return useQuery({
    queryKey: ["USER_PROFILE_KEY_SOCKET"],
    retry: 1,
    queryFn: async () => {
      const response = await publicInstance.get("/users/me");

      return response.data as User;
    },
  });
}
