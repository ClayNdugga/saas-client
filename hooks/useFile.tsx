import { ApiResponse } from "@/models/api";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

interface FileResponse {
  signedUrl: string;
}

const useFile = (fileName: string) =>
  useQuery<ApiResponse<FileResponse>>({
    queryKey: ["Files", fileName],
    queryFn: async () => {
      return apiClient.get(`/api/files/${fileName}`);
    },
    enabled: !!fileName,
  });

export default useFile;
