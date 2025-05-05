"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Loader2, Sparkles } from "lucide-react"
import IntegrationSelector from "@/components/integration-selector"
import AppPreview from "@/components/app-preview"

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedApp, setGeneratedApp] = useState<boolean>(false)

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedApp(true)
    }, 3000)
  }

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate New Application</h1>
        <p className="text-muted-foreground mt-2">
          Describe your application in natural language and we'll build it for you
        </p>
      </div>

      <Tabs defaultValue="prompt">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prompt">1. Describe Your App</TabsTrigger>
          <TabsTrigger value="integrations" disabled={!generatedApp}>
            2. Configure Integrations
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedApp}>
            3. Preview & Edit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="space-y-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>What do you want to build?</CardTitle>
              <CardDescription>
                Describe the application you need in detail. Focus on the purpose, data sources, and key features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Example: I need a dashboard that shows sales pipeline metrics from Salesforce, marketing engagement from HubSpot, and support tickets from Zendesk. I want to filter by account and date range."
                className="min-h-[200px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Use Template</Button>
              <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate App <Sparkles className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {generatedApp && (
            <div className="flex justify-end">
              <Button>
                Next: Configure Integrations <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 py-4">
          <IntegrationSelector />

          <div className="flex justify-end">
            <Button>
              Next: Preview & Edit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6 py-4">
          <AppPreview />
        </TabsContent>
      </Tabs>
    </div>
  )
}
