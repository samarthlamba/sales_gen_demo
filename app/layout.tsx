import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lumari",
  description: "Generate enterprise applications with natural language",
    generator: 'Lumari.io'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-screen">
          <SidebarTrigger className="absolute top-3 left-4 z-10 h-9 w-9" />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
