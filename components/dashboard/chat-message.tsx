"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ChatMessageProps {
  content: string;
  isUser: boolean;
  className?: string;
}

export function ChatMessage({ content, isUser, className }: ChatMessageProps) {
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start", className)}>
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[80%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
} 