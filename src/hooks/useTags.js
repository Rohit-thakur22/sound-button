import { useQuery } from "@tanstack/react-query";
import { tagsAPI } from "@/lib/apiServices";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await tagsAPI.getAllTags();
      const tagsData = response.data || [];
      
      // Transform API response to expected format: {id, name} -> {value, label}
      const tags = tagsData.map(tag => ({
        value: tag.id || tag._id,
        label: tag.name || tag.label,
        id: tag.id || tag._id,
      }));
      
      return {
        tags: tags,
        rawTags: tagsData,
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - tags don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer
  });
}

