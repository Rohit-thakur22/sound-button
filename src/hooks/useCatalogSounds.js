import { useInfiniteQuery } from "@tanstack/react-query";
import { soundsAPI } from "@/lib/apiServices";
import { transformSoundsArray } from "@/lib/dataTransformers";

/**
 * Custom hook to fetch catalog sounds with load more functionality
 * Uses React Query's useInfiniteQuery for better caching and pagination
 * Note: This implementation uses increasing limits (40, 60, 80...) instead of page numbers
 */
export function useCatalogSounds({ 
  catValue, 
  initialLimit = 40,
  incrementBy = 20,
  enabled = true 
} = {}) {
  return useInfiniteQuery({
    queryKey: ["catalog-sounds", catValue, initialLimit],
    queryFn: async ({ pageParam = initialLimit }) => {
      let response;
      
      if (catValue === "just_added") {
        const result = await soundsAPI.getJustAddedSounds({
          page: 1,
          limit: pageParam
        });
        response = result?.data;
      } else {
        const result = await soundsAPI.getSoundsByCategory(catValue, {
          search: "",
          page: 1,
          limit: pageParam
        });
        response = result?.data?.data;
      }
      
      const sounds = transformSoundsArray(response?.data || response || []);
      const totalCount = response?.total || response?.data?.total || 0;
      
      return {
        sounds,
        totalCount,
        limit: pageParam,
        hasMore: totalCount > 0 ? sounds.length < totalCount : sounds.length === pageParam
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
    enabled: enabled && !!catValue,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

