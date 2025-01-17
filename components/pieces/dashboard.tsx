"use client";

import { AppSidebar } from "@/components/pieces/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { Message } from "@/components/pieces/message";

import { FileUploadArea } from "@/components/pieces/file-upload-area";

import apiClient from "../../services/api-client";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/pieces/chat-input";
import { useDashboard } from "@/contexts/DashboardContext";

import useFile from "@/hooks/useFile";
import { useAuth } from "@/contexts/AuthContext";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { highlightPlugin, RenderHighlightTargetProps } from "@react-pdf-viewer/highlight";
import PDFViewer from "./pdf-viewer";
import { DevPopover } from "./dev-popover";

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

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className=" flex flex-col h-screen overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Main</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <DevPopover />
          </header>

          <div className="flex flex-1 p-4 overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="overflow-auto rounded-lg border w-full">
              <ResizablePanel className="p-4" minSize={30}>
                {fileId ? (
                  isLoadingFile ? (
                    <div>Loading file...</div>
                  ) : fileData?.data.signedUrl ? (
                    <div className="scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                      <PDFViewer fileData={fileData} />
                    </div>
                  ) : (
                    <div>Error loading file</div>
                  )
                ) : (
                  <FileUploadArea />
                )}
              </ResizablePanel>
              <ResizableHandle />

              <ResizablePanel className="p-4" minSize={30}>
                {chatId || isChatting ? (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                      {chat &&
                        chat.messages.map((message, index) => (
                          <Message
                            key={message.messageId}
                            content={message.content}
                            role={message.role}
                            isLastMessage={index === chat.messages.length - 1}
                          />
                        ))}
                    </div>
                    <div className="mt-4">
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
