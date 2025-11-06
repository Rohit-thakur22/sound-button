import { useQuery } from "@tanstack/react-query";
import { adminAPI } from "@/lib/apiServices";

const PAGE_SIZE = 10;

export function useDashboardUsers({
  page = 1,
  search = "",
  enabled = true,
}) {
  // Build query key
  const queryKey = ["dashboard-users", page, search];

  // Build API params
  const apiParams = {
    page,
    limit: PAGE_SIZE,
  };

  if (search && search.trim()) {
    apiParams.search = search.trim();
  }

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await adminAPI.getDashboardUsers(apiParams);
      const responseData = response.data || response;
      const usersData = Array.isArray(responseData)
        ? responseData
        : responseData.data || responseData.users || [];
      const total =
        responseData.total ||
        responseData.totalRecords ||
        responseData.count ||
        usersData.length;

      return {
        users: usersData,
        total,
      };
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

