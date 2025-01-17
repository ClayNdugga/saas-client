import { ApiResponse } from "@/models/api";
import apiClient from "@/services/api-client";

import { useQuery } from "@tanstack/react-query";

const useFiles = () =>
  useQuery<ApiResponse<{ files: string[] }>>({
    queryKey: ["Files"],
    queryFn: async () => {
      return apiClient.get("/api/files");
    },
  });

export default useFiles;
