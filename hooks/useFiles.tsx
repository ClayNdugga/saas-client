import { ApiResponse, Descriptor } from "@/models/api";
import apiClient from "@/services/api-client";

import { useQuery } from "@tanstack/react-query";



const useFiles = () =>
  useQuery<ApiResponse<{ files: Descriptor[] }>>({
    queryKey: ["Files"],
    queryFn: async () => {
      return apiClient.get("/files");
    },
  });

export default useFiles;
