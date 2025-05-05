"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check, Database, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function IntegrationSelector() {
  const [searchTerm, setSearchTerm] = useState("")

  const integrationCategories = [
    { id: "crm", name: "CRM & Sales" },
    { id: "marketing", name: "Marketing" },
    { id: "support", name: "Support" },
    { id: "product", name: "Product & Analytics" },
    { id: "database", name: "Databases" },
  ]

  const integrations = [
    { id: "salesforce", name: "Salesforce", category: "crm", selected: true },
    { id: "hubspot", name: "HubSpot", category: "crm", selected: false },
    { id: "zendesk", name: "Zendesk", category: "support", selected: true },
    { id: "intercom", name: "Intercom", category: "support", selected: false },
    { id: "marketo", name: "Marketo", category: "marketing", selected: false },
    { id: "mailchimp", name: "Mailchimp", category: "marketing", selected: false },
    { id: "segment", name: "Segment", category: "product", selected: false },
    { id: "amplitude", name: "Amplitude", category: "product", selected: false },
    { id: "postgres", name: "PostgreSQL", category: "database", selected: false },
    { id: "mysql", name: "MySQL", category: "database", selected: false },
    { id: "mongodb", name: "MongoDB", category: "database", selected: false },
  ]

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Integrations</CardTitle>
        <CardDescription>Connect your enterprise tools and databases to power your application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search integrations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="crm">
          <TabsList className="grid grid-cols-5">
            {integrationCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {integrationCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIntegrations
                  .filter((integration) => integration.category === category.id)
                  .map((integration) => (
                    <div
                      key={integration.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${integration.selected ? "bg-primary/5 border-primary" : "bg-card"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-muted">
                          <Database className="h-5 w-5" />
                        </div>
                        <span>{integration.name}</span>
                      </div>
                      <Button variant={integration.selected ? "default" : "outline"} size="sm">
                        {integration.selected ? (
                          <>
                            <Check className="mr-1 h-4 w-4" /> Connected
                          </>
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline">Skip for now</Button>
          <Button>Save Integrations</Button>
        </div>
      </CardContent>
    </Card>
  )
}
