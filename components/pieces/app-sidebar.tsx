"use client";

import * as React from "react";
import { NavMain } from "@/components/pieces/nav-main";
import { NavUser } from "@/components/pieces/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
// import Image from "next/image";
import { MessageCircleMoreIcon } from "lucide-react";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {  open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-row justify-between items-center">
          {/* {open && <Image src="/logo.jpg" alt="Logo" width={32} height={32} />} */}
          {open && <MessageCircleMoreIcon className="h-8 w-8" />
          }
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
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
