"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatMutation } from "@/hooks/useChatMutation";
import { useDashboard } from "@/contexts/DashboardContext";
import useCreateChatMutation from "@/hooks/useCreateChatMutation";

export function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const chatMutation = useChatMutation();
  const createChatMutation = useCreateChatMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { chatId, fileId } = useDashboard();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (chatId) {
        // console.log(`continuing chat: ${chatId}`);

        chatMutation.mutate({ query: inputValue, fileId: fileId });
      } else {
        // console.log(`creating chat`);
        createChatMutation.mutate({ query: inputValue, fileId: fileId });
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
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            placeholder="Send a message..."
            value={inputValue}
            onChange={handleChange}
            className={
              "pb-13 min-h-[80px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pr-12 dark:border-zinc-700"
            }
            rows={2}
            autoFocus
          />
          <div className="absolute bottom-2 right-2">
            <Button
              className="rounded-full p-1.5 h-fit border dark:border-zinc-600"
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
