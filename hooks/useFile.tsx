import { ApiResponse } from "@/models/api";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";




const useFile = (fileName: string) =>
  useQuery<ApiResponse<{signedUrl: string}>>({
    queryKey: ["Files", fileName],
    queryFn: async () => {    
      return apiClient.get(`/api/files/${fileName}`);
    },
    enabled: !!fileName,
    staleTime: 1000 * 60 * 10, 
  });


export default useFile;
