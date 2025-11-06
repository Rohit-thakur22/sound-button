import { useQuery } from "@tanstack/react-query";
import { soundsAPI } from "@/lib/apiServices";

/**
 * Custom hook to fetch sounds grouped by category
 * Uses React Query for caching, error handling, and automatic refetching
 */
export function useGroupedSounds({ soundsLimit = 20, enabled = true } = {}) {
  return useQuery({
    queryKey: ["grouped-sounds", soundsLimit],
    queryFn: async () => {
      try {
        const response = await soundsAPI.getSoundsGroupedByCategory({ soundsLimit });
        
        // Log response structure for debugging (remove in production if needed)
        if (process.env.NODE_ENV === 'development') {
          console.log('Grouped sounds API response:', {
            hasData: !!response?.data,
            dataType: typeof response?.data,
            isArray: Array.isArray(response?.data),
            dataKeys: response?.data ? Object.keys(response.data) : [],
          });
        }
        
        // Handle different response structures
        let groupedSounds = [];
        
        if (Array.isArray(response?.data)) {
          groupedSounds = response.data;
        } else if (Array.isArray(response?.data?.data)) {
          groupedSounds = response.data.data;
        } else if (response?.data?.groupedSounds) {
          groupedSounds = response.data.groupedSounds;
        } else if (response?.data && typeof response.data === 'object') {
          // If response.data is an object with category keys
          groupedSounds = Object.entries(response.data).map(([categoryName, sounds]) => ({
            categoryName,
            sounds: Array.isArray(sounds) ? sounds : [],
          }));
        }
        
        // Validate that we have data
        if (!Array.isArray(groupedSounds) || groupedSounds.length === 0) {
          console.warn('No grouped sounds data received:', response);
        }
        
        // Create a map for easy lookup
        const soundsMap = {};
        groupedSounds.forEach(category => {
          if (category?.categoryName && Array.isArray(category?.sounds)) {
            soundsMap[category.categoryName] = category.sounds;
          }
        });

        return {
          groupedSounds,
          soundsMap,
          // Extract sounds for each category
          trendingSounds: soundsMap.trending || [],
          funnySounds: soundsMap.funny_sound_effects || [],
          discordSounds: soundsMap.discord_soundboard || [],
          freeSounds: soundsMap.free_sound_effects || [],
          horrorSounds: soundsMap.horror_sound_effects || [],
          animalSounds: soundsMap.animal_sound_effects || [],
          memeSounds: soundsMap.meme_soundboard || [],
          prankSounds: soundsMap.prank_soundboard || [],
          youtubeSounds: soundsMap.youtube_sound_effects || [],
          royalitySounds: soundsMap.royalty_free_music || [],
        };
      } catch (error) {
        // Enhanced error logging
        console.error("Error fetching grouped sounds:", {
          message: error?.message,
          response: error?.response?.data,
          status: error?.response?.status,
          statusText: error?.response?.statusText,
          config: error?.config?.url,
        });
        
        // Provide more specific error messages
        let errorMessage = "Failed to fetch sounds. Please check your connection and try again.";
        
        if (error?.response) {
          // Server responded with error status
          if (error.response.status === 404) {
            errorMessage = "Sounds endpoint not found. Please contact support.";
          } else if (error.response.status >= 500) {
            errorMessage = "Server error. Please try again later.";
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error?.request) {
          // Request was made but no response received
          errorMessage = "Network error. Please check your internet connection.";
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for 10 minutes
    retry: 2, // Retry failed requests 2 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchOnReconnect: true, // Refetch when network reconnects
  });
}

/**
 * Custom hook to fetch just added sounds
 */
export function useJustAddedSounds({ limit = 40, page = 1, enabled = true } = {}) {
  return useQuery({
    queryKey: ["just-added-sounds", limit, page],
    queryFn: async () => {
      try {
        const response = await soundsAPI.getJustAddedSounds({ limit, page });
        
        // Handle different response structures
        let justAddedSounds = [];
        
        if (Array.isArray(response?.data)) {
          justAddedSounds = response.data;
        } else if (Array.isArray(response?.data?.data)) {
          justAddedSounds = response.data.data;
        } else if (response?.data?.sounds) {
          justAddedSounds = response.data.sounds;
        }
        
        return justAddedSounds;
      } catch (error) {
        // Enhanced error logging
        console.error("Error fetching just added sounds:", {
          message: error?.message,
          response: error?.response?.data,
          status: error?.response?.status,
          statusText: error?.response?.statusText,
          config: error?.config?.url,
        });
        
        // Provide more specific error messages
        let errorMessage = "Failed to fetch just added sounds. Please check your connection and try again.";
        
        if (error?.response) {
          if (error.response.status === 404) {
            errorMessage = "Just added sounds endpoint not found. Please contact support.";
          } else if (error.response.status >= 500) {
            errorMessage = "Server error. Please try again later.";
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error?.request) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
      }
    },
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes - just added sounds should be fresher
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}

