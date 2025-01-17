import { useDashboard } from "@/contexts/DashboardContext";
import { ApiResponse } from "@/models/api";
import { Message } from "@/models/firebase";
import apiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

const mutateChat = (chatId: string, query: string, fileId: string) =>
  apiClient.post<ApiResponse<{ responseMessage: Message }>>(`/api/chats/${chatId}`, { fileId, query });

export const useChatMutation = () => {
  // Grab setChat from context
  const { chat, setChat, chatId } = useDashboard();

  return useMutation({
    mutationFn: (variables: { query: string; fileId: string }) => mutateChat(chatId, variables.query, variables.fileId),
    onMutate: (userMessage) => {
      // Creating new messages for user and system placeholders
      const newMessage: Message = {
        messageId: "client-side-placeholder-user",
        role: "user",
        content: userMessage.query,
        timestamp: new Date().toISOString(),
      };

      const loadingMessage: Message = {
        messageId: "client-side-placeholder-system",
        role: "system",
        content: "Loading...",
        timestamp: new Date().toISOString(),
      };

      // Update the chat state by appending the new messages to existing ones
      setChat((prevChat) => {
        const updatedChat = { ...prevChat };
        updatedChat.messages = [...updatedChat.messages, newMessage, loadingMessage];
        return updatedChat;
      });
    },
    onSuccess: (data) => {
      console.log("Mutation sucess");
      console.log(data);
      console.log(data.data?.responseMessage);
      // Handle successful mutation (replacing loading placeholder with response)
      setChat((prevChat) => {
        const updatedChat = { ...prevChat };
        const updatedMessages = [...updatedChat.messages];

        // Find the loading placeholder and replace it with the actual system message
        const loadingIndex = updatedMessages.findIndex(
          (message) => message.messageId === "client-side-placeholder-system"
        );
        if (loadingIndex !== -1) {
          updatedMessages[loadingIndex] = data.data?.responseMessage;
        }

        updatedChat.messages = updatedMessages;
        return updatedChat;
      });
    },
    onError: (error) => {
      // Handle error (replacing loading placeholder with error message)
      setChat((prevChat) => {
        const updatedChat = { ...prevChat };
        const updatedMessages = [...updatedChat.messages];

        // Replace the loading placeholder with an error message
        const loadingIndex = updatedMessages.findIndex(
          (message) => message.messageId === "client-side-placeholder-system"
        );
        if (loadingIndex !== -1) {
          updatedMessages[loadingIndex] = {
            messageId: "placeholder client ID",
            role: "system",
            content: "Failed to load response. Please try again.",
            timestamp: new Date().toISOString(),
          };
        }

        updatedChat.messages = updatedMessages;
        return updatedChat;
      });
    },
  });
};
