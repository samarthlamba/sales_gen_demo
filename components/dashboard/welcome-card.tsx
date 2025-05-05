"use client";

import {ChatInput} from "@/components/dashboard/chat-input";
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, BarChart3 } from "lucide-react";

export interface WelcomeCardProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function WelcomeCard({onSendMessage, isLoading = false}: WelcomeCardProps) {
  // Define suggestions similar to the main app
  const suggestions = [
    {
      icon: <Sparkles className="h-4 w-4 text-amber-500" />,
      label: "Create an outbound outreach engine for sales prospecting",
      prompt:
        "I need an outbound outreach engine for sales prospecting. It should have a message composer with templates, prospect research panel showing LinkedIn activity and company news, and an ICP qualification checklist. Include action buttons for skip, star, add to CRM, email, and LinkedIn message. Integrate with Gmail, LinkedIn, and HubSpot.",
    },
    {
      icon: <Zap className="h-4 w-4 text-blue-500" />,
      label: "Build an account-based marketing campaign orchestrator",
      prompt:
        "Create an account-based marketing campaign orchestrator that helps me target key accounts with personalized content. It should track engagement across channels, suggest next best actions, and provide insights on campaign performance. Include integrations with ad platforms, email marketing tools, and our CRM.",
    },
    {
      icon: <BarChart3 className="h-4 w-4 text-emerald-500" />,
      label: "Design a customer journey analytics dashboard",
      prompt:
        "Design a customer journey analytics dashboard that visualizes the path from prospect to customer. It should identify drop-off points, highlight successful conversion paths, and recommend optimization opportunities. Include funnel visualization, cohort analysis, and attribution modeling capabilities.",
    },
  ];

  return (
    <div className="relative w-full max-w-[48rem] mx-auto">
      {/* Card content */}
      <div className="p-8 bg-card rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center text-foreground">
            What are we building today?
          </h2>
          <p className="text-muted-foreground text-center mt-2">
            Describe the enterprise app you want to build and I'll create it for you.
          </p>
        </div>
        
        <div className="mt-6">
          <ChatInput 
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            placeholder="Describe your enterprise app..."
            className="bg-background shadow-sm"
          />
        </div>

        {/* Suggestions Section */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Try one of these suggestions:
          </h3>
          <div className="grid gap-3">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex items-center gap-2 justify-start h-auto py-3 px-4 border-border/50 hover:border-border hover:bg-background/50 transition-all"
                onClick={() => onSendMessage(suggestion.prompt)}
              >
                <div className="flex-shrink-0">
                  {suggestion.icon}
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{suggestion.label}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
