"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Filter, GripVertical, Pencil, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AppDashboard() {
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  // Component wrapper that adds edit controls when in edit mode
  const EditableComponent = ({ children, title }: { children: React.ReactNode; title: string }) => {
    return (
      <div
        className={`relative group ${editMode ? "cursor-move border border-dashed border-zinc-700 rounded-md" : ""}`}
      >
        {editMode && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
            <div className="bg-zinc-800 rounded-md p-1 shadow-md flex items-center">
              <GripVertical className="h-4 w-4 text-zinc-400" />
              <span className="text-xs text-zinc-400 mx-1">{title}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-1 hover:bg-zinc-700">
                <Pencil className="h-3 w-3 text-zinc-400" />
              </Button>
            </div>
          </div>
        )}
        {children}
      </div>
    )
  }

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Large prominent edit button at the top */}
      <div className="mb-4 flex justify-end">
        <Button
          variant={editMode ? "default" : "outline"}
          size="default"
          className={`${
            editMode
              ? "bg-white text-black hover:bg-zinc-200 border-2 border-white"
              : "border-2 border-zinc-700 text-white hover:border-white"
          }`}
          onClick={toggleEditMode}
        >
          {editMode ? (
            <>
              <Save className="h-4 w-4 mr-2" /> Save Layout
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Dashboard
            </>
          )}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">GTM Pipeline Dashboard</h2>

        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-zinc-900 border-zinc-800 text-white">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="acme">Acme Inc</SelectItem>
              <SelectItem value="globex">Globex Corporation</SelectItem>
              <SelectItem value="initech">Initech</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            className="border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
          >
            <Filter className="h-4 w-4" />
          </Button>

          <div className="relative">
            <Input placeholder="Search..." className="w-[160px] bg-zinc-900 border-zinc-800 text-white" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-800">
            Overview
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="data-[state=active]:bg-zinc-800">
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="marketing" className="data-[state=active]:bg-zinc-800">
            Marketing
          </TabsTrigger>
          <TabsTrigger value="support" className="data-[state=active]:bg-zinc-800">
            Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: "Total Pipeline", value: "$4.2M", change: "+12% from last month", color: "bg-blue-500" },
              {
                title: "Marketing Qualified Leads",
                value: "342",
                change: "+8% from last month",
                color: "bg-purple-500",
              },
              { title: "Open Support Tickets", value: "28", change: "-5% from last month", color: "bg-amber-500" },
            ].map((stat, i) => (
              <EditableComponent key={i} title={`Stat Card: ${stat.title}`}>
                <Card className="bg-zinc-900 border-zinc-800">
                  <div className={`h-1 ${stat.color}`}></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-400">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <p className="text-xs text-zinc-500">{stat.change}</p>
                  </CardContent>
                </Card>
              </EditableComponent>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <EditableComponent title="Chart: Pipeline by Stage">
              <Card className="col-span-1 bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pipeline by Stage</CardTitle>
                  <CardDescription className="text-zinc-500">Current distribution of opportunities</CardDescription>
                </CardHeader>
                <CardContent className="h-[240px] flex items-center justify-center">
                  <img src="/sales-pipeline-funnel.png" alt="Pipeline by Stage" className="max-w-full max-h-full" />
                </CardContent>
              </Card>
            </EditableComponent>

            <EditableComponent title="Chart: Regional Breakdown">
              <Card className="col-span-1 bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Regional Breakdown</CardTitle>
                  <CardDescription className="text-zinc-500">Pipeline distribution by region</CardDescription>
                </CardHeader>
                <CardContent className="h-[240px] flex items-center justify-center">
                  <img src="/sales-pipeline-regions.png" alt="Regional Breakdown" className="max-w-full max-h-full" />
                </CardContent>
              </Card>
            </EditableComponent>
          </div>

          <EditableComponent title="Table: Top Accounts">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Accounts</CardTitle>
                <CardDescription className="text-zinc-500">
                  Accounts with highest engagement across sales, marketing and support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border border-zinc-800">
                  <div className="grid grid-cols-5 border-b border-zinc-800 bg-zinc-800/50 p-2 text-xs font-medium text-zinc-400">
                    <div>ACCOUNT</div>
                    <div>PIPELINE VALUE</div>
                    <div>MARKETING</div>
                    <div>TICKETS</div>
                    <div>HEALTH</div>
                  </div>
                  {[
                    { name: "Acme Inc", pipeline: "$1.2M", engagement: "High", tickets: 3, health: 92 },
                    { name: "Globex Corporation", pipeline: "$850K", engagement: "Medium", tickets: 5, health: 78 },
                    { name: "Initech", pipeline: "$720K", engagement: "High", tickets: 2, health: 85 },
                    { name: "Umbrella Corp", pipeline: "$540K", engagement: "Low", tickets: 8, health: 62 },
                    { name: "Stark Industries", pipeline: "$490K", engagement: "Medium", tickets: 4, health: 74 },
                  ].map((account, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-5 p-2 text-sm ${i !== 4 ? "border-b border-zinc-800" : ""} hover:bg-zinc-800/50 transition-colors`}
                    >
                      <div className="font-medium">{account.name}</div>
                      <div>{account.pipeline}</div>
                      <div>{account.engagement}</div>
                      <div>{account.tickets}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-zinc-800 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                account.health > 80
                                  ? "bg-emerald-500"
                                  : account.health > 70
                                    ? "bg-blue-500"
                                    : account.health > 60
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                              }`}
                              style={{ width: `${account.health}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{account.health}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </EditableComponent>
        </TabsContent>

        <TabsContent value="pipeline" className="pt-4">
          <EditableComponent title="Pipeline Details Dashboard">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pipeline Details</CardTitle>
                <CardDescription className="text-zinc-500">Detailed view of your sales pipeline</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex items-center justify-center">
                <img src="/sales-pipeline-dashboard.png" alt="Pipeline Details" className="max-w-full max-h-full" />
              </CardContent>
            </Card>
          </EditableComponent>
        </TabsContent>

        <TabsContent value="marketing" className="pt-4">
          <EditableComponent title="Marketing Engagement Dashboard">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Marketing Engagement</CardTitle>
                <CardDescription className="text-zinc-500">Marketing metrics and campaign performance</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex items-center justify-center">
                <img
                  src="/marketing-performance-overview.png"
                  alt="Marketing Engagement"
                  className="max-w-full max-h-full"
                />
              </CardContent>
            </Card>
          </EditableComponent>
        </TabsContent>

        <TabsContent value="support" className="pt-4">
          <EditableComponent title="Support Tickets Dashboard">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                <CardDescription className="text-zinc-500">Overview of customer support activity</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex items-center justify-center">
                <img src="/support-dashboard-overview.png" alt="Support Tickets" className="max-w-full max-h-full" />
              </CardContent>
            </Card>
          </EditableComponent>
        </TabsContent>
      </Tabs>
    </div>
  )
}
