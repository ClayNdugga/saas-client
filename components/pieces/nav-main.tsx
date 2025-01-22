"use client";

import {
  ChevronRight,
  type LucideIcon,
  MessageSquareText,
  File,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash,
  Folder,
  Forward,
  Trash2,
} from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DashboardProvider, useDashboard } from "@/contexts/DashboardContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import apiClient from "@/services/api-client";
export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { chats, files, chatId, setChatId, fileId, setFileId } = useDashboard();
  const { isMobile } = useSidebar()

  async function deleteChat(deleteChatId: string) {
    await apiClient.delete(`/api/chats/${deleteChatId}`);
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {/* custom */}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Conversations" onClick={() => setChatId("")}>
            {/* <SidebarMenuButton tooltip="Conversations" onClick={}> */}
            <MessageSquareText />
            <span>Conversations</span>
            <Plus className="ml-auto" />
          </SidebarMenuButton>
          <SidebarMenuSub>
            {/* {chats &&
              chats.data?.chats.map((chat) => (
                <SidebarMenuSubItem key={chat} onClick={() => setChatId(chat)}>
                  <SidebarMenuSubButton asChild>
                    <span>{chat}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))} */}

            {chats &&
              chats.data?.chats.map((chat, index) => (
                <SidebarMenuSubItem
                  key={chat.id}
                  onClick={() => setChatId(chat.id)}
                  className="flex items-center justify-between group/item"
                >
                  <SidebarMenuSubButton asChild>
                    <span>{chat.name}</span>
                  </SidebarMenuSubButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-28">
                      <DropdownMenuItem>
                        <Pencil />
                        <span>Rename</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteChat(chat)}>
                        <Trash />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuSubItem>
              ))}

            {/* {chats &&
              chats.data?.chats.map((chat) => (
                <SidebarMenuSubItem key={chat}>
                  <SidebarMenuSubButton asChild>
                    <span>{chat}</span>
                  </SidebarMenuSubButton>
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
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Forward className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuSubItem>


              ))} */}
          </SidebarMenuSub>
        </SidebarMenuItem>
        {/* {[{name: "Project 1", url: "/project1", icon: Folder}, {name: "Project 2", url: "/project2", icon: Folder}].map((item) => (
          <SidebarMenuSubItem key={item.name}>
            <SidebarMenuSubButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuSubButton>
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
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuSubItem>
        ))} */}

        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Files" onClick={() => setFileId("")}>
            <File />
            <span>Files</span>
            <Plus className="ml-auto" />
          </SidebarMenuButton>
          <SidebarMenuSub>
            {files &&
              files.data?.files.map((file) => (
                <SidebarMenuSubItem key={file.id} onClick={() => setFileId(file.id)}>
                  <SidebarMenuSubButton asChild>
                    <span>{file.name}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
          </SidebarMenuSub>
        </SidebarMenuItem>
        {/* custom */}

        {/* {items.map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))} */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
