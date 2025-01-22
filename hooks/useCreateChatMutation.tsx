import { useDashboard } from "@/contexts/DashboardContext";
import { ApiResponse } from "@/models/api";
import { FirebaseChat, Message, Citation } from "@/models/firebase";
import apiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

const mutateChat = (query: string, fileId: string) =>
  apiClient.post<ApiResponse<{ responseMessage: Message; chatId: string; references: Citation[] }>>("/api/chats", {
    query,
    fileId,
  });

const useCreateChatMutation = () => {
  const { setChat, setChatId, refetchChats, setIsChatting } = useDashboard();

  return useMutation({
    mutationFn: (variables: { query: string; fileId: string }) => mutateChat(variables.query, variables.fileId),
    onMutate: (userMessage) => {
      setIsChatting(true);
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
      setChat({
        chatId: "",
        userId: "",
        createdAt: "",
        updatedAt: "",
        messages: [newMessage, loadingMessage],
      } as FirebaseChat);
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

      setChatId(data.data?.chatId);
      setIsChatting(false);
      refetchChats();
    },
    onError: (error) => {},
  });
};

export default useCreateChatMutation;
