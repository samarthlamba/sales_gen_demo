import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Database } from "lucide-react"

export default function ChatInterface() {
  const messages = [
    {
      id: 1,
      sender: "assistant",
      content:
        "I've generated your GTM Pipeline Dashboard based on your description. It includes sales pipeline metrics from Salesforce, marketing engagement from HubSpot, and support tickets from Zendesk.",
      timestamp: "Just now",
    },
    {
      id: 2,
      sender: "assistant",
      content:
        "You can filter by account and date range as requested. Is there anything specific you'd like me to explain or modify?",
      timestamp: "Just now",
    },
    {
      id: 3,
      sender: "assistant",
      content: "These are suggested integrations for your dashboard:",
      timestamp: "Just now",
      integrations: [
        { name: "Oracle", category: "Database", selected: true },
        { name: "Salesforce", category: "CRM", selected: true },
        { name: "PostgreSQL", category: "Database", selected: false },
        { name: "Slack", category: "Communication", selected: false },
      ],
    },
    {
      id: 4,
      sender: "user",
      content: "Can you add a regional breakdown for the pipeline metrics?",
      timestamp: "Just now",
    },
    {
      id: 5,
      sender: "assistant",
      content:
        "I've added a regional breakdown chart to the pipeline metrics section. You can now see how your pipeline is distributed across different regions.",
      timestamp: "Just now",
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`flex gap-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
            <Avatar className={`h-6 w-6 ${message.sender === "user" ? "border border-zinc-700" : ""}`}>
              {message.sender === "assistant" ? (
                <>
                  <AvatarImage src="/assistant-avatar.png" />
                  <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">AI</AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarImage src="/user-avatar.png" />
                  <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">ME</AvatarFallback>
                </>
              )}
            </Avatar>
            <div>
              <div
                className={`rounded-lg p-2 text-sm ${
                  message.sender === "user" ? "bg-white text-black" : "bg-zinc-800 border border-zinc-700"
                }`}
              >
                <p>{message.content}</p>

                {/* Integrations suggestion UI */}
                {message.integrations && (
                  <div className="mt-2 pt-2 border-t border-zinc-700">
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {message.integrations.map((integration, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded-md ${
                            integration.selected ? "bg-zinc-700" : "bg-zinc-800"
                          }`}
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-md bg-zinc-600 flex items-center justify-center">
                            <Database className="h-3 w-3 text-zinc-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium">{integration.name}</p>
                            <p className="text-xs text-zinc-500">{integration.category}</p>
                          </div>
                          {integration.selected && (
                            <div className="flex-shrink-0 h-4 w-4 rounded-sm bg-white text-black flex items-center justify-center">
                              <Check className="h-2.5 w-2.5" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-1 px-1">{message.timestamp}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
