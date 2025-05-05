"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles, Loader2, Zap, Check, Database, Bot } from "lucide-react"
import OutreachEngine from "@/components/outreach-engine"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
// @ts-ignore
import { motion } from "framer-motion"
import { WelcomeCard } from "@/components/dashboard/welcome-card"

// Define types for our chat messages
interface Integration {
  name: string;
  category: string;
  selected: boolean;
}

interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  integrations?: Integration[];
}

export default function Home() {
  const [message, setMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showOutreachEngine, setShowOutreachEngine] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [useCacheMode, setUseCacheMode] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("Analyzing request...")
  const [isExpanded, setIsExpanded] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "assistant",
      content: "I can help you build enterprise applications. What would you like to create?",
      timestamp: "Just now",
    },
  ])

  const generationSteps = [
    "Analyzing request...",
    "Identifying outreach requirements...",
    "Designing message composer...",
    "Creating prospect research panel...",
    "Looking into LinkedIn integration",
    "Building ICP qualification checklist...",
    "Fetching metadata from source systems...",
    "Validating data integrity...",
    "Normalizing incoming datasets...",
    "Applying data transformations...",
    "Generating templates...",
    "Optimizing UI components...",
    "Creating responsive design layout...",
    "Injecting interactive animations...",
    "Setting up conditional logic for filters...",
    "Finalizing outreach engine layout...",
    "Encrypting sensitive data...",
    "Generating production build...",
    "Creating deployment scripts...",
    "Ready to render outreach engine!",
  ]

  const loadingMessages = [
    "Generating outreach components...",
    "Applying enterprise design patterns...",
    "Optimizing for performance...",
    "Finalizing UI elements...",
    "Preparing to render outreach engine...",
  ]

  // Add this effect to clean URL when page loads
  useEffect(() => {
    // Check if we have app_id in URL and remove it on page load/reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.has('app_id')) {
        url.searchParams.delete('app_id');
        window.history.replaceState({}, '', url);
      }
    }
  }, []);

  // Make a one-time API request when generation starts
  useEffect(() => {
    if (isGenerating) {
      // Generate a random UUID
      const uuid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);
      
      // Update the URL of the page without reloading
      const url = new URL(window.location.href);
      url.searchParams.set('app_id', uuid);
      window.history.pushState({}, '', url);
      
      fetch(`http://localhost:8000/generate`, {
        method: 'POST',
      })
    }
  }, [isGenerating])
  
  // Clean up URL when generation is complete
  useEffect(() => {
    if (!isGenerating && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.has('app_id')) {
        url.searchParams.delete('app_id');
        window.history.replaceState({}, '', url);
      }
    }
  }, [isGenerating])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isGenerating && !useCacheMode) {
      // Normal generation with thinking steps
      if (generationStep < generationSteps.length) {
        timer = setTimeout(() => {
          setGenerationStep((prev) => prev + 1)
        }, 3600)
      } else {
        // Finished all steps
        setTimeout(() => {
          setIsGenerating(false)
          setShowOutreachEngine(true)

          // Add assistant response messages
          setChatMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "assistant",
              content:
                "I've generated an outbound outreach engine based on your request. It includes a message composer, prospect research panel, ICP qualification checklist, and action buttons.",
              timestamp: "Just now",
            },
            {
              id: Date.now() + 2,
              sender: "assistant",
              content: "These are suggested integrations for your outreach engine:",
              timestamp: "Just now",
              integrations: [
                { name: "Gmail", category: "Email", selected: true },
                { name: "LinkedIn", category: "Social", selected: true },
                { name: "HubSpot", category: "CRM", selected: true },
                { name: "Slack", category: "Communication", selected: false },
              ],
            },
          ])
        }, 1000)
      }
    } else if (isGenerating && useCacheMode) {
      // Cache mode with progress bar
      if (progress < 100) {
        timer = setTimeout(() => {
          setProgress((prev) => {
            const increment = Math.floor(Math.random() * 15) + 5
            return Math.min(prev + increment, 100)
          })

          // Rotate through loading messages
          setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
        }, 800)
      } else {
        // Finished progress
        setTimeout(() => {
          setIsGenerating(false)
          setShowOutreachEngine(true)

          // Add assistant response messages
          setChatMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: "assistant",
              content:
                "I've generated an outbound outreach engine based on your request. It includes a message composer, prospect research panel, ICP qualification checklist, and action buttons.",
              timestamp: "Just now",
            },
            {
              id: Date.now() + 2,
              sender: "assistant",
              content: "These are suggested integrations for your outreach engine:",
              timestamp: "Just now",
              integrations: [
                { name: "Gmail", category: "Email", selected: true },
                { name: "LinkedIn", category: "Social", selected: true },
                { name: "HubSpot", category: "CRM", selected: true },
                { name: "Slack", category: "Communication", selected: false },
              ],
            },
          ])
        }, 500)
      }
    }

    return () => clearTimeout(timer)
  }, [isGenerating, generationStep, useCacheMode, progress])

  // Expand the panels when the first message is sent
  useEffect(() => {
    if (chatMessages.length > 1 && !isExpanded) {
      setIsExpanded(true)
    }
  }, [chatMessages, isExpanded])

  const handleGenerate = () => {
    if (!message.trim()) return

    // Add user message to chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        content: message,
        timestamp: "Just now",
      },
    ])

    // Trigger animation if first message
    if (!isExpanded) {
      setIsExpanded(true)
    }

    setIsGenerating(true)
    setGenerationStep(0)
    setProgress(0)
    setUseCacheMode(false)
    
    // Clear message input after sending
    setMessage("")
  }

  const handleSendMessage = (content: string) => {
    // Set the message from the WelcomeCard input
    setMessage(content)
    
    // Add user message to chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        content,
        timestamp: "Just now",
      },
    ])

    // Trigger animation if first message
    if (!isExpanded) {
      setIsExpanded(true)
    }

    setIsGenerating(true)
    setGenerationStep(0)
    setProgress(0)
    setUseCacheMode(false)
    
    // Clear message input after sending
    setMessage("")
  }

  const handleUseCache = () => {
    setUseCacheMode(true)
    setIsGenerating(true)
    setProgress(0)
  }

  // Update the suggestions array to include various GTM-related automation use cases
  const suggestions = [
    {
      label: "Create an outbound outreach engine for sales prospecting",
      prompt:
        "I need an outbound outreach engine for sales prospecting. It should have a message composer with templates, prospect research panel showing LinkedIn activity and company news, and an ICP qualification checklist. Include action buttons for skip, star, add to CRM, email, and LinkedIn message. Integrate with Gmail, LinkedIn, and HubSpot.",
    },
    {
      label: "Build an account-based marketing campaign orchestrator",
      prompt:
        "Create an account-based marketing campaign orchestrator that helps me target key accounts with personalized content. It should track engagement across channels, suggest next best actions, and provide insights on campaign performance. Include integrations with ad platforms, email marketing tools, and our CRM.",
    },
    {
      label: "Design a customer journey analytics dashboard",
      prompt:
        "Design a customer journey analytics dashboard that visualizes the path from prospect to customer. It should identify drop-off points, highlight successful conversion paths, and recommend optimization opportunities. Include funnel visualization, cohort analysis, and attribution modeling capabilities.",
    },
  ]

  const renderChatPanel = () => (
    <div className="flex-1 overflow-y-auto p-3 space-y-4">
      {chatMessages.map((message) => (
        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`flex gap-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
            <Avatar className={`h-6 w-6 ${message.sender === "user" ? "border border-zinc-700" : ""}`}>
              {message.sender === "assistant" ? (
                <>
                  <AvatarImage src="/assistant-avatar.png" />
                  <AvatarFallback className="bg-zinc-800 text-zinc-400">
                    <Bot className="h-3 w-3" />
                  </AvatarFallback>
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

      {isGenerating && (
        <div className="flex justify-start">
          <div className="flex gap-2 max-w-[85%]">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/assistant-avatar.png" />
              <AvatarFallback className="bg-zinc-800 text-zinc-400">
                <Bot className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <div className="rounded-lg p-3 text-sm bg-zinc-800 border border-zinc-700">
                {!useCacheMode ? (
                  <div className="space-y-2">
                    <p className="font-medium text-xs text-zinc-400">THINKING</p>
                    <div className="space-y-1.5">
                      {generationSteps.slice(0, generationStep + 1).map((step, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {index === generationStep ? (
                            <Loader2 className="h-3 w-3 animate-spin text-zinc-400" />
                          ) : (
                            <div className="h-3 w-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                            </div>
                          )}
                          <p className={`text-xs ${index === generationStep ? "text-zinc-300" : "text-zinc-500"}`}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-end">
                      {/* <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs border-zinc-700 text-zinc-400 hover:text-white"
                        onClick={handleUseCache}
                      >
                        <Zap className="h-3 w-3 mr-1 text-amber-500" /> Use Cache
                      </Button> */}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <p className="text-xs">{loadingMessage}</p>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className={`h-screen bg-black text-white ${isExpanded ? "" : "p-4 flex justify-center items-center"}`}>
      {isExpanded ? (
        <motion.div
          key="resizable-panels"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg border border-zinc-800">
            <ResizablePanel defaultSize={33} minSize={25} maxSize={50} className="h-full">
              <div className="flex flex-col h-full">
                <div className="p-3 border-b border-zinc-800">
                  <h2 className="text-sm font-medium flex items-center text-zinc-400 mx-10 mt-2">LUMARI</h2>
                </div>
                
                {renderChatPanel()}
                
                {!showOutreachEngine && !isGenerating && (
                  <div className="p-3 border-t border-zinc-800">
                    <div className="space-y-3">
                      <div className="text-xs text-zinc-500">Try one of these:</div>
                      <div className="flex flex-col gap-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 justify-start text-left h-auto py-2 whitespace-normal"
                            onClick={() => setMessage(suggestion.prompt)}
                          >
                            {suggestion.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-3 border-t border-zinc-800 mt-auto">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Describe the app you want to build..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white text-sm"
                      disabled={isGenerating}
                    />
                    <Button
                      size="icon"
                      className="bg-white text-black hover:bg-zinc-200"
                      onClick={handleGenerate}
                      disabled={isGenerating || !message.trim()}
                    >
                      {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={67} className="h-full overflow-auto">
              {showOutreachEngine ? (
                <OutreachEngine />
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="max-w-md space-y-4">
                    <Sparkles className="h-12 w-12 text-zinc-700 mx-auto" />
                    <h2 className="text-xl font-medium">Describe your enterprise app</h2>
                    <p className="text-zinc-400 text-sm">
                      Use the chat to describe the app you want to build. You can specify features, data sources, and design
                      preferences.
                    </p>
                  </div>
                </div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </motion.div>
      ) : (
        <WelcomeCard 
          onSendMessage={handleSendMessage}
          isLoading={isGenerating}
        />
      )}
    </div>
  )
}
