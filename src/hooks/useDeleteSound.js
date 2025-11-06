import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/apiServices";
import { toast } from "react-toastify";

export function useDeleteSound() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (soundId) => {
      const response = await adminAPI.deleteSound(soundId);
      return response.data || response;
    },
    onSuccess: () => {
      // Invalidate sounds queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["dashboard-sounds"] });
      toast.success("Sound deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting sound:", error);
      toast.error("Failed to delete sound");
    },
  });
}

