import useChat from '@/hooks/useChat';
import useChats from '@/hooks/useChats';
import useFiles from '@/hooks/useFiles';
import useUser from '@/hooks/useUser';
import { ApiResponse } from '@/models/api';
import { FirebaseChat, FirebaseDBUser } from '@/models/firebase';
import React, { createContext, useContext, useEffect, useState } from 'react';


// Define the shape of your context
interface DashboardContextType {
  user: ApiResponse<{ userData: FirebaseDBUser}> | undefined
  loadingUser: boolean
  chat: FirebaseChat| undefined
  setChat: React.Dispatch<React.SetStateAction<FirebaseChat | undefined>>;
  refetchChats: () => Promise<ApiResponse<{ chats: string[] }>>
  refetchFiles: () => Promise<ApiResponse<{ files: string[] }>>
  // chat: ApiResponse<{ chat: FirebaseChat}> | undefined
  chats: ApiResponse<{ chats: string[] }> | undefined;
  files: ApiResponse<{ files: string[] }> | undefined;
  chatId: string;
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  isChatting: boolean;
  setIsChatting: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
  setFileId: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [chatId, setChatId] = useState<string>('');
  const [fileId, setFileId] = useState<string>('');
  const [isChatting, setIsChatting] = useState(false);

  // const []


  const { data: user, isLoading: loadingUser, error: errorUser } = useUser();
  const { data: chats, isLoading: loadingChats, error: errorChats, refetch: refetchChats } = useChats();
  const { data: files, isLoading: loadingFiles, error: errorFiles, refetch: refetchFiles } = useFiles();
  // const 
  const { data: initialChat, isLoading: loadingChat, error: errorChat } = useChat(chatId);
  
  useEffect(() => {
    if (initialChat?.data?.chat) {
      setChat(initialChat.data.chat); 
    }
  }, [initialChat]);


  const [chat, setChat] = useState<FirebaseChat | undefined>(initialChat?.data?.chat)

  // console.log("Files")
  // console.log(files)
  // console.log(typeof files)
  // console.log(chat)


  return (
    <DashboardContext.Provider value={{ user, loadingUser, chat, setChat, chats, isChatting, setIsChatting, refetchChats, files, refetchFiles, chatId, setChatId, fileId, setFileId }}>
      {children}
    </DashboardContext.Provider>
  );

};

// Custom hook to use the context
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
