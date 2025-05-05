import { useState } from "react";

export interface Message {
  content: string;
  isUser: boolean;
}

interface UseChatOptions {
  onMessageReceived?: () => void;
}

export function useChat(options?: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = { content, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // Set loading state
    setIsLoading(true);
    
    // Add an empty AI message with a cursor
    const aiMessage: Message = { content: "▌", isUser: false };
    setMessages(prev => [...prev, aiMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
          'Authorization': 'Bearer placeholder-token', // Replace with actual auth token if needed
        },
        body: JSON.stringify({
          prompt: content,
          ...(chatId ? { chatId } : {})
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Network response was not ok");
      }

      // Check for chat ID in headers
      const newChatId = response.headers.get("X-Chat-ID");
      if (newChatId && !chatId) {
        setChatId(newChatId);
      }

      // Process the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedContent = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);

        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const text = line.slice(6); // Remove 'data: ' prefix
            accumulatedContent += text;

            // Update the AI message with the accumulated content
            setMessages(prev => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              if (lastIndex >= 0 && !updated[lastIndex].isUser) {
                updated[lastIndex] = {
                  ...updated[lastIndex],
                  content: accumulatedContent + "▌", // Add cursor
                };
              }
              return updated;
            });
          }
        }
      }

      // Remove cursor from final message
      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (lastIndex >= 0 && !updated[lastIndex].isUser) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: accumulatedContent,
          };
        }
        return updated;
      });

      // Call the callback if provided
      if (options?.onMessageReceived) {
        options.onMessageReceived();
      }
    } catch (error) {
      console.error("Error during chat:", error);
      
      // Update the AI message with an error
      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (lastIndex >= 0 && !updated[lastIndex].isUser) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: "Sorry, an error occurred while processing your request.",
          };
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setChatId(null);
  };

  return {
    messages,
    isLoading,
    chatId,
    sendMessage,
    clearMessages,
  };
} 