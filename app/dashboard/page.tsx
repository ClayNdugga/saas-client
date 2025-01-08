"use client";

import { AppSidebar } from "@/components/pieces/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { useRouter } from "next/navigation";

import { getFirestore, doc, DocumentReference, DocumentData } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";

import { FirebaseChat, FirebaseDBUser } from "../models/firebase";
import { useEffect, useState } from "react";
import { Message } from "@/components/pieces/message";
import FileUpload from "@/components/pieces/file-upload";
import { FileUploadArea } from "@/components/pieces/file-upload-area";

import apiClient from "../services/api-client";

const chatData: FirebaseChat = {
  chatId: "chat123",
  userId: "user456",
  createdAt: "2025-01-01T10:00:00Z",
  updatedAt: "2025-01-01T11:00:00Z",
  messages: [
    {
      messageId: "msg1",
      role: "user",
      content: "What is the main topic of this document?",
      timestamp: "2025-01-01T10:05:00Z",
    },
    {
      messageId: "msg2",
      role: "system",
      content: "The main topic is artificial intelligence and its applications. See page 3 for details.",
      timestamp: "2025-01-01T10:06:00Z",
    },
  ],
};

export default function Page() {
  const router = useRouter();

  const [user, loadingUser, errorUser] = useAuthState(auth);
  const [userDocRef, setUserDocRef] = useState<DocumentReference<DocumentData, DocumentData> | null>(null);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      setUserDocRef(userRef);
    }
  }, [user]);
  const [userData, loadingData, errorData] = useDocumentDataOnce(userDocRef);

  // console.log(userData)

  if (!user && !loadingUser) {
    router.push("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className=" flex flex-col h-screen">
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
          </header>

          <div className="flex flex-row p-8 gap-4 flex-1">
            <div className="flex flex-col w-1/2 relative p-4 items-center justify-center bg-muted/50 rounded-xl">
              {/* <h1 className="text-4xl font-bold mb-8">File Upload</h1> */}
              {/* <FileUpload /> */}
              <FileUploadArea />

            </div>
            <div className="w-1/2 rounded-xl bg-muted/50 p-4">
              <h1> Chat window </h1>
              {chatData.messages.map((message) =>
                message.role === "user" ? (
                  <Message key={message.messageId} content={message.content} role={message.role} />
                ) : (
                  <Message key={message.messageId} content={message.content} role={message.role} />
                )
              )}
            </div>
          </div>
        </div>

        {/* <div className = "minh-28" />


        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}


