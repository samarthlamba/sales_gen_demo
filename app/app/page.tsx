"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send } from "lucide-react"
import CustomerSuccessDashboard from "@/components/customer-success-dashboard"
import ChatInterface from "@/components/chat-interface"

export default function AppPage() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <header className="border-b border-zinc-800 bg-zinc-900 p-3">
        <h1 className="text-lg font-medium">Customer Success Dashboard</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Interface (1/3 width) */}
        <div className="w-1/3 border-r border-zinc-800 flex flex-col bg-zinc-900">
          <div className="p-3 border-b border-zinc-800">
            <h2 className="text-sm font-medium flex items-center text-zinc-400">
              <MessageSquare className="h-4 w-4 mr-2" />
              CHAT ASSISTANT
            </h2>
          </div>

          <ChatInterface />

          <div className="p-3 border-t border-zinc-800">
            <div className="flex gap-2">
              <Input
                placeholder="Ask a question or request changes..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Button size="icon" className="bg-white text-black hover:bg-zinc-200">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* App Dashboard (2/3 width) */}
        <div className="w-2/3 overflow-auto bg-zinc-950">
          <CustomerSuccessDashboard />
        </div>
      </div>
    </div>
  )
}
