import { useMutation, useQueryClient } from "@tanstack/react-query";
import { soundsAPI } from "@/lib/apiServices";
import { toast } from "react-toastify";

/**
 * Custom hook to toggle favorite status of a sound
 * Uses React Query's useMutation for better error handling and cache invalidation
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (soundId) => {
      const response = await soundsAPI.toggleFavorite(soundId);
      return response.data || response;
    },
    onSuccess: (data, soundId) => {
      // Invalidate favorite sounds query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["favorite-sounds"] });
      
      // Show appropriate message based on the action
      if (data && data.success) {
        if (data.action === 'added') {
          toast.success('Added to favourites');
        } else if (data.action === 'removed') {
          toast.success('Removed from favourites');
        }
      } else {
        toast.error(data?.message || 'Failed to update favorites');
      }
    },
    onError: (error) => {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    },
  });
}




