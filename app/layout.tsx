import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "The Infinite Job Application Loop - Developer Humor Simulator",
  description:
    "Experience the absurdity of modern tech recruiting through an interactive code simulation. Watch as impossible job requirements meet endless rejections in this satirical developer humor demo.",
  generator: "v0.app",
  keywords: ["developer humor", "job application", "tech recruiting satire", "coding joke", "programming humor"],
  authors: [{ name: "v0" }],
  openGraph: {
    title: "The Infinite Job Application Loop",
    description: "A satirical simulation of the modern tech job application process",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans relative">
        <div className="absolute right-2 top-2 z-50 isolate pointer-events-auto sm:right-4 sm:top-4">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 font-mono bg-transparent shadow-lg"
            asChild
            aria-label="View source code on GitHub (opens in new tab)"
          >
            <a href="https://github.com/Ari-S-123/infinite-apps" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">View Source</span>
            </a>
          </Button>
        </div>

        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <div
                  className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"
                  role="status"
                >
                  <span className="sr-only">Loading application...</span>
                </div>
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
