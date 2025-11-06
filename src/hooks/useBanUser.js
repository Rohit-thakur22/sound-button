import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/apiServices";
import { toast } from "react-toastify";

export function useBanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const response = await adminAPI.banUser(userId);
      return response.data || response;
    },
    onSuccess: () => {
      // Invalidate users queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["dashboard-users"] });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    },
  });
}

export function useUnbanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const response = await adminAPI.unbanUser(userId);
      return response.data || response;
    },
    onSuccess: () => {
      // Invalidate users queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["dashboard-users"] });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    },
  });
}

