"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/pieces/nav-main";
import { NavProjects } from "@/components/pieces/nav-projects";
import { NavUser } from "@/components/pieces/nav-user";
import { TeamSwitcher } from "@/components/pieces/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import { GalleryHorizontalIcon } from "lucide-react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { FirebaseUser } from "@/models/firebase";
import { DevPopover } from "./dev-popover";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const { isMobile, open, setOpen } = useSidebar()


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}

        <div className="flex flex-row justify-between items-center">
            {open && <>
              <GalleryHorizontalIcon />
              <DevPopover />
            </>}
            <SidebarTrigger />
        </div>

      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// export function main() {
//   const [user] = useAuthState(auth)

//   return (
//     <NavUser user={user as FirebaseUser} />
//   )

// }
