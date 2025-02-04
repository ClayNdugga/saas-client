import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDashboard } from "@/contexts/DashboardContext";
import apiClient from "@/services/api-client";

export function DevPopover() {
  const { chats, files, chatId, fileId } = useDashboard();

  async function getFiles() {
    const res = await apiClient.get("api/files");
    console.log(res);
  }

  async function getFile() {
    const res = await apiClient.get("api/files/YTC architecture.png");
    console.log(res);
  }

  async function delFile() {
    const res = await apiClient.delete("api/files/bda3pxXhKh17Rko0Shb9");
    console.log(res);
  }

  async function getUser() {
    const res = await apiClient.get("api/users");
    console.log(res);
  }

  async function getChats() {
    const res = await apiClient.get("api/chats");
    console.log(res);
  }

  async function getChat() {
    const res = await apiClient.get("api/chats/Z0gA5BScwRKW1jC29nnE");
    console.log(res);
  }

  async function createChat() {
    const res = await apiClient.post("api/chats/", { query: "new updated query" });
    console.log(res);
  }

  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Devtools</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <Button onClick={getFiles}>Get Files</Button>
          <Button onClick={getFile}>Get File</Button>
          <Button onClick={delFile}>Del File</Button>
          <Button onClick={getUser}>Get User</Button>
          <Button onClick={getChats}>Get Chats</Button>
          <Button onClick={getChat}>Get Chat</Button>
          <Button onClick={createChat}>Create Chat</Button>
          <Button
            onClick={() => console.log(`fileId: ${fileId} | chatId: ${chatId} | chats: ${chats} | files: ${files} | `)}
          >
            Log fileID
          </Button>
          <Button onClick={() => console.log(files)}>Local Files Array</Button>

          {/* <Button onClick={getUser}>Get User</Button>  */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
