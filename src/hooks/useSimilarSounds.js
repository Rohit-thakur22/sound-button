import { useInfiniteQuery } from "@tanstack/react-query";
import { soundsAPI } from "@/lib/apiServices";
import { transformSoundsArray } from "@/lib/dataTransformers";

/**
 * Custom hook to fetch similar sounds with load more functionality
 * Uses React Query's useInfiniteQuery for better caching and pagination
 * Handles both category-based and name-based search
 */
export function useSimilarSounds({ 
  soundObj, 
  initialLimit = 40,
  incrementBy = 20,
  enabled = true 
} = {}) {
  return useInfiniteQuery({
    queryKey: ["similar-sounds", soundObj?.id, soundObj?.categories?.[0]?.name, soundObj?.name, initialLimit],
    queryFn: async ({ pageParam = initialLimit }) => {
      let response;
      
      // Try category first if available
      if (soundObj?.categories && soundObj.categories.length > 0) {
        try {
          const categoryName = soundObj.categories[0].name;
          const result = await soundsAPI.getSoundsByCategory(categoryName, {
            search: "",
            page: 1,
            limit: pageParam
          });
          response = result?.data;
        } catch (error) {
          console.error('Error loading similar sounds by category:', error);
          // Fallback to search by name if category fetch fails
          if (soundObj.name) {
            const result = await soundsAPI.getAllSounds({ 
              search: soundObj.name, 
              page: 1, 
              limit: pageParam 
            });
            response = result?.data;
          }
        }
      } else if (soundObj?.name) {
        // Fallback to search by name if no categories
        const result = await soundsAPI.getAllSounds({ 
          search: soundObj.name, 
          page: 1, 
          limit: pageParam 
        });
        response = result?.data;
      }
      
      const sounds = transformSoundsArray(response?.data || response || []);
      const totalCount = response?.total || response?.data?.total || 0;
      
      // Filter out the current sound from similar sounds
      const filteredSounds = sounds.filter(sound => sound.id !== soundObj?.id);
      
      return {
        sounds: filteredSounds,
        totalCount,
        limit: pageParam,
        hasMore: totalCount > 0 ? filteredSounds.length < totalCount : filteredSounds.length === pageParam
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      // If we have more data, increase limit by incrementBy
      if (lastPage.hasMore && lastPage.sounds.length > 0) {
        const nextLimit = lastPage.limit + incrementBy;
        // Check if we've reached the total count
        if (lastPage.totalCount > 0 && nextLimit > lastPage.totalCount) {
          return lastPage.totalCount; // Use total count as final limit
        }
        return nextLimit;
      }
      return undefined;
    },
    initialPageParam: initialLimit,
    enabled: enabled && !!soundObj,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}




