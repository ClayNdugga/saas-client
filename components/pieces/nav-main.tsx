"use client";

import { MessageSquareText, File, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useDashboard } from "@/contexts/DashboardContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FileUploadArea } from "./file-upload-area";
import { useDeleteChatMuation } from "@/hooks/useChatDeleteMutation";
import { useDeleteFileMuation } from "@/hooks/useFileDeleteMutation";
import { Descriptor } from "@/models/api";
import { useState } from "react";
import { useRenameFileMuation } from "@/hooks/useFileRenameMutation";
import { useRenameChatMuation } from "@/hooks/useChatRenameMutation";

export function NavMain() {
  const {
    chats,
    files,
    chatId,
    setChatId,
    fileId,
    setFileId,
    setReference,
    setIsPdfLoaded,
    activeFiles,
    setActiveFiles,
    highlightFiles,
  } = useDashboard();
  const { isMobile, open } = useSidebar();

  // const { mutate: deleteChat } = useChatDeleteMutation();
  const deleteChatMutation = useDeleteChatMuation();
  const deleteFileMutation = useDeleteFileMuation();

  const renameFileMutation = useRenameFileMuation();
  const renameChatMutation = useRenameChatMuation();

  // async function deleteChat(deleteChatId: string) {
  //   await apiClient.delete(`/api/chats/${deleteChatId}`);
  // }

  const [renamingFileId, setRenamingFileId] = useState<string>(""); // Tracks the file being renamed
  const [renameFileValue, setRenameFileValue] = useState<string>(""); // Tracks the input value for renaming

  const [renamingChatId, setRenamingChatId] = useState<string>("");
  const [renameChatValue, setRenameChatValue] = useState<string>("");

  const handleRenameFile = (fileId: string, newName: string) => {
    if (newName.trim() === "") {
      // Prevent renaming to an empty string
      console.error("File name cannot be empty");
      setRenamingFileId("");
      return;
    }
    renameFileMutation.mutate({ fileId, newName });
  };

  const handleRenameChat = (chatId: string, newName: string) => {
    if (newName.trim() === "") {
      console.error("Chat name cannot be empty");
      setRenamingChatId("");
      return;
    }
    renameChatMutation.mutate({ chatId, newName });
  };

  function handleFileClick(file: Descriptor) {
    setIsPdfLoaded(false);
    setFileId(file.id);
    setReference(null);
  }

  function handleNewChat() {
    setChatId("");
    setActiveFiles([]);
    setFileId("");
  }

  return (
    <SidebarGroup className="flex flex-col h-full">
      <div className="flex flex-col h-2/5">
        {chats && chats.length > 0 && (
          <Button variant="outline" className="w-full" onClick={handleNewChat}>
            {open ? "New Chat" : <Plus className="w-4 h-4" />}
          </Button>
        )}
        <SidebarGroupLabel>Chats</SidebarGroupLabel>

        <SidebarMenu>
          {chats && chats.length > 0 ? (
            <>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.name} onClick={() => setChatId(chat.id)}>
                  <SidebarMenuButton asChild>
                    <div className="flex flex-row">
                      <MessageSquareText />
                      {renamingChatId === chat.id ? (
                        // Render input when renaming
                        <input
                          type="text"
                          value={renameChatValue}
                          onChange={(e) => setRenameChatValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleRenameChat(chat.id, renameChatValue);
                              console.log(`renaming chat: ${chat.id} to ${renameChatValue}`);
                              setRenamingChatId("");
                            }
                          }}
                          // onBlur={() => console.log(`renaming chat: ${chat.id} to ${renamechatValue}`)}
                          onBlur={() => handleRenameChat(chat.id, renameChatValue)}
                          className="bg-transparent border-b border-muted-foreground outline-none focus:border-primary"
                          autoFocus
                        />
                      ) : (
                        // Render chat name normally
                        <span>{chat.name}</span>
                      )}{" "}
                    </div>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg pointer-events-auto"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenamingChatId(chat.id);
                          setRenameChatValue(chat.name);
                        }}
                      >
                        <Pencil className="text-muted-foreground" />
                        <span>Rename Chat</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChatMutation.mutate(chat.id);
                          console.log("Delete Chat");
                        }}
                      >
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Chat</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontal className="text-sidebar-foreground/70" onClick={() => console.log(chats)} />
                  <span>All Chats</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70" onClick={handleNewChat}>
                <Plus className="text-sidebar-foreground/70" />
                <span>New chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </div>
      <div className="flex flex-col">
        <SidebarGroupLabel>Files</SidebarGroupLabel>

        <SidebarMenu>
          {files && files.length > 0 ? (
            <>
              {files.map((file) => (
                <SidebarMenuItem
                  key={file.name}
                  className={`transition ${
                    highlightFiles ? "border-rounded-lg border-blue-500 bg-blue-100" : "border border-transparent"
                  }`}
                  onClick={() => handleFileClick(file)}
                >
                  <SidebarMenuButton asChild>
                    <div className="flex flex-row">
                      <File />
                      {renamingFileId === file.id ? (
                        // Render input when renaming
                        <input
                          type="text"
                          value={renameFileValue}
                          onChange={(e) => setRenameFileValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleRenameFile(file.id, renameFileValue);
                              console.log(`renaming file: ${file.id} to ${renameFileValue}`);
                              setRenamingFileId("");
                            }
                          }}
                          // onBlur={() => console.log(`renaming file: ${file.id} to ${renameFileValue}`)}
                          onBlur={() => handleRenameFile(file.id, renameFileValue)}
                          className="bg-transparent border-b border-muted-foreground outline-none focus:border-primary"
                          autoFocus
                        />
                      ) : (
                        // Render file name normally
                        <span>{file.name}</span>
                      )}{" "}
                    </div>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!activeFiles.some((f) => f.id === file.id)) {
                            setActiveFiles([...activeFiles, file]);
                          }
                        }}
                      >
                        <Plus className="text-muted-foreground" />
                        <span> Add to chat</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          console.log("renaming file");
                          e.stopPropagation();
                          setRenamingFileId(file.id); // Set renaming mode
                          setRenameFileValue(file.name); // Initialize input with current name
                        }}
                      >
                        <Pencil className="text-muted-foreground" />
                        <span>Rename File</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFileMutation.mutate(file.id);
                          console.log("Delete file");
                        }}
                      >
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete File</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70">
                  <MoreHorizontal className="text-sidebar-foreground/70" />
                  <span>All Files</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {open && <FileUploadArea />}
            </>
          ) : (
            <FileUploadArea />
          )}
        </SidebarMenu>
      </div>
    </SidebarGroup>
  );
}

// <SidebarMenu>
// <SidebarMenuItem>
//   <SidebarMenuButton tooltip="Conversations" onClick={handleNewChat}>
//     {/* <SidebarMenuButton tooltip="Conversations" onClick={}> */}
//     <MessageSquareText />
//     <span>Conversations</span>
//     <Plus className="ml-auto" />
//   </SidebarMenuButton>
//   <SidebarMenuSub>
//     {chats &&
//       chats.data?.chats.map((chat, index) => (
//         <SidebarMenuSubItem
//           key={chat.id}
//           onClick={() => setChatId(chat.id)}
//           className="flex items-center justify-between group/item"
//         >
//           <SidebarMenuSubButton asChild>
//             <span>{chat.name}</span>
//           </SidebarMenuSubButton>
//           <DropdownMenu>
//             <DropdownMenuTrigger className="opacity-0 group-hover/item:opacity-100 transition-opacity">
//               <MoreHorizontal className="h-4 w-4" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-28">
//               <DropdownMenuItem>
//                 <Pencil />
//                 <span>Rename</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => deleteChat(chat.id)}>
//                 <Trash />
//                 <span>Delete</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </SidebarMenuSubItem>
//       ))}

//   </SidebarMenuSub>
// </SidebarMenuItem>
