"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  CheckCircle,
  Pencil,
  Save,
  Database,
  ArrowUp,
  ArrowDown,
  Check,
  Sparkles,
  AlertTriangle,
  AlertOctagon,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  ArrowRight,
  Minus,
  TrendingDown,
  AlertCircle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Rename the component to CustomerSuccessDashboard
export default function CustomerSuccessDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(7)
  const [editMode, setEditMode] = useState(false)
  const [showIntegrationsDialog, setShowIntegrationsDialog] = useState(false)
  const [dialogState, setDialogState] = useState<{
    type: string
    open: boolean
    customer: string
  }>({
    type: "",
    open: false,
    customer: "",
  })

  const [accountFilter, setAccountFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [insightGenerated, setInsightGenerated] = useState(false)
  const [meetingProcessed, setMeetingProcessed] = useState(false)
  const [alertSent, setAlertSent] = useState(false)

  // Change the sidebar to a dialog when clicking on a table row
  // First, add a new state for the customer dialog
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false)

  // Calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage

  const customers = [
    {
      id: 1,
      customer: "Acme Corp",
      plan: "Enterprise",
      riskScore: 72,
      status: "At Risk",
      lastActivity: "2025-04-15",
      csm: "Alex Johnson",
      history: [
        { date: "2025-04-10", event: "Quarterly Business Review" },
        { date: "2025-04-15", event: "Feature usage declined by 15%" },
      ],
      recommendation: "Schedule urgent check-in to discuss declining usage",
      usageStatus: "Declining",
      notes: "Key stakeholder left company last month",
      usageData: {
        trend: "declining",
        currentMonth: 65,
        previousMonth: 82,
        keyFeatures: {
          feature1: 45,
          feature2: 30,
          feature3: 10,
        },
      },
      meetings: [
        {
          date: "2025-04-10",
          type: "QBR",
          sentiment: "negative",
          keywords: ["frustrated", "difficult", "considering alternatives"],
        },
        {
          date: "2025-03-15",
          type: "Check-in",
          sentiment: "neutral",
          keywords: ["improvements", "roadmap", "timeline"],
        },
      ],
    },
    {
      id: 2,
      customer: "Globex Inc",
      plan: "Growth",
      riskScore: 92,
      status: "Healthy",
      lastActivity: "2025-04-30",
      csm: "Sarah Miller",
      history: [
        { date: "2024-04-01", event: "Usage increased by 20%" },
        { date: "2024-04-02", event: "Added 5 new users" },
      ],
      recommendation: "Upsell opportunity - approaching plan limits",
      usageStatus: "Increasing",
      notes: "Champion actively promoting product internally",
      usageData: {
        trend: "increasing",
        currentMonth: 88,
        previousMonth: 72,
        keyFeatures: {
          feature1: 85,
          feature2: 75,
          feature3: 60,
        },
      },
      meetings: [
        {
          date: "2024-04-05",
          type: "Training",
          sentiment: "positive",
          keywords: ["helpful", "intuitive", "expanding usage"],
        },
        { date: "2024-03-20", type: "Check-in", sentiment: "positive", keywords: ["satisfied", "value", "recommend"] },
      ],
    },
    {
      id: 3,
      customer: "Initech",
      plan: "Enterprise",
      riskScore: 45,
      status: "Critical",
      lastActivity: "2025-05-05",
      csm: "Michael Chen",
      history: [
        { date: "2024-04-05", event: "Escalated support ticket" },
        { date: "2024-04-12", event: "Usage dropped by 30%" },
      ],
      recommendation: "Immediate executive outreach needed",
      usageStatus: "Severely Declining",
      notes: "Mentioned competitor in last call",
      usageData: {
        trend: "severely declining",
        currentMonth: 35,
        previousMonth: 65,
        keyFeatures: {
          feature1: 20,
          feature2: 15,
          feature3: 5,
        },
      },
      meetings: [
        {
          date: "2024-04-12",
          type: "Escalation",
          sentiment: "negative",
          keywords: ["disappointed", "not working", "competitor", "cancellation"],
        },
        {
          date: "2024-03-25",
          type: "QBR",
          sentiment: "negative",
          keywords: ["issues", "bugs", "timeline", "frustrated"],
        },
      ],
    },
    {
      id: 4,
      customer: "Umbrella Corp",
      plan: "Enterprise",
      riskScore: 68,
      status: "At Risk",
      lastActivity: "2025-05-22",
      csm: "Emily Wong",
      history: [
        { date: "2024-04-08", event: "Support tickets increased by 40%" },
        { date: "2024-04-20", event: "Missed scheduled check-in" },
      ],
      recommendation: "Technical review session needed",
      usageStatus: "Stagnant",
      notes: "Integration issues affecting adoption",
      usageData: {
        trend: "stagnant",
        currentMonth: 62,
        previousMonth: 65,
        keyFeatures: {
          feature1: 55,
          feature2: 40,
          feature3: 25,
        },
      },
      meetings: [
        {
          date: "2024-04-08",
          type: "Technical",
          sentiment: "neutral",
          keywords: ["issues", "integration", "timeline", "roadmap"],
        },
        {
          date: "2024-03-10",
          type: "Check-in",
          sentiment: "neutral",
          keywords: ["working", "progress", "improvements"],
        },
      ],
    },
    {
      id: 5,
      customer: "Stark Industries",
      plan: "Growth",
      riskScore: 95,
      status: "Healthy",
      lastActivity: "2025-04-28",
      csm: "James Wilson",
      history: [
        { date: "2024-04-01", event: "Expanded to new department" },
        { date: "2024-04-02", event: "Usage increased by 25%" },
      ],
      recommendation: "Expansion opportunity - schedule executive briefing",
      usageStatus: "Increasing",
      notes: "Strong executive sponsorship",
      usageData: {
        trend: "increasing",
        currentMonth: 90,
        previousMonth: 75,
        keyFeatures: {
          feature1: 85,
          feature2: 80,
          feature3: 75,
        },
      },
      meetings: [
        {
          date: "2024-04-15",
          type: "Executive",
          sentiment: "positive",
          keywords: ["expansion", "value", "strategic", "partnership"],
        },
        {
          date: "2024-03-22",
          type: "QBR",
          sentiment: "positive",
          keywords: ["success", "adoption", "roi", "expanding"],
        },
      ],
    },
    {
      id: 6,
      customer: "Wayne Enterprises",
      plan: "Enterprise",
      riskScore: 78,
      status: "Stable",
      lastActivity: "2025-05-10",
      csm: "Lisa Park",
      history: [
        { date: "2024-04-07", event: "New use case implementation" },
        { date: "2024-04-14", event: "Usage stable month-over-month" },
      ],
      recommendation: "Identify expansion opportunities in marketing team",
      usageStatus: "Stable",
      notes: "Potential for cross-sell to marketing department",
      usageData: {
        trend: "stable",
        currentMonth: 75,
        previousMonth: 73,
        keyFeatures: {
          feature1: 70,
          feature2: 65,
          feature3: 45,
        },
      },
      meetings: [
        { date: "2024-04-07", type: "Training", sentiment: "positive", keywords: ["helpful", "new team", "adoption"] },
        { date: "2024-03-18", type: "Check-in", sentiment: "neutral", keywords: ["steady", "consistent", "reliable"] },
      ],
    },
    {
      id: 7,
      customer: "Cyberdyne Systems",
      plan: "Enterprise",
      riskScore: 52,
      status: "At Risk",
      lastActivity: "2025-05-25",
      csm: "Robert Taylor",
      history: [{ date: "2024-04-12", event: "Key champion left company" }],
      recommendation: "Establish relationship with new stakeholders",
      usageStatus: "Declining",
      notes: "Organizational changes affecting adoption",
      usageData: {
        trend: "declining",
        currentMonth: 55,
        previousMonth: 68,
        keyFeatures: {
          feature1: 50,
          feature2: 35,
          feature3: 20,
        },
      },
      meetings: [
        {
          date: "2024-04-12",
          type: "Transition",
          sentiment: "neutral",
          keywords: ["changes", "new contact", "onboarding"],
        },
        { date: "2024-03-05", type: "QBR", sentiment: "positive", keywords: ["progress", "adoption", "value"] },
      ],
    },
    {
      id: 8,
      customer: "Oscorp Industries",
      plan: "Enterprise",
      riskScore: 61,
      status: "At Risk",
      lastActivity: "2025-06-01",
      csm: "David Kim",
      history: [{ date: "2024-04-15", event: "Budget review mentioned" }],
      recommendation: "Prepare ROI analysis for renewal discussion",
      usageStatus: "Stagnant",
      notes: "Budget constraints mentioned in last call",
      usageData: {
        trend: "stagnant",
        currentMonth: 60,
        previousMonth: 62,
        keyFeatures: {
          feature1: 55,
          feature2: 45,
          feature3: 30,
        },
      },
      meetings: [
        {
          date: "2024-04-15",
          type: "Budget",
          sentiment: "negative",
          keywords: ["cost", "budget", "roi", "justification"],
        },
        { date: "2024-03-10", type: "Check-in", sentiment: "neutral", keywords: ["usage", "adoption", "training"] },
      ],
    },
    {
      id: 9,
      customer: "Massive Dynamic",
      plan: "Growth",
      riskScore: 85,
      status: "Healthy",
      lastActivity: "2025-05-18",
      csm: "Rachel Green",
      history: [
        { date: "2024-04-08", event: "Positive feedback received" },
        { date: "2024-04-16", event: "Usage increased by 15%" },
      ],
      recommendation: "Collect case study and testimonial",
      usageStatus: "Increasing",
      notes: "Strong advocate, potential reference customer",
      usageData: {
        trend: "increasing",
        currentMonth: 82,
        previousMonth: 70,
        keyFeatures: {
          feature1: 75,
          feature2: 70,
          feature3: 65,
        },
      },
      meetings: [
        {
          date: "2024-04-08",
          type: "QBR",
          sentiment: "positive",
          keywords: ["success", "value", "expanding", "recommend"],
        },
        { date: "2024-03-15", type: "Check-in", sentiment: "positive", keywords: ["happy", "adoption", "useful"] },
      ],
    },
    {
      id: 10,
      customer: "Soylent Corp",
      plan: "Enterprise",
      riskScore: 88,
      status: "Healthy",
      lastActivity: "2025-04-25",
      csm: "Thomas Anderson",
      history: [
        { date: "2024-04-01", event: "Renewed contract early" },
        { date: "2024-04-02", event: "Added premium support" },
      ],
      recommendation: "Explore additional use cases with R&D team",
      usageStatus: "Stable",
      notes: "Long-term strategic customer",
      usageData: {
        trend: "stable",
        currentMonth: 85,
        previousMonth: 83,
        keyFeatures: {
          feature1: 80,
          feature2: 75,
          feature3: 70,
        },
      },
      meetings: [
        {
          date: "2024-04-01",
          type: "Renewal",
          sentiment: "positive",
          keywords: ["partnership", "strategic", "long-term", "satisfied"],
        },
        { date: "2024-03-20", type: "Executive", sentiment: "positive", keywords: ["value", "roi", "expansion"] },
      ],
    },
    {
      id: 11,
      customer: "Aperture Science",
      plan: "Growth",
      riskScore: 58,
      status: "At Risk",
      lastActivity: "2025-05-30",
      csm: "Chell Johnson",
      history: [{ date: "2024-04-14", event: "Support tickets increased" }],
      recommendation: "Technical review needed to address issues",
      usageStatus: "Declining",
      notes: "Experiencing technical difficulties",
      usageData: {
        trend: "declining",
        currentMonth: 58,
        previousMonth: 70,
        keyFeatures: {
          feature1: 50,
          feature2: 40,
          feature3: 25,
        },
      },
      meetings: [
        {
          date: "2024-04-14",
          type: "Support",
          sentiment: "negative",
          keywords: ["issues", "bugs", "not working", "frustrated"],
        },
        { date: "2024-03-10", type: "Check-in", sentiment: "neutral", keywords: ["progress", "learning", "adoption"] },
      ],
    },
    {
      id: 12,
      customer: "Tyrell Corporation",
      plan: "Growth",
      riskScore: 75,
      status: "Stable",
      lastActivity: "2025-05-12",
      csm: "Roy Batty",
      history: [
        { date: "2024-04-06", event: "Completed advanced training" },
        { date: "2024-04-13", event: "Usage stable month-over-month" },
      ],
      recommendation: "Introduce new features from latest release",
      usageStatus: "Stable",
      notes: "Interested in advanced analytics features",
      usageData: {
        trend: "stable",
        currentMonth: 72,
        previousMonth: 70,
        keyFeatures: {
          feature1: 65,
          feature2: 60,
          feature3: 50,
        },
      },
      meetings: [
        {
          date: "2024-04-06",
          type: "Training",
          sentiment: "positive",
          keywords: ["helpful", "learning", "advanced features"],
        },
        { date: "2024-03-15", type: "Check-in", sentiment: "neutral", keywords: ["steady", "consistent", "reliable"] },
      ],
    },
    {
      id: 13,
      customer: "Weyland-Yutani",
      plan: "Enterprise",
      riskScore: 90,
      status: "Healthy",
      lastActivity: "2025-04-22",
      csm: "Ellen Ripley",
      history: [
        { date: "2024-04-01", event: "Expanded to international offices" },
        { date: "2024-04-02", event: "Usage increased by 30%" },
      ],
      recommendation: "Schedule executive briefing for global expansion",
      usageStatus: "Increasing",
      notes: "Global expansion in progress",
      usageData: {
        trend: "increasing",
        currentMonth: 88,
        previousMonth: 70,
        keyFeatures: {
          feature1: 85,
          feature2: 80,
          feature3: 75,
        },
      },
      meetings: [
        {
          date: "2024-04-01",
          type: "Executive",
          sentiment: "positive",
          keywords: ["expansion", "global", "strategic", "growth"],
        },
        { date: "2024-03-15", type: "QBR", sentiment: "positive", keywords: ["success", "value", "roi", "adoption"] },
      ],
    },
    {
      id: 14,
      customer: "Hanso Foundation",
      plan: "Growth",
      riskScore: 65,
      status: "At Risk",
      lastActivity: "2025-06-05",
      csm: "Benjamin Linus",
      history: [{ date: "2024-04-16", event: "Missed scheduled training" }],
      recommendation: "Re-engage with training program",
      usageStatus: "Stagnant",
      notes: "Adoption challenges due to complex workflows",
      usageData: {
        trend: "stagnant",
        currentMonth: 62,
        previousMonth: 65,
        keyFeatures: {
          feature1: 55,
          feature2: 45,
          feature3: 30,
        },
      },
      meetings: [
        { date: "2024-04-16", type: "Missed", sentiment: "negative", keywords: ["no-show", "reschedule", "busy"] },
        {
          date: "2024-03-20",
          type: "Check-in",
          sentiment: "neutral",
          keywords: ["challenges", "complex", "learning curve"],
        },
      ],
    },
  ]

  // Integration options
  const integrations = [
    { id: "notion", name: "Notion", category: "Docs", selected: true },
    { id: "gong", name: "Gong", category: "Meeting Intelligence", selected: true },
    { id: "salesforce", name: "Salesforce", category: "CRM", selected: true },
    { id: "hubspot", name: "HubSpot", category: "CRM", selected: false },
    { id: "slack", name: "Slack", category: "Communication", selected: true },
    { id: "zendesk", name: "PostgreSQL", category: "Data", selected: false },
    { id: "intercom", name: "Intercom", category: "Support", selected: false },
    { id: "segment", name: "Segment", category: "Data", selected: false },
  ]

  // Filter customers based on selected filters
  const filteredCustomers = customers.filter((customer) => {
    // Account filter
    if (accountFilter !== "all" && customer.customer.toLowerCase() !== accountFilter.toLowerCase()) {
      return false
    }

    // Risk filter
    if (riskFilter === "high" && customer.riskScore >= 70) {
      return false
    }
    if (riskFilter === "medium" && (customer.riskScore < 60 || customer.riskScore > 80)) {
      return false
    }
    if (riskFilter === "low" && customer.riskScore <= 60) {
      return false
    }

    // Type filter
    if (typeFilter !== "all" && customer.plan.toLowerCase() !== typeFilter.toLowerCase()) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && customer.status !== statusFilter) {
      return false
    }

    // Search query
    if (searchQuery && !customer.customer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  // Update the pagination to use filteredCustomers instead of customers
  const currentCustomers = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage)

  // Calculate summary metrics
  const atRiskCount = customers.filter((r) => r.status === "At Risk").length
  const criticalCount = customers.filter((r) => r.status === "Critical").length
  const healthyCount = customers.filter((r) => r.status === "Healthy").length
  const stableCount = customers.filter((r) => r.status === "Stable").length

  // Calculate average risk score
  const avgRiskScore = Math.round(customers.reduce((sum, customer) => sum + customer.riskScore, 0) / customers.length)

  // Calculate month-over-month change in risk score (mock data)
  const previousMonthAvgRisk = avgRiskScore * 1.08 // 8% improvement
  const riskChange = ((previousMonthAvgRisk - avgRiskScore) / previousMonthAvgRisk) * 100

  // Calculate NRR (Net Revenue Retention) - mock data
  const nrr = 105 // 105%
  const previousNRR = 102 // 102%
  const nrrChange = ((nrr - previousNRR) / previousNRR) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case "At Risk":
        return "bg-amber-500/20 text-amber-500 border-amber-500/20"
      case "Critical":
        return "bg-red-500/20 text-red-500 border-red-500/20"
      case "Healthy":
        return "bg-emerald-500/20 text-emerald-500 border-emerald-500/20"
      case "Stable":
        return "bg-blue-500/20 text-blue-500 border-blue-500/20"
      default:
        return "bg-zinc-500/20 text-zinc-500 border-zinc-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "At Risk":
        return <AlertTriangle className="h-3 w-3" />
      case "Critical":
        return <AlertOctagon className="h-3 w-3" />
      case "Healthy":
        return <CheckCircle className="h-3 w-3" />
      case "Stable":
        return <ThumbsUp className="h-3 w-3" />
      default:
        return null
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-emerald-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  const getUsageStatusColor = (status: string) => {
    switch (status) {
      case "Increasing":
        return "text-emerald-500"
      case "Stable":
        return "text-blue-500"
      case "Stagnant":
        return "text-amber-500"
      case "Declining":
        return "text-orange-500"
      case "Severely Declining":
        return "text-red-500"
      default:
        return "text-zinc-500"
    }
  }

  const getUsageStatusIcon = (status: string) => {
    switch (status) {
      case "Increasing":
        return <TrendingUp className="h-3 w-3" />
      case "Stable":
        return <ArrowRight className="h-3 w-3" />
      case "Stagnant":
        return <Minus className="h-3 w-3" />
      case "Declining":
        return <TrendingDown className="h-3 w-3" />
      case "Severely Declining":
        return <AlertCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Modify the handleRowClick function to open a dialog instead of setting sidebar state
  const handleRowClick = (customer: any) => {
    setSelectedCustomer(customer)
    setCustomerDialogOpen(true)
  }

  // Replace the closeSidebar function with closeCustomerDialog
  const closeCustomerDialog = () => {
    setCustomerDialogOpen(false)
    // Keep the selected customer in state
  }

  const openDialog = (type: string, customer: string) => {
    setDialogState({
      type,
      open: true,
      customer,
    })
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  // Component wrapper that adds edit controls when in edit mode
  const EditableComponent = ({
    children,
    title,
    className = "",
    allowHeaderEdit = true,
  }: {
    children: React.ReactNode
    title: string
    className?: string
    allowHeaderEdit?: boolean
  }) => {
    return (
      <div className={`relative group ${editMode ? "edit-border cursor-move" : ""} ${className}`}>
        {editMode && (
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 edit-handle">
            <div className="bg-zinc-800 rounded-md p-1 shadow-md flex items-center">
              <div className="flex items-center justify-center h-5 w-5 rounded-sm bg-zinc-700 mr-1">
                <Pencil className="h-3 w-3 text-zinc-400" />
              </div>
              <span className="text-xs text-zinc-400 mx-1">{title}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-1 hover:bg-zinc-700">
                <ChevronDown className="h-3 w-3 text-zinc-400" />
              </Button>
            </div>
          </div>
        )}
        {children}
      </div>
    )
  }

  const handleGenerateInsight = () => {
    openDialog("generate-insight", selectedCustomer ? selectedCustomer.customer : "selected customer")
  }

  const closeDialog = () => {
    if (dialogState.type === "generate-insight") {
      setInsightGenerated(true)

      // Add a new message to show the insight was generated
      setTimeout(() => {
        setInsightGenerated(false)
      }, 3000)
    } else if (dialogState.type === "process-meeting") {
      setMeetingProcessed(true)

      // Update the selected customer's status if it exists
      if (selectedCustomer) {
        const updatedCustomers = customers.map((r) =>
          r.id === selectedCustomer.id ? { ...r, usageStatus: "Analyzed" } : r,
        )
        // This won't persist since we're not using setCustomers, but it's a mock
      }

      setTimeout(() => {
        setMeetingProcessed(false)
      }, 3000)
    } else if (dialogState.type === "send-alert") {
      setAlertSent(true)

      // Update the selected customer's status if it exists
      if (selectedCustomer) {
        const updatedCustomers = customers.map((r) => (r.id === selectedCustomer.id ? { ...r, status: "Engaged" } : r))
        // This won't persist since we're not using setCustomers, but it's a mock
      }

      setTimeout(() => {
        setAlertSent(false)
      }, 3000)
    }

    setDialogState({
      ...dialogState,
      open: false,
    })
  }

  return (
    <div className={`p-4 min-h-full flex flex-col ${editMode ? "edit-mode" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customer Success Dashboard</h1>

        <div className="flex items-center gap-2">
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
          <Button
            variant="outline"
            size="default"
            className="border-zinc-700 text-white hover:border-white"
            onClick={() => setShowIntegrationsDialog(true)}
          >
            <Database className="h-4 w-4 mr-2" /> Integrations
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-zinc-800 text-zinc-400 hover:text-white">
            <RefreshCw className="h-3 w-3 mr-1" /> Refresh
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-zinc-800 text-zinc-400 hover:text-white">
            <Download className="h-3 w-3 mr-1" /> Export
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <EditableComponent title="Customer Health Score" className="h-full">
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <div className="h-1 bg-blue-500"></div>
            <CardHeader className="pb-2">
              <CardTitle
                className={`text-sm font-medium text-zinc-400 ${editMode ? "border border-dashed border-zinc-700 rounded p-1" : ""}`}
              >
                Customer Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">{avgRiskScore}/100</div>
                <div className={`flex items-center text-xs ${riskChange >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {riskChange >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(riskChange).toFixed(1)}%
                </div>
              </div>
              <p className="text-xs text-zinc-500">Month over month</p>
            </CardContent>
          </Card>
        </EditableComponent>

        <EditableComponent title="Net Revenue Retention" className="h-full">
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <div className="h-1 bg-emerald-500"></div>
            <CardHeader className="pb-2">
              <CardTitle
                className={`text-sm font-medium text-zinc-400 ${editMode ? "border border-dashed border-zinc-700 rounded p-1" : ""}`}
              >
                Net Revenue Retention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">{nrr}%</div>
                <div className={`flex items-center text-xs ${nrrChange >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {nrrChange >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(nrrChange).toFixed(1)}%
                </div>
              </div>
              <p className="text-xs text-zinc-500">Month over month</p>
            </CardContent>
          </Card>
        </EditableComponent>

        <EditableComponent title="At-Risk Customers" className="h-full">
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <div className="h-1 bg-amber-500"></div>
            <CardHeader className="pb-2">
              <CardTitle
                className={`text-sm font-medium text-zinc-400 ${editMode ? "border border-dashed border-zinc-700 rounded p-1" : ""}`}
              >
                At-Risk Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">{atRiskCount + criticalCount}</div>
                <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/20">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Action Needed
                </Badge>
              </div>
              <p className="text-xs text-zinc-500">
                {(((atRiskCount + criticalCount) / customers.length) * 100).toFixed(0)}% of total customers
              </p>
            </CardContent>
          </Card>
        </EditableComponent>

        <EditableComponent title="Healthy Customers" className="h-full">
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <div className="h-1 bg-emerald-500"></div>
            <CardHeader className="pb-2">
              <CardTitle
                className={`text-sm font-medium text-zinc-400 ${editMode ? "border border-dashed border-zinc-700 rounded p-1" : ""}`}
              >
                Healthy Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">{healthyCount}</div>
                <Badge variant="outline" className="bg-emerald-500/20 text-emerald-500 border-emerald-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" /> Growth Opportunity
                </Badge>
              </div>
              <p className="text-xs text-zinc-500">
                {((healthyCount / customers.length) * 100).toFixed(0)}% of total customers
              </p>
            </CardContent>
          </Card>
        </EditableComponent>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <EditableComponent title="Customer Health Distribution">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle
                className={`text-sm font-medium ${editMode ? "border border-dashed border-zinc-700 rounded p-1" : ""}`}
              >
                Customer Health Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-4">
              <div className="w-full h-[140px] flex items-end justify-around">
                <div className="flex flex-col items-center">
                  <div className="h-[100px] w-16 bg-red-500/20 rounded-t-md"></div>
                  <p className="text-xs mt-2 text-zinc-400">Critical</p>
                  <p className="text-xs font-medium">{criticalCount}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-[70px] w-16 bg-amber-500/20 rounded-t-md"></div>
                  <p className="text-xs mt-2 text-zinc-400">At Risk</p>
                  <p className="text-xs font-medium">{atRiskCount}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-[50px] w-16 bg-blue-500/20 rounded-t-md"></div>
                  <p className="text-xs mt-2 text-zinc-400">Stable</p>
                  <p className="text-xs font-medium">{stableCount}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-[40px] w-16 bg-emerald-500/20 rounded-t-md"></div>
                  <p className="text-xs mt-2 text-zinc-400">Healthy</p>
                  <p className="text-xs font-medium">{healthyCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </EditableComponent>

        <EditableComponent title="Feature Usage Trends">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle
                className={`text-sm font-medium ${editMode ? "border border-dashed border-zinc-700 rounded p-1" : ""}`}
              >
                Feature Usage Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-4">
              <div className="w-full h-[140px] flex items-center justify-center">
                <div className="relative w-[140px] h-[140px] rounded-full border-8 border-zinc-800 flex items-center justify-center">
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent"
                    style={{ transform: "rotate(45deg)" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-t-transparent border-r-transparent border-b-amber-500 border-l-amber-500"
                    style={{ transform: "rotate(45deg)" }}
                  ></div>
                  <div className="text-xs font-medium">Feature Usage</div>
                </div>
                <div className="ml-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    <span className="text-xs">Core Features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
                    <span className="text-xs">Advanced Features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                    <span className="text-xs">New Features</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </EditableComponent>
      </div>

      {/* Main content area with table and filters - Modified to accommodate side panel */}
      <div className="flex-1">
        <EditableComponent title="Customers Table" className="h-full">
          <div className="bg-zinc-900 border border-zinc-800 rounded-md overflow-hidden w-full h-full flex flex-col">
            {/* Filters section - now part of the table component */}
            <div className="p-3 border-b border-zinc-800 flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Search customers..."
                  className="h-8 w-[200px] bg-zinc-900 border-zinc-800 text-white text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-1">
                <Select value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger className="h-8 w-[130px] bg-zinc-800 border-zinc-700 text-white text-xs">
                    <SelectValue placeholder="Account" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="all">All Accounts</SelectItem>
                    {customers
                      .map((r) => r.customer)
                      .filter((v, i, a) => a.indexOf(v) === i)
                      .map((customer) => (
                        <SelectItem key={customer} value={customer}>
                          {customer}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="h-8 w-[130px] bg-zinc-800 border-zinc-700 text-white text-xs">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="high">High Risk (0-60)</SelectItem>
                    <SelectItem value="medium">Medium Risk (60-80)</SelectItem>
                    <SelectItem value="low">Low Risk (80-100)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-8 w-[130px] bg-zinc-800 border-zinc-700 text-white text-xs">
                    <SelectValue placeholder="Plan Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-8 w-[130px] bg-zinc-800 border-zinc-700 text-white text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="At Risk">At Risk</SelectItem>
                    <SelectItem value="Stable">Stable</SelectItem>
                    <SelectItem value="Healthy">Healthy</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs border-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Filter className="h-3 w-3 mr-1" /> More Filters
                </Button>
              </div>

              <div className="ml-auto flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs bg-zinc-800 border-zinc-700 text-white"
                  onClick={handleGenerateInsight}
                >
                  Generate Insight
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs bg-zinc-800 border-zinc-700 text-white"
                  onClick={() =>
                    openDialog("process-meeting", selectedCustomer ? selectedCustomer.customer : "selected customer")
                  }
                >
                  Process Meeting
                </Button>
                <Button
                  size="sm"
                  className="h-8 text-xs bg-white text-black hover:bg-zinc-200"
                  onClick={() =>
                    openDialog("send-alert", selectedCustomer ? selectedCustomer.customer : "selected customer")
                  }
                >
                  Configure Alert
                </Button>
              </div>
            </div>

            {/* Table section */}
            <div className="overflow-auto" style={{ maxHeight: "calc(100vh - 400px)" }}>
              <Table>
                <TableHeader className="bg-zinc-800/50">
                  <TableRow>
                    <TableHead
                      className={`text-zinc-400 text-xs font-medium ${editMode ? "border border-dashed border-zinc-700" : ""}`}
                    >
                      CUSTOMER
                    </TableHead>
                    <TableHead
                      className={`text-zinc-400 text-xs font-medium ${editMode ? "border border-dashed border-zinc-700" : ""}`}
                    >
                      PLAN
                    </TableHead>
                    <TableHead
                      className={`text-zinc-400 text-xs font-medium ${editMode ? "border border-dashed border-zinc-700" : ""}`}
                    >
                      RISK SCORE
                    </TableHead>
                    <TableHead
                      className={`text-zinc-400 text-xs font-medium ${editMode ? "border border-dashed border-zinc-700" : ""}`}
                    >
                      STATUS
                    </TableHead>
                    <TableHead
                      className={`text-zinc-400 text-xs font-medium ${editMode ? "border border-dashed border-zinc-700" : ""}`}
                    >
                      LAST ACTIVITY
                    </TableHead>
                    <TableHead
                      className={`text-zinc-400 text-xs font-medium ${editMode ? "border border-dashed border-zinc-700" : ""}`}
                    >
                      CSM
                    </TableHead>
                    <TableHead
                      className={`text-zinc-400 text-xs font-medium ${editMode ? "border border-dashed border-zinc-700" : ""}`}
                    >
                      USAGE TREND
                    </TableHead>
                    <TableHead
                      className={`text-zinc-400 text-xs font-medium ${editMode ? "border border-dashed border-zinc-700" : ""}`}
                    >
                      MEETING SENTIMENT
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className={`cursor-pointer hover:bg-zinc-800/50 ${selectedCustomer?.id === customer.id ? "bg-zinc-800/70" : ""}`}
                      onClick={() => handleRowClick(customer)}
                    >
                      <TableCell className="font-medium">{customer.customer}</TableCell>
                      <TableCell>{customer.plan}</TableCell>
                      <TableCell>
                        <div className={`font-medium ${getRiskColor(customer.riskScore)}`}>{customer.riskScore}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`flex w-fit items-center gap-1 ${getStatusColor(customer.status)}`}
                        >
                          {getStatusIcon(customer.status)}
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(customer.lastActivity)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-zinc-700 flex items-center justify-center text-xs">
                            {customer.csm.charAt(0)}
                          </div>
                          <span>{customer.csm}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 ${getUsageStatusColor(customer.usageStatus)}`}>
                          {getUsageStatusIcon(customer.usageStatus)}
                          <span>{customer.usageStatus}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {customer.meetings && customer.meetings.length > 0 ? (
                            <Badge
                              variant="outline"
                              className={`${
                                customer.meetings[0].sentiment === "positive"
                                  ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/20"
                                  : customer.meetings[0].sentiment === "neutral"
                                    ? "bg-blue-500/20 text-blue-500 border-blue-500/20"
                                    : "bg-red-500/20 text-red-500 border-red-500/20"
                              }`}
                            >
                              {customer.meetings[0].sentiment === "positive" ? (
                                <ThumbsUp className="h-3 w-3 mr-1" />
                              ) : customer.meetings[0].sentiment === "neutral" ? (
                                <Minus className="h-3 w-3 mr-1" />
                              ) : (
                                <ThumbsDown className="h-3 w-3 mr-1" />
                              )}
                              {customer.meetings[0].sentiment.charAt(0).toUpperCase() +
                                customer.meetings[0].sentiment.slice(1)}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-zinc-500/20 text-zinc-500 border-zinc-500/20">
                              No Data
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between p-2 border-t border-zinc-800">
              <div className="text-xs text-zinc-500">
                Showing {filteredCustomers.length > 0 ? indexOfFirstRow + 1 : 0}-
                {Math.min(indexOfLastRow, filteredCustomers.length)} of {filteredCustomers.length} customers
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 text-xs border-zinc-800"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={`h-7 w-7 p-0 text-xs ${
                      currentPage === page ? "bg-white text-black" : "border-zinc-800 text-zinc-400"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 text-xs border-zinc-800"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </EditableComponent>
      </div>

      {/* Customer Detail Dialog */}
      <Dialog open={customerDialogOpen} onOpenChange={setCustomerDialogOpen}>
        {selectedCustomer && (
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">{selectedCustomer.customer}</DialogTitle>
                <Badge
                  variant="outline"
                  className={`flex w-fit items-center gap-1 ${getStatusColor(selectedCustomer.status)}`}
                >
                  {getStatusIcon(selectedCustomer.status)}
                  {selectedCustomer.status}
                </Badge>
              </div>
              <DialogDescription className="text-zinc-400">
                {selectedCustomer.plan} Plan • CSM: {selectedCustomer.csm}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-6">
                {/* Risk Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-zinc-400">Risk Score</h4>
                    <span className={`text-xl font-bold ${getRiskColor(selectedCustomer.riskScore)}`}>
                      {selectedCustomer.riskScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-1">
                    <div
                      className={`h-2 rounded-full ${
                        selectedCustomer.riskScore >= 80
                          ? "bg-emerald-500"
                          : selectedCustomer.riskScore >= 60
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${selectedCustomer.riskScore}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Last Activity</span>
                    <span className="text-xs">{formatDate(selectedCustomer.lastActivity)}</span>
                  </div>
                </div>

                {/* Usage Data */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-2">Usage Trends</h4>
                  <div className="bg-zinc-800 rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-zinc-500">Current Month</span>
                      <span className={`text-xs font-medium ${getUsageStatusColor(selectedCustomer.usageStatus)}`}>
                        {selectedCustomer.usageData.currentMonth}%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-1.5 mb-3">
                      <div
                        className={`h-1.5 rounded-full ${
                          selectedCustomer.usageData.trend === "increasing" ||
                          selectedCustomer.usageData.trend === "stable"
                            ? "bg-emerald-500"
                            : selectedCustomer.usageData.trend === "stagnant"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${selectedCustomer.usageData.currentMonth}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-zinc-500">Previous Month</span>
                      <span className="text-xs">{selectedCustomer.usageData.previousMonth}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-1.5 mb-3 opacity-50">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${selectedCustomer.usageData.previousMonth}%` }}
                      ></div>
                    </div>
                    <div className="pt-2 border-t border-zinc-700">
                      <h5 className="text-xs font-medium mb-2">Key Feature Usage</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Report Generation</span>
                            <span>{selectedCustomer.usageData.keyFeatures.feature1}%</span>
                          </div>
                          <div className="w-full bg-zinc-700 rounded-full h-1">
                            <div
                              className="bg-emerald-500 h-1 rounded-full"
                              style={{ width: `${selectedCustomer.usageData.keyFeatures.feature1}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Contract Review</span>
                            <span>{selectedCustomer.usageData.keyFeatures.feature2}%</span>
                          </div>
                          <div className="w-full bg-zinc-700 rounded-full h-1">
                            <div
                              className="bg-blue-500 h-1 rounded-full"
                              style={{ width: `${selectedCustomer.usageData.keyFeatures.feature2}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Forecasting</span>
                            <span>{selectedCustomer.usageData.keyFeatures.feature3}%</span>
                          </div>
                          <div className="w-full bg-zinc-700 rounded-full h-1">
                            <div
                              className="bg-amber-500 h-1 rounded-full"
                              style={{ width: `${selectedCustomer.usageData.keyFeatures.feature3}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Customer History */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-2">Recent History</h4>
                  <div className="space-y-2">
                    {selectedCustomer.history.map((item, index) => (
                      <div key={index} className="bg-zinc-800 rounded-md p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">{item.event}</span>
                          <span className="text-xs text-zinc-500">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Meeting Intelligence */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-2">Meeting Intelligence</h4>
                  {selectedCustomer.meetings && selectedCustomer.meetings.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCustomer.meetings.map((meeting, idx) => (
                        <div key={idx} className="bg-zinc-800 rounded-md p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  meeting.sentiment === "positive"
                                    ? "bg-emerald-500"
                                    : meeting.sentiment === "neutral"
                                      ? "bg-blue-500"
                                      : "bg-red-500"
                                }`}
                              ></div>
                              <span className="text-xs font-medium">{meeting.type} Meeting</span>
                            </div>
                            <span className="text-xs text-zinc-500">{meeting.date}</span>
                          </div>
                          <div className="pt-2 border-t border-zinc-700">
                            <div className="flex flex-wrap gap-1 mt-1">
                              {meeting.keywords.map((keyword, kidx) => (
                                <span
                                  key={kidx}
                                  className={`text-xs px-1.5 py-0.5 rounded-sm ${
                                    keyword === "frustrated" ||
                                    keyword === "difficult" ||
                                    keyword === "considering alternatives" ||
                                    keyword === "disappointed" ||
                                    keyword === "not working" ||
                                    keyword === "competitor" ||
                                    keyword === "cancellation" ||
                                    keyword === "issues" ||
                                    keyword === "bugs"
                                      ? "bg-red-500/20 text-red-500"
                                      : keyword === "improvements" ||
                                          keyword === "roadmap" ||
                                          keyword === "timeline" ||
                                          keyword === "integration" ||
                                          keyword === "working" ||
                                          keyword === "progress"
                                        ? "bg-blue-500/20 text-blue-500"
                                        : "bg-emerald-500/20 text-emerald-500"
                                  }`}
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-zinc-800 rounded-md p-3 text-center">
                      <p className="text-xs text-zinc-500">No meeting data available</p>
                    </div>
                  )}
                </div>

                {/* AI Recommendation */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-2">AI Recommendation</h4>
                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-md p-3">
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                        <Sparkles className="h-3 w-3 text-blue-500" />
                      </div>
                      <p className="text-xs">{selectedCustomer.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-2">Notes</h4>
                  <div className="bg-zinc-800 rounded-md p-3">
                    <p className="text-xs">{selectedCustomer.notes}</p>
                  </div>
                </div>

                {/* Account Details */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-2">Account Details</h4>
                  <div className="bg-zinc-800 rounded-md p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-zinc-500">Plan Type:</span>
                      <span className="text-xs">{selectedCustomer.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-zinc-500">CSM:</span>
                      <span className="text-xs">{selectedCustomer.csm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-zinc-500">Onboarding Date:</span>
                      <span className="text-xs">Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-zinc-500">Renewal Date:</span>
                      <span className="text-xs">Jan 15, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center border-t border-zinc-800 pt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700"
                  onClick={() => openDialog("process-meeting", selectedCustomer.customer)}
                >
                  Process Meeting
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700"
                  onClick={() => openDialog("send-alert", selectedCustomer.customer)}
                >
                  Configure Alert
                </Button>
              </div>
              <Button className="bg-white text-black hover:bg-zinc-200" size="sm" onClick={handleGenerateInsight}>
                Generate Insight
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Integrations Dialog */}
      <Dialog open={showIntegrationsDialog} onOpenChange={setShowIntegrationsDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Integrations</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Connect your data sources to power your customer success dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Suggested Integrations</h3>
              <p className="text-xs text-zinc-400 mb-3">
                Based on your dashboard, we recommend connecting these data sources
              </p>
              <div className="grid grid-cols-2 gap-3">
                {integrations
                  .filter((i) => i.selected)
                  .map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-zinc-700 flex items-center justify-center">
                        <Database className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{integration.name}</h3>
                        <p className="text-xs text-zinc-500">{integration.category}</p>
                      </div>
                      <div className="flex-shrink-0 h-5 w-5 rounded-md flex items-center justify-center bg-white text-black">
                        <Check className="h-3 w-3" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Available Integrations</h3>
              <div className="grid grid-cols-2 gap-3">
                {integrations
                  .filter((i) => !i.selected)
                  .map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center">
                        <Database className="h-4 w-4 text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{integration.name}</h3>
                        <p className="text-xs text-zinc-500">{integration.category}</p>
                      </div>
                      <div className="flex-shrink-0 h-5 w-5 rounded-md flex items-center justify-center bg-zinc-800 border border-zinc-700"></div>
                    </div>
                  ))}
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

      {/* Other Dialogs */}
      <Dialog open={dialogState.open} onOpenChange={(open) => !open && closeDialog()}>
        {dialogState.type === "generate-insight" && (
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle>Generate Customer Insight</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Generate AI-powered insights for {dialogState.customer || "the selected customer"}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="insight-type">Insight Type</Label>
                <Select defaultValue="risk">
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select insight type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="risk">Churn Risk Analysis</SelectItem>
                    <SelectItem value="usage">Usage Pattern Analysis</SelectItem>
                    <SelectItem value="sentiment">Meeting Sentiment Analysis</SelectItem>
                    <SelectItem value="expansion">Expansion Opportunity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-sources">Data Sources</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-usage" defaultChecked />
                    <Label htmlFor="include-usage">Include usage data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-meetings" defaultChecked />
                    <Label htmlFor="include-meetings">Include meeting transcripts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-support" />
                    <Label htmlFor="include-support">Include support tickets</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insight-note">Additional Context (Optional)</Label>
                <Textarea
                  id="insight-note"
                  placeholder="Add any specific areas to focus on..."
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-zinc-700 text-zinc-400" onClick={closeDialog}>
                Cancel
              </Button>
              <Button className="bg-white text-black hover:bg-zinc-200" onClick={closeDialog}>
                Generate Insight
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {dialogState.type === "process-meeting" && (
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle>Process Meeting Transcript</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Analyze meeting transcript for {dialogState.customer || "the selected customer"}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="meeting-source">Meeting Source</Label>
                <Select defaultValue="gong">
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select meeting source" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="gong">Gong</SelectItem>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="teams">Microsoft Teams</SelectItem>
                    <SelectItem value="manual">Manual Upload</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meeting-type">Meeting Type</Label>
                <Select defaultValue="qbr">
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="qbr">Quarterly Business Review</SelectItem>
                    <SelectItem value="checkin">Regular Check-in</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="support">Support Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Analysis Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="detect-sentiment" defaultChecked />
                    <Label htmlFor="detect-sentiment">Detect sentiment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="extract-keywords" defaultChecked />
                    <Label htmlFor="extract-keywords">Extract key topics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flag-churn" defaultChecked />
                    <Label htmlFor="flag-churn">Flag churn language</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="update-crm" defaultChecked />
                    <Label htmlFor="update-crm">Update CRM with findings</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-zinc-700 text-zinc-400" onClick={closeDialog}>
                Cancel
              </Button>
              <Button className="bg-white text-black hover:bg-zinc-200" onClick={closeDialog}>
                Process Transcript
              </Button>
            </DialogFooter>
          </DialogContent>
        )}

        {dialogState.type === "send-alert" && (
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle>Configure Customer Risk Alert</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Set up automated alerts about {dialogState.customer || "the selected customer"} for stakeholders.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="alert-type">Alert Type</Label>
                <Select defaultValue="risk">
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="risk">Churn Risk</SelectItem>
                    <SelectItem value="usage">Usage Decline</SelectItem>
                    <SelectItem value="sentiment">Negative Sentiment</SelectItem>
                    <SelectItem value="opportunity">Expansion Opportunity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-urgency">Urgency Level</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="low">Low - FYI Only</SelectItem>
                    <SelectItem value="medium">Medium - Action Recommended</SelectItem>
                    <SelectItem value="high">High - Immediate Action Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Recipients</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-csm" defaultChecked />
                    <Label htmlFor="notify-csm">Customer Success Manager</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-sales" />
                    <Label htmlFor="notify-sales">Account Executive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-support" />
                    <Label htmlFor="notify-support">Support Team</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-exec" />
                    <Label htmlFor="notify-exec">Executive Team</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-message">Alert Message</Label>
                <Textarea
                  id="alert-message"
                  placeholder="Add details about the alert..."
                  className="bg-zinc-800 border-zinc-700 text-white"
                  defaultValue={`Risk alert for ${dialogState.customer}: Customer showing signs of potential churn based on declining usage patterns and negative sentiment in recent meetings. Recommend immediate outreach.`}
                />
              </div>
              <div className="space-y-2">
                <Label>Notification Channels</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-slack" defaultChecked />
                    <Label htmlFor="send-slack">Send to Slack</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-email" defaultChecked />
                    <Label htmlFor="send-email">Send Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="create-task" defaultChecked />
                    <Label htmlFor="create-task">Create Task in CRM</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="border-zinc-700 text-zinc-400" onClick={closeDialog}>
                Cancel
              </Button>
              <Button className="bg-white text-black hover:bg-zinc-200" onClick={closeDialog}>
                Configure Alert
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {insightGenerated && (
        <div className="fixed bottom-4 right-4 bg-zinc-800 border border-zinc-700 rounded-md p-3 shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">Insight Generated Successfully</p>
            <p className="text-xs text-zinc-400">Customer insights have been added to the profile</p>
          </div>
        </div>
      )}

      {meetingProcessed && (
        <div className="fixed bottom-4 right-4 bg-zinc-800 border border-zinc-700 rounded-md p-3 shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">Meeting Processed</p>
            <p className="text-xs text-zinc-400">Transcript analyzed and insights extracted</p>
          </div>
        </div>
      )}

      {alertSent && (
        <div className="fixed bottom-4 right-4 bg-zinc-800 border border-zinc-700 rounded-md p-3 shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
          <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium">Alert Configured</p>
            <p className="text-xs text-zinc-400">Automated alerts have been set up</p>
          </div>
        </div>
      )}
    </div>
  )
}
