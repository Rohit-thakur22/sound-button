import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/apiServices";
import { toast } from "react-toastify";

export function useEditSound() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ soundId, soundData }) => {
      const response = await adminAPI.editSound(soundId, soundData);
      return response.data || response;
    },
    onSuccess: () => {
      // Invalidate sounds queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["dashboard-sounds"] });
      toast.success("Sound updated successfully");
    },
    onError: (error) => {
      console.error("Error updating sound:", error);
      toast.error("Failed to update sound");
    },
  });
}

