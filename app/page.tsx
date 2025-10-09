"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { CodeExecutor } from "@/components/code-executor"
import { AccessibilityInfo } from "@/components/accessibility-info"
import { Play, Zap, ChevronDown, Github } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

/**
 * Main page component for the job application joke demo.
 * Displays hero section and interactive code execution simulator.
 *
 * @returns {JSX.Element} The rendered page component
 */
export default function Page(): JSX.Element {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [showDemo, setShowDemo] = useState<boolean>(false)
  const [hasLostSanity, setHasLostSanity] = useState<boolean>(false)
  const mainContentRef = useRef<HTMLDivElement>(null)

  /**
   * Handles starting the demo animation.
   */
  const handleStart = (): void => {
    setShowDemo(true)
    setIsRunning(true)
  }

  /**
   * Handles resetting the demo to initial state.
   */
  const handleReset = (): void => {
    setShowDemo(false)
    setIsRunning(false)
    setHasLostSanity(false)
  }

  useEffect(() => {
    if (showDemo && mainContentRef.current) {
      mainContentRef.current.focus()
    }
  }, [showDemo])

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <div className="fixed right-4 top-4 z-40">
        <Button
          size="sm"
          variant="outline"
          className="gap-2 font-mono bg-transparent"
          asChild
          aria-label="View source code on GitHub (opens in new tab)"
        >
          <a href="https://github.com/Ari-S-123/infinite-apps" target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">View Source</span>
          </a>
        </Button>
      </div>

      {!showDemo ? (
        <main id="main-content" className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Zap className="h-4 w-4" aria-hidden="true" />
              <span className="font-mono">Developer Humor Simulator</span>
            </div>

            <h1 className="mb-6 font-mono text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              The Infinite Job
              <br />
              <span className="text-primary">Application Loop</span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground text-balance sm:text-xl">
              Experience the absurdity of modern tech recruiting. Watch as a developer attempts to apply for jobs with
              impossible requirements—one rejection at a time.
            </p>

            <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                variant="destructive"
                onClick={handleStart}
                className="gap-2 font-mono text-base"
                aria-label="Start the job application simulation"
              >
                <Play className="h-5 w-5" aria-hidden="true" />
                Begin Your Suffering
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("explanation")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="font-mono text-base"
              >
                Explain the Joke
                <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
                <div className="flex gap-1.5" role="presentation" aria-label="Window controls">
                  <div className="h-3 w-3 rounded-full bg-destructive" aria-label="Close" />
                  <div className="h-3 w-3 rounded-full bg-chart-3" aria-label="Minimize" />
                  <div className="h-3 w-3 rounded-full bg-chart-5" aria-label="Maximize" />
                </div>
                <span className="ml-2 font-mono text-xs text-muted-foreground">job-application.ts</span>
              </div>
              <div className="p-6">
                <pre className="overflow-x-auto text-left font-mono text-sm leading-relaxed">
                  <code>
                    <span className="text-code-keyword">const</span>{" "}
                    <span className="text-code-function">applyToJob</span> ={" "}
                    <span className="text-muted-foreground">(</span>
                    <span className="text-foreground">linkedInUrl</span>
                    <span className="text-muted-foreground">:</span> <span className="text-code-keyword">string</span>
                    <span className="text-muted-foreground">)</span>
                    <span className="text-muted-foreground">:</span> <span className="text-code-keyword">void</span>{" "}
                    <span className="text-muted-foreground">=&gt; {"{"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-code-keyword">throw new</span>{" "}
                    <span className="text-code-function">Error</span>
                    <span className="text-muted-foreground">([</span>
                    {"\n"}
                    {"    "}
                    <span className="text-code-string">"You don't have enough experience!"</span>
                    <span className="text-muted-foreground">,</span>
                    {"\n"}
                    {"    "}
                    <span className="text-code-string">"Your salary expectations are too high"</span>
                    <span className="text-muted-foreground">,</span>
                    {"\n"}
                    {"    "}
                    <span className="text-code-string">"This position has been filled..."</span>
                    {"\n"}
                    {"  "}
                    <span className="text-muted-foreground">][Math.floor(Math.random() * 3)])</span>
                    {"\n"}
                    <span className="text-muted-foreground">{"}"}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main id="main-content" ref={mainContentRef} tabIndex={-1} className="focus:outline-none">
          <CodeExecutor
            isRunning={isRunning}
            onToggleRunning={() => setIsRunning(!isRunning)}
            onReset={handleReset}
            onSanityLost={() => setHasLostSanity(true)}
            hasLostSanity={hasLostSanity}
          />
        </main>
      )}

      <section
        id="explanation"
        className="border-t border-border bg-card px-4 py-16"
        aria-labelledby="explanation-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="explanation-heading" className="mb-8 text-center font-mono text-3xl font-bold">
            Why This Is Funny (and Sad)
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-3 font-mono text-xl font-semibold text-primary">Impossible Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                "6 years experience with 2-year-old tool" satirizes job postings that demand more years of experience
                than a technology has existed. It's mathematically impossible, yet appears in real job listings.
              </p>
            </article>

            <article className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-3 font-mono text-xl font-semibold text-destructive">The Infinite Loop</h3>
              <p className="text-muted-foreground leading-relaxed">
                Using{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm">Number.POSITIVE_INFINITY</code>{" "}
                as the loop limit represents the endless, soul-crushing cycle of job applications that many developers
                experience.
              </p>
            </article>

            <article className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-3 font-mono text-xl font-semibold text-chart-3">Random Rejections</h3>
              <p className="text-muted-foreground leading-relaxed">
                The function always throws an error with random rejection reasons, highlighting how arbitrary and
                frustrating the hiring process can feel. No matter what you do, rejection seems inevitable.
              </p>
            </article>

            <article className="rounded-lg border border-border bg-background p-6">
              <h3 className="mb-3 font-mono text-xl font-semibold text-chart-5">Ghost Jobs</h3>
              <p className="text-muted-foreground leading-relaxed">
                "This position has been filled (but we'll keep posting it...)" mocks companies that leave job postings
                up indefinitely, wasting applicants' time and creating false hope in the job market.
              </p>
            </article>
          </div>

          <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-muted-foreground leading-relaxed">
              This satirical code resonates because it captures real frustrations in the tech hiring process. While
              exaggerated for comedic effect, many developers have experienced these exact scenarios in their job
              searches.
            </p>
          </div>

          <div className="mt-12">
            <AccessibilityInfo />
          </div>

          {showDemo && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="outline" className="gap-2 font-mono text-base bg-transparent" asChild>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  Apply to More Jobs
                </a>
              </Button>
              <Button size="lg" variant="ghost" onClick={handleReset} className="font-mono text-base">
                Start Over
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
