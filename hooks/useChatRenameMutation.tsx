import { useDashboard } from "@/contexts/DashboardContext";
import { ApiResponse } from "@/models/api";
import { Message } from "@/models/firebase";
import apiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

const mutateChat = (chatId: string, newName: string) =>
  apiClient.patch<ApiResponse<{}>>(`/chats/${chatId}`, { newName: newName });

export const useRenameChatMuation = () => {
  const { chats, setChats, refetchChats } = useDashboard();

  return useMutation({
    mutationFn: (variables: { chatId: string; newName: string }) => mutateChat(variables.chatId, variables.newName),

    onMutate: (variables) => {
      const { chatId, newName } = variables;

      const renamedChats = chats?.map((chatDescriptor) =>
        chatDescriptor.id === chatId ? { ...chatDescriptor, name: newName } : chatDescriptor
      );
      setChats(renamedChats || []);
    },
    onSuccess: (data) => {
      console.log("Chat renamed successfully");
    },
    onError: (error) => {
      console.log(error);
      refetchChats();
    },
  });
};
