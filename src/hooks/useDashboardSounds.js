import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "@/lib/apiServices";

const PAGE_SIZE = 10;

export function useDashboardSounds({
  page = 1,
  search = "",
  category = "",
  categoryMap = {},
  enabled = true,
}) {
  // Build query key
  const queryKey = ["dashboard-sounds", page, search, category];

  // Build API params
  const apiParams = {
    page,
    limit: PAGE_SIZE,
    sortBy: "",
    sortOrder: "",
  };

  if (search && search.trim()) {
    apiParams.search = search.trim();
  }

  if (category && category.trim()) {
    const categoryId = categoryMap[category];
    if (categoryId) {
      apiParams.categoryIds = categoryId.toString();
    }
  }

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await adminAPI.getDashboardSounds(apiParams);
      const responseData = response.data || response;
      const soundsData = Array.isArray(responseData)
        ? responseData
        : responseData.data || responseData.sounds || [];
      const total =
        responseData.total ||
        responseData.totalRecords ||
        responseData.count ||
        soundsData.length;

      return {
        sounds: soundsData,
        total,
      };
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

