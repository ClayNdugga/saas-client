import { useDashboard } from "@/contexts/DashboardContext";
import { ApiResponse } from "@/models/api";
import { Message } from "@/models/firebase";
import apiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

const mutateChat = (chatId: string) =>
    apiClient.delete<ApiResponse<{ responseMessage: Message }>>(`/api/chats/${chatId}`);
  
  export const useDeleteChatMuation = () => {
    // Grab setChat from context
    const { setChat, chatId, chats, setChats, refetchChats } = useDashboard();
  
    return useMutation({
      mutationFn: (deletedChatId: string) => mutateChat(deletedChatId),
      onMutate: (deletedChatId: string) => {
        const updatedChats = chats?.filter((chat) => chat.id !== deletedChatId);
        setChats(updatedChats || []);
  
        if (chatId === deletedChatId) {
          setChat(undefined);
        }
      },
      onSuccess: (data) => {
        console.log("Chat deleted successfully");
      },
      onError: (error) => {
        refetchChats();
      },
    });
  };
  