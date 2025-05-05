import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit, ExternalLink } from "lucide-react"

export default function RecentApps() {
  const recentApps = [
    {
      id: "app1",
      name: "Sales Pipeline Dashboard",
      description: "Visualize sales pipeline metrics from Salesforce",
      lastEdited: "2 days ago",
      image: "/sales-pipeline-overview.png",
    },
    {
      id: "app2",
      name: "Marketing Campaign Tracker",
      description: "Track marketing campaign performance across channels",
      lastEdited: "1 week ago",
      image: "/marketing-dashboard-overview.png",
    },
    {
      id: "app3",
      name: "Customer Success Health Score",
      description: "Monitor customer health scores and engagement metrics",
      lastEdited: "3 days ago",
      image: "/customer-health-engagement-overview.png",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentApps.map((app) => (
        <Card key={app.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={app.image || "/placeholder.svg"}
              alt={app.name}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle>{app.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Last edited: {app.lastEdited}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{app.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/edit/${app.id}`}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/apps/${app.id}`}>
                <ExternalLink className="mr-2 h-4 w-4" /> Open
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Card className="flex flex-col items-center justify-center p-6 border-dashed">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium">Create New Application</h3>
          <p className="text-sm text-muted-foreground">Generate a new enterprise application from scratch</p>
          <Button asChild>
            <Link href="/generate">
              Start Building <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
