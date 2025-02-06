import { ApiResponse } from "@/models/api";
import { FirebaseChat } from "@/models/firebase";
import apiClient from "@/services/api-client";

import { useQuery } from "@tanstack/react-query";

const useChat = (chatId: string) =>
  useQuery<ApiResponse<{ chat: FirebaseChat }>>({
    queryKey: ["Chats", chatId],
    queryFn: async () => {
      // apiClient.initializeTokenFromSession(); 
      return apiClient.get(`/chats/${chatId}`);
    },
  });

export default useChat;
