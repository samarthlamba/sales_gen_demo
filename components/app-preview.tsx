"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Save } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AppPreview() {
  const [editMode, setEditMode] = useState<"visual" | "chat">("visual")
  const [chatMessage, setChatMessage] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Preview Your Application</CardTitle>
              <CardDescription>Preview and make final adjustments to your application</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setEditMode("visual")}
                className={editMode === "visual" ? "bg-primary/10" : ""}
              >
                Visual Editor
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditMode("chat")}
                className={editMode === "chat" ? "bg-primary/10" : ""}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat Editor
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {editMode === "visual" ? (
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input id="app-name" defaultValue="GTM Pipeline Dashboard" />
                  </div>
                  <div>
                    <Label htmlFor="app-description">Description</Label>
                    <Textarea
                      id="app-description"
                      defaultValue="Dashboard showing sales pipeline metrics from Salesforce, marketing engagement from HubSpot, and support tickets from Zendesk."
                    />
                  </div>
                </div>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-lg border">
                <img
                  src="/placeholder.svg?height=720&width=1280&query=enterprise dashboard with sales pipeline metrics, marketing engagement, and support tickets"
                  alt="Application Preview"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Components</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span>Pipeline Chart</span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span>Account Table</span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span>Marketing Metrics</span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span>Support Tickets</span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Data Sources</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span>Salesforce</span>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span>HubSpot</span>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span>Zendesk</span>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p>
                        Your GTM Pipeline Dashboard has been generated. It includes components for sales pipeline
                        visualization, account table, marketing metrics, and support tickets.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <p>Can you add a filter for accounts by region?</p>
                    </div>
                    <div className="p-2 rounded-full bg-primary">
                      <MessageSquare className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p>
                        I've added a region filter to the dashboard. It will allow you to filter all metrics and
                        visualizations by geographic region. Would you like me to add any other filters?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Textarea
                  placeholder="Type your instructions here..."
                  className="min-h-[80px]"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button className="h-[80px]">Send</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save & Deploy
        </Button>
      </div>
    </div>
  )
}
