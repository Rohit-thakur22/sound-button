import { useQuery } from "@tanstack/react-query";
import { categoriesAPI } from "@/lib/apiServices";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoriesAPI.getAllCategories();
      const categoriesData = response.data || [];
      
      // Transform API response to expected format: {id, name} -> {value, label}
      const cats = categoriesData.map(cat => ({
        value: cat.name || cat.id,
        label: cat.name ? cat.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : `Category ${cat.id}`
      }));
      
      // Create a map of category name to ID for API calls
      const map = {};
      categoriesData.forEach(cat => {
        if (cat.name) {
          map[cat.name] = cat.id;
        }
      });
      
      return {
        categories: cats,
        categoryMap: map,
        rawCategories: categoriesData,
      };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer
  });
}

