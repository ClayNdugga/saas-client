import useChat from "@/hooks/useChat";
import useChats from "@/hooks/useChats";
import useFiles from "@/hooks/useFiles";
import useUser from "@/hooks/useUser";
import { ApiResponse, Descriptor } from "@/models/api";
import { FirebaseChat, FirebaseDBUser, Citation } from "@/models/firebase";
import { RefetchOptions } from "@tanstack/react-query";
import { QueryObserverResult } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of your context
interface DashboardContextType {
  user: ApiResponse<{ userData: FirebaseDBUser }> | undefined;
  loadingUser: boolean;
  chat: FirebaseChat | undefined;
  setChat: React.Dispatch<React.SetStateAction<FirebaseChat | undefined>>;
  refetchChats: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      ApiResponse<{
        chats: Descriptor[];
      }>,
      Error
    >
  >;
  refetchFiles: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      ApiResponse<{
        files: Descriptor[];
      }>,
      Error
    >
  >;
  // chat: ApiResponse<{ chat: FirebaseChat}> | undefined
  chats: Descriptor[] | undefined;
  // chats: ApiResponse<{ chats: Descriptor[] }> | undefined;

  refetchChat: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      ApiResponse<{
        chat: FirebaseChat;
      }>,
      Error
    >
  >;

  setChats: React.Dispatch<React.SetStateAction<Descriptor[]>>;
  setFiles: React.Dispatch<React.SetStateAction<Descriptor[]>>;
  files: Descriptor[] | undefined;
  // files: ApiResponse<{ files: Descriptor[] }> | undefined;
  chatId: string;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  isChatting: boolean;
  setIsChatting: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
  setFileId: React.Dispatch<React.SetStateAction<string>>;
  reference: Citation | null;
  setReference: React.Dispatch<React.SetStateAction<Citation | null>>;

  isPdfLoaded: boolean;
  setIsPdfLoaded: React.Dispatch<React.SetStateAction<boolean>>;

  activeFiles: Descriptor[];
  setActiveFiles: React.Dispatch<React.SetStateAction<Descriptor[]>>;

  highlightFiles: boolean;
  setHighlightFiles: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);



// Provider component
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatId, setChatId] = useState<string>("");
  const [fileId, setFileId] = useState<string>("");
  const [isChatting, setIsChatting] = useState(false);

  const [isPdfLoaded, setIsPdfLoaded] = useState(false);

  const [reference, setReference] = useState<Citation | null>(null);

  const { data: user, isLoading: loadingUser, error: errorUser } = useUser();
  const { data: chatsData, isLoading: loadingChats, error: errorChats, refetch: refetchChats } = useChats();
  const { data: filesData, isLoading: loadingFiles, error: errorFiles, refetch: refetchFiles } = useFiles();

  const { data: initialChat, isLoading: loadingChat, error: errorChat, refetch: refetchChat } = useChat(chatId);

  const [activeFiles, setActiveFiles] = useState<Descriptor[]>([]);

  const [chats, setChats] = useState(chatsData?.data?.chats || []);
  const [files, setFiles] = useState(filesData?.data?.files || []);

  const [highlightFiles, setHighlightFiles] = useState(false);

  useEffect(() => {
    if (filesData?.data?.files) {
      setFiles(filesData.data.files);
    }
  }, [filesData]);

  useEffect(() => {
    if (chatsData?.data?.chats) {
      setChats(chatsData.data.chats);
    }
  }, [chatsData]);

  useEffect(() => {
    if (initialChat?.data?.chat) {
      setChat(initialChat.data.chat);
    }
  }, [initialChat]);

  const [chat, setChat] = useState<FirebaseChat | undefined>(initialChat?.data?.chat);

  return (
    <DashboardContext.Provider
      value={{
        user,
        loadingUser,
        chat,
        setChat,
        chats,
        setChats,
        isChatting,
        setIsChatting,
        refetchChats,
        files,
        setFiles,
        refetchFiles,
        chatId,
        setChatId,
        fileId,
        setFileId,
        reference,
        setReference,
        isPdfLoaded,
        setIsPdfLoaded,
        activeFiles,
        setActiveFiles,
        highlightFiles,
        setHighlightFiles,
        refetchChat
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
