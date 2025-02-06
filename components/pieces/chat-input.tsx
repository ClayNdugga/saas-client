"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useChatMutation } from "@/hooks/useChatMutation";
import { useDashboard } from "@/contexts/DashboardContext";
import useCreateChatMutation from "@/hooks/useCreateChatMutation";

export function ChatInput({ width = "100%" }) {
  const [inputValue, setInputValue] = useState("");
  const chatMutation = useChatMutation();
  const createChatMutation = useCreateChatMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { chatId, activeFiles, setActiveFiles, setHighlightFiles } = useDashboard();

  const handleHighlightFiles = () => {
    setHighlightFiles(true);
    setTimeout(() => setHighlightFiles(false), 1500); // Remove highlight after 1.5s
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (chatId) {
        // console.log(`continuing chat: ${chatId}`);

        chatMutation.mutate({ query: inputValue, fileIds: activeFiles.map((file) => file.id) });
      } else {
        // console.log(`creating chat`);
        createChatMutation.mutate({ query: inputValue, fileIds: activeFiles.map((file) => file.id) });
      }

      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // handleInputChange(e)

    // Adjust textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Reset textarea height when input is cleared
  useEffect(() => {
    if (!inputValue && textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [inputValue]);

  return (
    <form onSubmit={onSubmit} className="space-y-4" style={{ width }}>
   
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder="Send a message..."
          value={inputValue}
          onChange={handleChange}
          className={
            "pb-12 min-h-[80px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pr-12 dark:border-zinc-700"
          }
          rows={1}
          autoFocus
        />
        <div className="absolute bottom-2 left-2">
          <div className="flex flex-row gap-2 flex-wrap">
            {activeFiles.length > 0 ? (
              activeFiles.map((file) => (
                <Badge key={file.id} className="flex flex-row gap-1">
                  <File className="h-3 w-3" />
                  {file.name}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => setActiveFiles(activeFiles.filter((f) => f.id !== file.id))}
                  />
                </Badge>
              ))
            ) : (
              <Badge
                variant="outline"
                className="border-dashed cursor-pointer hover:bg-gray-100 transition"
                onClick={handleHighlightFiles}
              >
                Select files
              </Badge>
            )}
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <Button
            className="rounded-lg p-1.5 h-fit border dark:border-zinc-600"
            type="submit"
            disabled={!inputValue.trim()}
          >
            <ArrowUp size={14} />
          </Button>
        </div>
      </div>
    </form>
  );
}
