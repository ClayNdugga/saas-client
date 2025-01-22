import { ApiResponse, Descriptor } from "@/models/api";
import apiClient from "@/services/api-client";

import { useQuery } from "@tanstack/react-query";

const useChats = () =>
  useQuery<ApiResponse<{ chats: Descriptor[] }>>({
    queryKey: ["Chats"],
    queryFn: async () => {
      return apiClient.get("/api/chats");
    },
  });

export default useChats;
