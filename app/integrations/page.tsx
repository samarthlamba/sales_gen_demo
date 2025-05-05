"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Database, Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  const integrations = [
    {
      id: "salesforce",
      name: "Salesforce",
      category: "CRM",
      suggested: true,
      selected: false,
    },
    {
      id: "hubspot",
      name: "HubSpot",
      category: "Marketing",
      suggested: true,
      selected: false,
    },
    {
      id: "zendesk",
      name: "Zendesk",
      category: "Support",
      suggested: true,
      selected: false,
    },
    {
      id: "intercom",
      name: "Intercom",
      category: "Support",
      suggested: false,
      selected: false,
    },
    {
      id: "marketo",
      name: "Marketo",
      category: "Marketing",
      suggested: false,
      selected: false,
    },
    {
      id: "postgres",
      name: "PostgreSQL",
      category: "Database",
      suggested: false,
      selected: false,
    },
    {
      id: "mongodb",
      name: "MongoDB",
      category: "Database",
      suggested: false,
      selected: false,
    },
  ]

  const [selectedIntegrations, setSelectedIntegrations] = useState(
    integrations.map((i) => ({ ...i, selected: i.suggested })),
  )

  const filteredIntegrations = selectedIntegrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggleIntegration = (id: string) => {
    setSelectedIntegrations(
      selectedIntegrations.map((integration) =>
        integration.id === id ? { ...integration, selected: !integration.selected } : integration,
      ),
    )
  }

  const handleContinue = () => {
    setIsConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      router.push("/app")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col p-6 bg-black text-white">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Connect your data</h1>
          <p className="text-zinc-400">Based on your description, we recommend these integrations</p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search integrations..."
            className="pl-10 bg-zinc-900 border-zinc-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-zinc-400">SUGGESTED</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {filteredIntegrations
                .filter((i) => i.suggested)
                .map((integration) => (
                  <div
                    key={integration.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      integration.selected
                        ? "bg-zinc-800 border border-zinc-700"
                        : "bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
                    }`}
                    onClick={() => handleToggleIntegration(integration.id)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center">
                      <Database className="h-4 w-4 text-zinc-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{integration.name}</h3>
                      <p className="text-xs text-zinc-500">{integration.category}</p>
                    </div>

                    <div
                      className={`flex-shrink-0 h-5 w-5 rounded-md flex items-center justify-center ${
                        integration.selected ? "bg-white text-black" : "bg-zinc-800 border border-zinc-700"
                      }`}
                    >
                      {integration.selected && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-medium text-zinc-400">OTHER</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {filteredIntegrations
                .filter((i) => !i.suggested)
                .map((integration) => (
                  <div
                    key={integration.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      integration.selected
                        ? "bg-zinc-800 border border-zinc-700"
                        : "bg-zinc-900 border border-zinc-800 hover:border-zinc-700"
                    }`}
                    onClick={() => handleToggleIntegration(integration.id)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center">
                      <Database className="h-4 w-4 text-zinc-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{integration.name}</h3>
                      <p className="text-xs text-zinc-500">{integration.category}</p>
                    </div>

                    <div
                      className={`flex-shrink-0 h-5 w-5 rounded-md flex items-center justify-center ${
                        integration.selected ? "bg-white text-black" : "bg-zinc-800 border border-zinc-700"
                      }`}
                    >
                      {integration.selected && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
          >
            Back
          </Button>

          <Button onClick={handleContinue} disabled={isConnecting} className="bg-white text-black hover:bg-zinc-200">
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
