import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/lib/apiServices";
import { toast } from "react-toastify";

export function useBulkUploadSounds() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ files, categoryIds }) => {
      // Create FormData for multipart/form-data
      const formData = new FormData();
      
      // Append files (API expects array of files)
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
      
      // Append categoryIds as comma-separated string
      if (categoryIds && categoryIds.length > 0) {
        formData.append('categoryIds', categoryIds.join(','));
      }
      
      const response = await adminAPI.bulkUploadSounds(formData);
      return response.data || response;
    },
    onSuccess: () => {
      // Invalidate sounds queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["dashboard-sounds"] });
      toast.success("Sounds uploaded successfully");
    },
    onError: (error) => {
      console.error("Error uploading sounds:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to upload sounds";
      toast.error(errorMessage);
      throw error;
    },
  });
}

