import { useQuery } from "@tanstack/react-query";
import { getAllFavouriteSounds } from "@/database/getAllFavouriteSounds";

/**
 * Custom hook to fetch favorite sounds from local database
 * Uses React Query for caching and automatic refetching
 */
export function useFavoriteSounds({ enabled = true } = {}) {
  return useQuery({
    queryKey: ["favorite-sounds"],
    queryFn: async () => {
      const result = await getAllFavouriteSounds();
      return result;
    },
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes (favorites can change more frequently)
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}




