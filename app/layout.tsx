import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
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
      <body className="font-sans">
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
      </body>
    </html>
  )
}
