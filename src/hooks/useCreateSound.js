import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/apiServices";
import { toast } from "react-toastify";

export function useCreateSound() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, name, description, color, categoryIds, tagIds }) => {
      // Create FormData for multipart/form-data
      const formData = new FormData();
      
      // Add the audio file
      if (file) {
        formData.append('file', file);
      }
      
      // Add other fields
      formData.append('name', name);
      formData.append('description', description || '');
      formData.append('color', color || '#4285F4');
      
      // Add categoryIds as comma-separated string
      if (categoryIds && categoryIds.length > 0) {
        formData.append('categoryIds', categoryIds.join(','));
      }
      
      // Add tagIds as comma-separated string
      if (tagIds && tagIds.length > 0) {
        formData.append('tagIds', tagIds.join(','));
      }
      
      // Use admin API endpoint which automatically includes admin authorization token
      const response = await adminAPI.createSound(formData);
      return response.data || response;
    },
    onSuccess: () => {
      // Invalidate sounds queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["dashboard-sounds"] });
      toast.success("Sound created successfully");
    },
    onError: (error) => {
      console.error("Error creating sound:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to create sound";
      toast.error(errorMessage);
      throw error;
    },
  });
}

