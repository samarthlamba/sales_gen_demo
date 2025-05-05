"use client";

import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/dashboard/chat-message";
import { ChatInput } from "@/components/dashboard/chat-input";
import { Separator } from "@/components/ui/separator";
import { Message } from "../../hooks/use-chat";

export interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  title?: string;
  emptyState?: React.ReactNode;
  className?: string;
}

export function ChatPanel({
  messages,
  onSendMessage,
  isLoading = false,
  title = "Chat",
  emptyState,
  className,
}: ChatPanelProps) {
  // Auto-scroll to bottom of chat
  useEffect(() => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 font-medium ml-12">{title}</div>
      <Separator />
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && emptyState ? (
            emptyState
          ) : (
            messages.map((message, index) => (
              <ChatMessage 
                key={index}
                content={message.content}
                isUser={message.isUser}
              />
            ))
          )}
        </div>
      </ScrollArea>
      <div className="p-4">
        <ChatInput
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          placeholder="Describe your enterprise app..."
        />
      </div>
    </div>
  );
} 