"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Check,
  Copy,
  Globe,
  Info,
  Linkedin,
  Lock,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Share2,
  SkipForward,
  Star,
  User,
  Building,
  Briefcase,
  GraduationCap,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Database,
  Save,
  Plus,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OutreachEngine() {
  const [showNewTemplateDialog, setShowNewTemplateDialog] = useState(false)
  const [showConfigureICPDialog, setShowConfigureICPDialog] = useState(false)
  const [newTemplateName, setNewTemplateName] = useState("")
  const [newTemplateContent, setNewTemplateContent] = useState("")

  const [currentProspect, setCurrentProspect] = useState<any>({
    id: 1,
    name: "Jane Doe",
    title: "VP of Marketing",
    company: "Acme Corp",
    email: "jane.doe@acmecorp.com",
    linkedin: "linkedin.com/in/janedoe",
    avatar: "/professional-woman-headshot.png",
    recentActivity: [
      { type: "post", content: "Excited to announce our new product launch!", date: "2 days ago" },
      { type: "article", content: "The Future of Marketing Automation", date: "1 week ago" },
      { type: "share", content: "Interesting read on B2B growth strategies", date: "2 weeks ago" },
    ],
    companyNews: [
      { title: "Acme Corp Raises $50M Series C", date: "1 month ago" },
      { title: "New CMO Appointed at Acme Corp", date: "3 months ago" },
    ],
    sharedConnections: [
      { name: "John Smith", mutual: true },
      { name: "Sarah Johnson", mutual: true },
    ],
    background: {
      education: "Stanford University",
      previousCompanies: ["TechStart Inc.", "Growth Ventures"],
    },
    icpMatch: {
      companySize: { value: "50-100", match: true },
      industry: { value: "B2B", match: true },
      productType: { value: "SaaS", match: true },
      location: { value: "US", match: true },
      department: { value: "Marketing", match: false },
      seniority: { value: "VP+", match: true },
    },
    notes: "Previously engaged with our webinar content. Showed interest in analytics features.",
  })

  const [messageContent, setMessageContent] = useState("")
  const [isStarred, setIsStarred] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showIntegrationsDialog, setShowIntegrationsDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showEditMode, setShowEditMode] = useState(false)
  const [shareLink, setShareLink] = useState("https://company.outreach.com/outreach-engine-q2-2025")
  const [customUrlPath, setCustomUrlPath] = useState("outreach-engine-q2-2025")
  const [showProspectListDialog, setShowProspectListDialog] = useState(false)

  const templates = [
    {
      id: "intro",
      name: "Introduction",
      content: `Hey ${currentProspect.name.split(" ")[0]},

I noticed your recent post about ${currentProspect.recentActivity[0].content.toLowerCase()} and thought it aligned well with what we're working on at Vercel.

Would you be open to a quick chat about how we're helping companies like ${currentProspect.company} improve their marketing performance?

Best,
Alex`,
    },
    {
      id: "content",
      name: "Content Share",
      content: `Hi ${currentProspect.name.split(" ")[0]},

I saw you're interested in marketing automation and thought you might find our latest case study valuable. It shows how companies similar to ${currentProspect.company} achieved 40% better conversion rates.

Here's the link: [Case Study Link]

Would love to hear your thoughts!

Regards,
Alex`,
    },
    {
      id: "followup",
      name: "Follow-up",
      content: `Hi ${currentProspect.name.split(" ")[0]},

Just following up on my previous message. I understand you're probably busy, but I'd still love to show you how we could help with your marketing initiatives at ${currentProspect.company}.

Would a 15-minute call next week work for you?

Best,
Alex`,
    },
  ]

  const applyTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setMessageContent(template.content)
      setSelectedTemplate(templateId)
    }
  }

  useEffect(() => {
    if (selectedTemplate) {
      if (textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(0, 0)
        textareaRef.current.scrollTop = 0
      }
    }
  }, [selectedTemplate])

  const handleSendEmail = async () => {
    try {
      // First send the message
      const sendResponse = await fetch('http://localhost:8000/send_email_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: currentProspect.email,
          content: messageContent,
        }),
      });
      
      // Then fetch the updated profile
      const profileResponse = await fetch('http://localhost:8000/fetch_profile', {
        method: 'GET',
      });
      
      // Optional: handle the profile data
      const profileData = await profileResponse.json();
      console.log('Profile data:', profileData);
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSendLinkedIn = () => {
    // In a real app, this would send a LinkedIn message
    alert(`LinkedIn message would be sent to ${currentProspect.name}`)
  }

  const handleSchedule = () => {
    setShowScheduleDialog(true)
  }

  const handleSkip = () => {
    // In a real app, this would load the next prospect
    alert("Skipping to next prospect")
  }

  const handleStar = () => {
    setIsStarred(!isStarred)
  }

  const getMatchIcon = (match: boolean) => {
    return match ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-red-500" />
  }

  const getMatchScore = () => {
    const matches = Object.values(currentProspect.icpMatch).filter((item: any) => item.match).length
    const total = Object.values(currentProspect.icpMatch).length
    return Math.round((matches / total) * 100)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    alert("Link copied to clipboard!")
  }

  const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomUrlPath(e.target.value)
    setShareLink(`https://company.outreach.com/${e.target.value}`)
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">Outbound Outreach Engine</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-zinc-800 text-zinc-400 hover:text-white"
            onClick={() => setShowEditMode(!showEditMode)}
          >
            {showEditMode ? (
              <>
                <Save className="h-4 w-4 mr-1" /> Save
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-1" /> Edit
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-zinc-800 text-zinc-400 hover:text-white"
            onClick={() => setShowIntegrationsDialog(true)}
          >
            <Database className="h-4 w-4 mr-1" /> Integrations
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-zinc-800 text-zinc-400 hover:text-white"
            onClick={() => setShowShareDialog(true)}
          >
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <Badge variant="outline" className="bg-blue-500/20 text-blue-500 border-blue-500/20">
          <User className="h-3 w-3 mr-1" /> 1 of 25 Prospects
        </Badge>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-zinc-700 text-zinc-400 hover:text-white"
            onClick={() => setShowConfigureICPDialog(true)}
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Configure ICP
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-zinc-700 text-zinc-400 hover:text-white"
            onClick={() => setShowProspectListDialog(true)}
          >
            <Database className="h-3 w-3 mr-1" /> Connect Prospect List
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-5 gap-4 p-4 overflow-hidden">
        {/* Left column - Message composition */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Prospect header */}
          <Card
            className={`bg-zinc-900 border-zinc-800 ${showEditMode ? "border-2 border-dashed border-blue-500" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-zinc-700">
                  <AvatarImage src={currentProspect.avatar || "/placeholder.svg"} alt={currentProspect.name} />
                  <AvatarFallback className="bg-zinc-800 text-zinc-400">
                    {currentProspect.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{currentProspect.name}</h2>
                  <p className="text-sm text-zinc-400">
                    {currentProspect.title} at {currentProspect.company}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{currentProspect.email}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400 hover:text-white"
                          onClick={() => window.open(`https://${currentProspect.linkedin}`, "_blank")}
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View LinkedIn Profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-white">
                      <DropdownMenuItem className="hover:bg-zinc-800">
                        <FileText className="h-4 w-4 mr-2" /> View Full Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-zinc-800">
                        <Info className="h-4 w-4 mr-2" /> Add Note
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-zinc-800">
                        <AlertCircle className="h-4 w-4 mr-2" /> Report Issue
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message composer */}
          <Card
            className={`bg-zinc-900 border-zinc-800 flex-1 flex flex-col ${showEditMode ? "border-2 border-dashed border-blue-500" : ""}`}
          >
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>Compose Message</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Mail className="h-3 w-3 mr-1" /> Email
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Linkedin className="h-3 w-3 mr-1" /> LinkedIn
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-zinc-400">To:</span>
                <span className="text-xs">{currentProspect.email}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-zinc-400">Subject:</span>
                <Input
                  placeholder="Enter subject line..."
                  className="h-7 text-xs bg-zinc-800 border-zinc-700"
                  defaultValue={`Connecting with ${currentProspect.company}`}
                />
              </div>
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  placeholder="Start typing your personalized message..."
                  className="min-h-[200px] h-full resize-none bg-zinc-800 border-zinc-700 text-white"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">Templates:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs text-zinc-400 hover:text-white"
                    onClick={() => setShowNewTemplateDialog(true)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> New Template
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {templates.map((template) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${
                        selectedTemplate === template.id
                          ? "bg-white text-black"
                          : "border-zinc-700 text-zinc-400 hover:text-white"
                      }`}
                      onClick={() => applyTemplate(template.id)}
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Prospect research */}
        <div className="col-span-2 flex flex-col gap-4 overflow-auto">
          {/* ICP Match */}
          <Card
            className={`bg-zinc-900 border-zinc-800 ${showEditMode ? "border-2 border-dashed border-blue-500" : ""}`}
          >
            <CardHeader className="pb-2 pt-3 px-4">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>ICP Qualification</span>
                <Badge
                  variant="outline"
                  className={`${
                    getMatchScore() >= 80
                      ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/20"
                      : getMatchScore() >= 60
                        ? "bg-amber-500/20 text-amber-500 border-amber-500/20"
                        : "bg-red-500/20 text-red-500 border-red-500/20"
                  }`}
                >
                  {getMatchScore()}% Match
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <Building className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">Company Size</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{currentProspect.icpMatch.companySize.value}</span>
                    {getMatchIcon(currentProspect.icpMatch.companySize.match)}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">Industry</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{currentProspect.icpMatch.industry.value}</span>
                    {getMatchIcon(currentProspect.icpMatch.industry.match)}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">Product Type</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{currentProspect.icpMatch.productType.value}</span>
                    {getMatchIcon(currentProspect.icpMatch.productType.match)}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">Location</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{currentProspect.icpMatch.location.value}</span>
                    {getMatchIcon(currentProspect.icpMatch.location.match)}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">Department</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{currentProspect.icpMatch.department.value}</span>
                    {getMatchIcon(currentProspect.icpMatch.department.match)}
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-zinc-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-3 w-3 text-zinc-400" />
                    <span className="text-xs">Seniority</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{currentProspect.icpMatch.seniority?.value || "VP+"}</span>
                    {getMatchIcon(currentProspect.icpMatch.seniority?.match || true)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Research Tabs */}
          <Card
            className={`bg-zinc-900 border-zinc-800 flex-1 overflow-hidden flex flex-col ${showEditMode ? "border-2 border-dashed border-blue-500" : ""}`}
          >
            <Tabs defaultValue="activity" className="flex-1 flex flex-col">
              <CardHeader className="pb-0 pt-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Prospect Research</CardTitle>
                  <TabsList className="bg-zinc-800 border border-zinc-700 h-7">
                    <TabsTrigger value="activity" className="text-xs h-5 data-[state=active]:bg-zinc-700">
                      Activity
                    </TabsTrigger>
                    <TabsTrigger value="company" className="text-xs h-5 data-[state=active]:bg-zinc-700">
                      Company
                    </TabsTrigger>
                    <TabsTrigger value="connections" className="text-xs h-5 data-[state=active]:bg-zinc-700">
                      Connections
                    </TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex-1 overflow-auto">
                <TabsContent value="activity" className="p-4 h-full overflow-auto">
                  <div className="space-y-3">
                    <h3 className="text-xs font-medium text-zinc-400">Recent LinkedIn Activity</h3>
                    {currentProspect.recentActivity.map((activity: any, index: number) => (
                      <div key={index} className="bg-zinc-800 rounded-md p-3">
                        <div className="flex items-start gap-2">
                          {activity.type === "post" ? (
                            <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5" />
                          ) : activity.type === "article" ? (
                            <FileText className="h-4 w-4 text-emerald-500 mt-0.5" />
                          ) : (
                            <Share2 className="h-4 w-4 text-amber-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{activity.content}</p>
                            <p className="text-xs text-zinc-500 mt-1">{activity.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <h3 className="text-xs font-medium text-zinc-400 mt-4">Background</h3>
                    <div className="bg-zinc-800 rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm">{currentProspect.background.education}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm">
                          Previously at {currentProspect.background.previousCompanies.join(", ")}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xs font-medium text-zinc-400 mt-4">Notes</h3>
                    <div className="bg-zinc-800 rounded-md p-3">
                      <p className="text-sm">{currentProspect.notes}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="company" className="p-4 h-full overflow-auto">
                  <div className="space-y-3">
                    <h3 className="text-xs font-medium text-zinc-400">Company News</h3>
                    {currentProspect.companyNews.map((news: any, index: number) => (
                      <div key={index} className="bg-zinc-800 rounded-md p-3">
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm">{news.title}</p>
                            <p className="text-xs text-zinc-500 mt-1">{news.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <h3 className="text-xs font-medium text-zinc-400 mt-4">Company Details</h3>
                    <div className="bg-zinc-800 rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500">Industry:</span>
                        <span className="text-xs">B2B SaaS</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500">Founded:</span>
                        <span className="text-xs">2015</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500">Employees:</span>
                        <span className="text-xs">50-100</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500">Location:</span>
                        <span className="text-xs">San Francisco, CA</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500">Funding:</span>
                        <span className="text-xs">$50M Series C</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="connections" className="p-4 h-full overflow-auto">
                  <div className="space-y-3">
                    <h3 className="text-xs font-medium text-zinc-400">Shared Connections</h3>
                    {currentProspect.sharedConnections.map((connection: any, index: number) => (
                      <div key={index} className="bg-zinc-800 rounded-md p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-zinc-700 text-zinc-300 text-xs">
                              {connection.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{connection.name}</span>
                        </div>
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-500 border-blue-500/20">
                          Mutual
                        </Badge>
                      </div>
                    ))}

                    <h3 className="text-xs font-medium text-zinc-400 mt-4">Engagement History</h3>
                    <div className="bg-zinc-800 rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm">Downloaded whitepaper (2 months ago)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm">Attended webinar (3 months ago)</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Action bar */}
      <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-400 hover:text-white"
            onClick={handleSkip}
          >
            <SkipForward className="h-4 w-4 mr-1" /> Skip
          </Button>
          <Button
            variant={isStarred ? "default" : "outline"}
            size="sm"
            className={
              isStarred
                ? "bg-amber-500 text-black hover:bg-amber-600 border-amber-500"
                : "border-zinc-700 text-zinc-400 hover:text-white"
            }
            onClick={handleStar}
          >
            <Star className="h-4 w-4 mr-1" /> {isStarred ? "Starred" : "Star"}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-400 hover:text-white"
            onClick={() => alert("Adding to CRM...")}
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Add to CRM
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-400 hover:text-white"
            onClick={handleSendEmail}
          >
            <Mail className="h-4 w-4 mr-1" /> Email
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSendLinkedIn}
          >
            <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
          </Button>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Share outreach engine</DialogTitle>
            <DialogDescription className="text-zinc-400">Share this outreach engine with others</DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Add people</h3>
              <div className="flex gap-2">
                <Input placeholder="Email or name" className="flex-1 bg-zinc-800 border-zinc-700 text-white" />
                <Button className="bg-white text-black hover:bg-zinc-200">Add</Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-zinc-400" />
                <span className="font-medium">General access</span>
              </div>
              <Select defaultValue="restricted">
                <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select access" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="restricted">Restricted</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 bg-zinc-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-zinc-400" />
                  <span className="font-medium">Outreach engine link</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
              </div>
              <Input value={shareLink} readOnly className="bg-zinc-900 border-zinc-800 text-white" />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Custom URL</h3>
              <div className="flex items-center">
                <div className="bg-zinc-800 px-3 py-2 rounded-l-md border-r border-zinc-700 text-zinc-400">
                  company.outreach.com/
                </div>
                <Input
                  value={customUrlPath}
                  onChange={handleCustomUrlChange}
                  className="rounded-l-none bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400"
              onClick={() => setShowShareDialog(false)}
            >
              Cancel
            </Button>
            <Button className="bg-white text-black hover:bg-zinc-200" onClick={() => setShowShareDialog(false)}>
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Integrations Dialog */}
      <Dialog open={showIntegrationsDialog} onOpenChange={setShowIntegrationsDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Manage Integrations</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Connect your data sources to power your outreach engine
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Suggested Integrations</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Based on your outreach engine, we recommend connecting these data sources
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Gmail</h3>
                    <p className="text-xs text-zinc-500">Email</p>
                  </div>
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-black flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">LinkedIn</h3>
                    <p className="text-xs text-zinc-500">Social</p>
                  </div>
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-black flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                    <Building className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">HubSpot</h3>
                    <p className="text-xs text-zinc-500">CRM</p>
                  </div>
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-black flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Google Sheets</h3>
                    <p className="text-xs text-zinc-500">Data</p>
                  </div>
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white text-black flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Available Integrations</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                    <Database className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Salesforce</h3>
                    <p className="text-xs text-zinc-500">CRM</p>
                  </div>
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-zinc-700 text-zinc-400 flex items-center justify-center">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                    <User className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Apollo</h3>
                    <p className="text-xs text-zinc-500">Prospecting</p>
                  </div>
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-zinc-700 text-zinc-400 flex items-center justify-center">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400"
              onClick={() => setShowIntegrationsDialog(false)}
            >
              Cancel
            </Button>
            <Button className="bg-white text-black hover:bg-zinc-200" onClick={() => setShowIntegrationsDialog(false)}>
              Save Integrations
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Schedule Follow-up</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Schedule a follow-up message to {currentProspect.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-date">Date & Time</Label>
              <div className="flex gap-2">
                <Input
                  id="schedule-date"
                  type="date"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
                <Input
                  id="schedule-time"
                  type="time"
                  className="bg-zinc-800 border-zinc-700 text-white"
                  defaultValue="09:00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-type">Message Type</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-zinc-700 text-zinc-400 hover:text-white">
                  <Mail className="h-4 w-4 mr-1" /> Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-zinc-700 text-zinc-400 hover:text-white">
                  <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-template">Template</Label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    size="sm"
                    className="justify-start border-zinc-700 text-zinc-400 hover:text-white"
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-note">Note (Optional)</Label>
              <Textarea
                id="schedule-note"
                placeholder="Add a note about this follow-up..."
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400"
              onClick={() => setShowScheduleDialog(false)}
            >
              Cancel
            </Button>
            <Button className="bg-white text-black hover:bg-zinc-200" onClick={() => setShowScheduleDialog(false)}>
              <Calendar className="h-4 w-4 mr-1" /> Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Prospect List Dialog */}
      <Dialog open={showProspectListDialog} onOpenChange={setShowProspectListDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Connect Prospect List</DialogTitle>
            <DialogDescription className="text-zinc-400">Choose a source for your prospect list</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 cursor-pointer">
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Google Sheets</h3>
                <p className="text-xs text-zinc-500">Connect to a Google Sheet with your prospect data</p>
              </div>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-white">
                Connect
              </Button>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 cursor-pointer">
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Apollo</h3>
                <p className="text-xs text-zinc-500">Import prospects from Apollo</p>
              </div>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-white">
                Connect
              </Button>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border border-zinc-800 bg-zinc-900 hover:border-zinc-700 cursor-pointer">
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">
                <FileText className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Upload CSV</h3>
                <p className="text-xs text-zinc-500">Upload a CSV file with your prospect data</p>
              </div>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-white">
                Upload
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400"
              onClick={() => setShowProspectListDialog(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Template Dialog */}
      <Dialog open={showNewTemplateDialog} onOpenChange={setShowNewTemplateDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a reusable message template for your outreach
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="E.g., Follow-up after demo"
                className="bg-zinc-800 border-zinc-700 text-white"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-content">Template Content</Label>
              <Textarea
                id="template-content"
                placeholder="Write your template message here. Use {{firstName}} for personalization."
                className="min-h-[200px] bg-zinc-800 border-zinc-700 text-white"
                value={newTemplateContent}
                onChange={(e) => setNewTemplateContent(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Available Variables</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-400">
                  {"{{firstName}}"}
                </Badge>
                <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-400">
                  {"{{lastName}}"}
                </Badge>
                <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-400">
                  {"{{company}}"}
                </Badge>
                <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-400">
                  {"{{title}}"}
                </Badge>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400"
              onClick={() => setShowNewTemplateDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-white text-black hover:bg-zinc-200"
              onClick={() => {
                // In a real app, this would save the template
                alert("Template saved!")
                setShowNewTemplateDialog(false)
              }}
            >
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configure ICP Dialog */}
      <Dialog open={showConfigureICPDialog} onOpenChange={setShowConfigureICPDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Configure Ideal Customer Profile</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Define the criteria that qualify a prospect as your ideal customer
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="icp-company-size">Company Size</Label>
              <Select defaultValue="50-100">
                <SelectTrigger id="icp-company-size" className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="50-100">50-100 employees</SelectItem>
                  <SelectItem value="101-500">101-500 employees</SelectItem>
                  <SelectItem value="501+">501+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icp-industry">Industry</Label>
              <Select defaultValue="B2B">
                <SelectTrigger id="icp-industry" className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="B2B">B2B</SelectItem>
                  <SelectItem value="B2C">B2C</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Agency">Agency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icp-product-type">Product Type</Label>
              <Select defaultValue="SaaS">
                <SelectTrigger id="icp-product-type" className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Marketplace">Marketplace</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icp-location">Location</Label>
              <Select defaultValue="US">
                <SelectTrigger id="icp-location" className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="EU">Europe</SelectItem>
                  <SelectItem value="APAC">Asia Pacific</SelectItem>
                  <SelectItem value="LATAM">Latin America</SelectItem>
                  <SelectItem value="Global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icp-department">Department</Label>
              <Select defaultValue="Marketing">
                <SelectTrigger id="icp-department" className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icp-seniority">Seniority</Label>
              <Select defaultValue="VP+">
                <SelectTrigger id="icp-seniority" className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select seniority" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="C-Level">C-Level</SelectItem>
                  <SelectItem value="VP+">VP+</SelectItem>
                  <SelectItem value="Director">Director</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Individual">Individual Contributor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-zinc-700 text-zinc-400"
              onClick={() => setShowConfigureICPDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-white text-black hover:bg-zinc-200"
              onClick={() => {
                // In a real app, this would save the ICP configuration
                alert("ICP configuration saved!")
                setShowConfigureICPDialog(false)
              }}
            >
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
