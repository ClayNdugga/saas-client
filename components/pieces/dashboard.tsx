"use client";

import { AppSidebar } from "@/components/pieces/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";

import { Message } from "@/components/pieces/message";

import { FileUploadArea } from "@/components/pieces/file-upload-area";

import { ChatInput } from "@/components/pieces/chat-input";
import { useDashboard } from "@/contexts/DashboardContext";

import useFile from "@/hooks/useFile";
import { useAuth } from "@/contexts/AuthContext";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { Button } from "@/components/ui/button";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import PDFViewer from "./pdf-viewer";
import { Loader2 } from "lucide-react";

import { Camera, Figma, FileText, FormInput, Calculator } from "lucide-react";

export default function Dashboard() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      defaultTabs[0], // Thumbnails tab
    ],
  });

  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const { chat, isChatting, chats, files, chatId, setChatId, fileId, setFileId } = useDashboard();
  const { data: fileData, isLoading: isLoadingFile } = useFile(fileId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push("/");
  }

  // Recent files data
  const recentFiles = [
    { id: 1, icon: FileText, label: "Read User Guide", color: "text-orange-500" },
    { id: 2, icon: FileText, label: "Project Proposal", color: "text-purple-500" },
    { id: 3, icon: FileText, label: "Meeting Notes", color: "text-red-500" },
    { id: 4, icon: FileText, label: "Invoice Document", color: "text-teal-500" },
    { id: 5, icon: FileText, label: "Research Paper", color: "text-blue-500" },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <div className=" flex flex-col h-screen overflow-hidden">
          <div className="flex flex-1 overflow-hidden">
            {!fileId && (!chatId || isChatting) ? (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <h1 className="text-4xl font-bold pb-10">Chat with any PDF</h1>
                <ChatInput width="50%" />
                <div className="flex flex-wrap gap-2 pt-8">
                  {recentFiles.map(({ id, icon: Icon, label, color }) => (
                    <Button key={id} variant="outline" className="h-9 gap-2 transition-colors hover:bg-muted">
                      <Icon className={`w-4 h-4 ${color}`} />
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <ResizablePanelGroup direction="horizontal" className="border w-full">
                <ResizablePanel className="p-4 overflow-hidden" minSize={30}>
                  {fileId ? (
                    isLoadingFile ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : fileData?.data?.signedUrl ? (
                      <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                        <PDFViewer fileData={fileData} />
                      </div>
                    ) : (
                      <div>Error loading file</div>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FileUploadArea />
                    </div>
                  )}
                </ResizablePanel>
                <ResizableHandle />

                <ResizablePanel className="p-4 overflow-hidden" minSize={30}>
                  {chatId || isChatting ? (
                    <div className="flex flex-col h-full overflow-hidden  ">
                      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                        {chat &&
                          chat.messages.map((message, index) => (
                            <Message
                              key={message.messageId}
                              content={message.content}
                              role={message.role}
                              references={message.references}
                              // isLastMessage={index === chat.messages.length - 1}
                            />
                          ))}
                      </div>
                      <div className="mt-4 px-1 pb-1">
                        <ChatInput />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="flex-1" />
                      <div className="mt-4">
                        <ChatInput />
                      </div>
                    </div>
                  )}
                </ResizablePanel>
              </ResizablePanelGroup>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
