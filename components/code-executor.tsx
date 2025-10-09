"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw, FastForward } from "lucide-react"
import { StatsDashboard } from "@/components/stats-dashboard"
import { ConsoleOutput } from "@/components/console-output"
import { JobPosting } from "@/components/job-posting"
import type { JSX } from "react" // Declared JSX import

type ExecutionState = {
  currentLine: number
  applicationsSubmitted: number
  rejections: number
  timeWasted: number
  sanityLevel: number
}

type RejectionMessage = {
  id: number
  message: string
  timestamp: number
}

type CodeExecutorProps = {
  isRunning: boolean
  onToggleRunning: () => void
  onReset: () => void
  onSanityLost: () => void
  hasLostSanity: boolean
}

const REJECTION_REASONS = [
  "You don't have enough experience!",
  "Your salary expectations are too high (we offer exposure though...)",
  "This position has been filled (but we'll keep posting it...)",
  "You're overqualified (translation: we can't afford you)",
  "We decided to promote internally (our CEO's nephew)",
  "You don't fit our culture (you asked about work-life balance)",
  "We need someone who can hit the ground running (we have no training budget)",
  "Your GitHub contributions aren't impressive enough (you have a life outside coding)",
  "We're looking for someone more passionate (willing to work unpaid overtime)",
  "You lack leadership experience (for this individual contributor role)",
  "We went with a candidate with more relevant experience (they accepted less money)",
  "Your tech stack doesn't align with ours (we use a framework from 2008)",
  "We need someone with better communication skills (you asked too many smart questions)",
  "You're not a culture fit (you didn't laugh at the interviewer's jokes)",
  "We're restructuring the team (the position never existed)",
  "Your references didn't respond (we never actually contacted them)",
  "We need someone more senior (but we're only paying junior rates)",
  "You don't have enough startup experience (you expect reasonable hours)",
  "We're looking for a self-starter (there's no management or direction)",
  "Your portfolio doesn't showcase enough variety (you specialized in something useful)",
  "We decided to go in a different direction (we have no idea what we're doing)",
  "You lack the required certifications (that have nothing to do with the actual job)",
  "We need someone with more initiative (you asked what the job actually involves)",
  "Your salary history doesn't align (we want to lowball you based on your previous underpayment)",
  "We're looking for someone more flexible (available 24/7 with no boundaries)",
  "You don't have enough experience with agile (you've done actual agile, not our chaos)",
  "We need someone who can handle pressure (our deadlines are always impossible)",
  "Your technical assessment was incomplete (we gave you 4 hours of work for a 1-hour test)",
]

const JOB_POSTINGS = [
  {
    title: "Junior Developer",
    requirements: ["6 years experience with 2-year-old tool"],
    salary: "Competitive (below market)",
    url: "https://linkedin.com/jobs/junior-dev-456",
  },
  {
    title: "Entry-Level Senior Architect",
    requirements: ["10+ years React Hooks experience", "Must be 22 years old"],
    salary: "Unpaid internship with equity",
    url: "https://linkedin.com/jobs/senior-architect-789",
  },
  {
    title: "Full-Stack Unicorn",
    requirements: ["Expert in 47 frameworks", "Available 24/7", "Works for passion, not money"],
    salary: "We're like a family here",
    url: "https://linkedin.com/jobs/fullstack-unicorn-123",
  },
  {
    title: "Rockstar Ninja Developer",
    requirements: ["Time travel experience preferred", "Must know languages that don't exist yet"],
    salary: "Exposure to cutting-edge tech",
    url: "https://linkedin.com/jobs/rockstar-ninja-234",
  },
  {
    title: "Frontend Developer (Entry Level)",
    requirements: ["15 years JavaScript", "PhD in Computer Science", "Published author"],
    salary: "$45k (it's a great learning opportunity!)",
    url: "https://linkedin.com/jobs/frontend-entry-345",
  },
  {
    title: "Backend Engineer",
    requirements: ["Must have created your own programming language", "Nobel Prize preferred"],
    salary: "Competitive (we won't tell you the number)",
    url: "https://linkedin.com/jobs/backend-engineer-567",
  },
  {
    title: "DevOps Guru",
    requirements: ["Invented Kubernetes", "Can survive on 2 hours of sleep", "No personal life"],
    salary: "Pizza Fridays + ping pong table",
    url: "https://linkedin.com/jobs/devops-guru-678",
  },
  {
    title: "Software Engineer Intern",
    requirements: ["10 years production experience", "Led teams of 50+", "Shipped 100+ products"],
    salary: "Unpaid (college credit available)",
    url: "https://linkedin.com/jobs/intern-890",
  },
  {
    title: "React Developer",
    requirements: ["Created React", "Friends with Dan Abramov", "Can read minds"],
    salary: "Market rate (for 2010)",
    url: "https://linkedin.com/jobs/react-dev-901",
  },
  {
    title: "AI/ML Engineer",
    requirements: ["Invented neural networks", "Turing Award winner", "Knows the future"],
    salary: "Equity in our pre-idea startup",
    url: "https://linkedin.com/jobs/ai-ml-012",
  },
  {
    title: "Mobile Developer",
    requirements: ["Built iOS before iPhone existed", "Android expert since 1995"],
    salary: "Exposure + unlimited coffee",
    url: "https://linkedin.com/jobs/mobile-dev-234",
  },
  {
    title: "Full-Stack Developer",
    requirements: ["Frontend, backend, DevOps, design, PM, QA, and sales", "One person team"],
    salary: "One salary for six jobs!",
    url: "https://linkedin.com/jobs/fullstack-dev-345",
  },
  {
    title: "Blockchain Developer",
    requirements: ["Invented Bitcoin", "Can explain blockchain to our CEO", "Works for crypto only"],
    salary: "0.0001 ShitCoin per year",
    url: "https://linkedin.com/jobs/blockchain-dev-456",
  },
  {
    title: "Security Engineer",
    requirements: ["Never been hacked", "Can hack anything", "Ethical (but also unethical when needed)"],
    salary: "We'll discuss after 8 rounds of interviews",
    url: "https://linkedin.com/jobs/security-eng-567",
  },
  {
    title: "Data Scientist",
    requirements: ["PhD in Statistics, Math, CS, and Psychology", "Can predict lottery numbers"],
    salary: "Below junior developer rate",
    url: "https://linkedin.com/jobs/data-scientist-678",
  },
  {
    title: "WordPress Developer",
    requirements: ["20 years WordPress experience", "Built the internet", "Fluent in 47 languages"],
    salary: "$15/hour (remote from anywhere!)",
    url: "https://linkedin.com/jobs/wordpress-dev-789",
  },
  {
    title: "Game Developer",
    requirements: ["Shipped AAA titles solo", "Works 100 hour weeks happily", "Passion is payment"],
    salary: "Revenue share (we have no revenue)",
    url: "https://linkedin.com/jobs/game-dev-890",
  },
  {
    title: "QA Engineer",
    requirements: ["Finds bugs that don't exist", "Never files bug reports", "Always says code is perfect"],
    salary: "Whatever's left in the budget",
    url: "https://linkedin.com/jobs/qa-engineer-901",
  },
  {
    title: "Technical Writer",
    requirements: ["CS degree + English degree + Design degree", "Writes code better than developers"],
    salary: "Exposure to technology",
    url: "https://linkedin.com/jobs/tech-writer-012",
  },
  {
    title: "Solutions Architect",
    requirements: ["Solved world hunger", "Architected the universe", "Can draw perfect diagrams"],
    salary: "Negotiable (downward only)",
    url: "https://linkedin.com/jobs/solutions-arch-123",
  },
]

/**
 * Main code executor component that orchestrates the job application simulation.
 * Manages execution state, animations, and coordinates child components.
 *
 * @param {CodeExecutorProps} props - Component props
 * @returns {JSX.Element} The rendered code executor component
 */
export function CodeExecutor({
  isRunning,
  onToggleRunning,
  onReset,
  onSanityLost,
  hasLostSanity,
}: CodeExecutorProps): JSX.Element {
  const [state, setState] = useState<ExecutionState>({
    currentLine: 0,
    applicationsSubmitted: 0,
    rejections: 0,
    timeWasted: 0,
    sanityLevel: 100,
  })
  const [rejectionMessages, setRejectionMessages] = useState<RejectionMessage[]>([])
  const [currentJobIndex, setCurrentJobIndex] = useState<number>(0)
  const [speed, setSpeed] = useState<number>(1)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const sanityBreakdownTriggered = useRef<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (state.sanityLevel === 0 && !sanityBreakdownTriggered.current) {
      sanityBreakdownTriggered.current = true
      onSanityLost()
    }
  }, [state.sanityLevel, onSanityLost])

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setState((prev) => {
          const newApplications = prev.applicationsSubmitted + 1
          const newRejections = prev.rejections + 1
          const newSanity = Math.max(0, prev.sanityLevel - 0.5)
          const newTime = prev.timeWasted + 1

          return {
            currentLine: (prev.currentLine + 1) % 8,
            applicationsSubmitted: newApplications,
            rejections: newRejections,
            timeWasted: newTime,
            sanityLevel: newSanity,
          }
        })

        let randomReason: string
        if (state.sanityLevel <= 0) {
          const insaneMessages = [
            "MAYBE I SHOULD JUST BECOME A FARMER",
            "WHO NEEDS A JOB ANYWAY? I'LL LIVE IN THE WOODS",
            "IS THIS REAL? AM I REAL? ARE JOBS REAL?",
            "I'VE FORGOTTEN WHAT SUNLIGHT LOOKS LIKE",
            "MY DEGREE IS JUST EXPENSIVE TOILET PAPER",
            "MAYBE THE REAL JOB WAS THE REJECTIONS WE GOT ALONG THE WAY",
            "I'M STARTING TO SYMPATHIZE WITH THE UNABOMBER",
            "BOOTCAMP GRADUATES WITH 3 MONTHS EXPERIENCE ARE GETTING HIRED BUT NOT ME",
            "I COULD HAVE BEEN A DOCTOR. OR A LAWYER. OR LITERALLY ANYTHING ELSE",
            "THE VOID IS CALLING AND IT PAYS BETTER THAN THESE JOBS",
          ]
          randomReason = insaneMessages[Math.floor(Math.random() * insaneMessages.length)]
        } else if (state.sanityLevel <= 25) {
          const desperateMessages = [
            "Please... just one interview...",
            "I'll work for free! Just give me a chance!",
            "My cat is judging me for being unemployed",
            "Mom keeps asking when I'll get a 'real job'",
            "I've applied to the same company 47 times",
            "Maybe I should lie about my experience?",
            "I'm qualified but they want a unicorn",
            "Another automated rejection email...",
          ]
          randomReason = desperateMessages[Math.floor(Math.random() * desperateMessages.length)]
        } else {
          randomReason = REJECTION_REASONS[Math.floor(Math.random() * REJECTION_REASONS.length)]
        }

        setRejectionMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: randomReason,
            timestamp: Date.now(),
          },
        ])

        setCurrentJobIndex((prev) => (prev + 1) % JOB_POSTINGS.length)
      }, 1000 / speed)
      intervalRef.current = interval
      return () => clearInterval(interval)
    }
  }, [isRunning, speed])

  useEffect(() => {
    if (hasLostSanity && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      firstElement?.focus()

      const handleTabKey = (e: KeyboardEvent): void => {
        if (e.key !== "Tab") return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      const handleEscapeKey = (e: KeyboardEvent): void => {
        if (e.key === "Escape") {
          handleReset()
        }
      }

      document.addEventListener("keydown", handleTabKey)
      document.addEventListener("keydown", handleEscapeKey)

      return () => {
        document.removeEventListener("keydown", handleTabKey)
        document.removeEventListener("keydown", handleEscapeKey)
      }
    }
  }, [hasLostSanity])

  /**
   * Handles fast-forward functionality by increasing animation speed.
   */
  const handleFastForward = (): void => {
    setSpeed((prev) => Math.min(prev * 2, 8))
  }

  /**
   * Handles reset functionality by clearing all state.
   */
  const handleReset = (): void => {
    setState({
      currentLine: 0,
      applicationsSubmitted: 0,
      rejections: 0,
      timeWasted: 0,
      sanityLevel: 100,
    })
    setRejectionMessages([])
    setCurrentJobIndex(0)
    setSpeed(1)
    sanityBreakdownTriggered.current = false
    onReset()
  }

  const currentJob = JOB_POSTINGS[currentJobIndex]
  const codeLines = [
    { text: "// Apply to job posting", indent: 0 },
    { text: `const job = await fetchJob("${currentJob.url}")`, indent: 0 },
    { text: "", indent: 0 },
    { text: "// Job details fetched from server:", indent: 0 },
    { text: `// Title: "${currentJob.title}"`, indent: 0 },
    { text: `// Requirements: ${JSON.stringify(currentJob.requirements)}`, indent: 0 },
    { text: "", indent: 0 },
    { text: "try {", indent: 0 },
    { text: "  await applyToJob(", indent: 1 },
    { text: '    "https://linkedin.com/in/yourprofile",', indent: 2 },
    { text: `    "${currentJob.url}"`, indent: 2 },
    { text: "  )", indent: 1 },
    { text: "} catch (error) {", indent: 0 },
    { text: `  console.error("Rejected:", error.message)`, indent: 1 },
    { text: "  // Try again anyway...", indent: 1 },
    { text: "}", indent: 0 },
  ]

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {hasLostSanity && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sanity-breakdown-title"
          aria-describedby="sanity-breakdown-description"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in"
        >
          <div className="mx-4 max-w-2xl space-y-6 text-center">
            <div className="animate-pulse">
              <h2
                id="sanity-breakdown-title"
                className="mb-4 font-mono text-4xl font-bold text-destructive sm:text-6xl"
              >
                SANITY.EXE HAS STOPPED WORKING
              </h2>
              <div id="sanity-breakdown-description" className="mb-6 space-y-2 font-mono text-lg text-muted-foreground">
                <p className="animate-pulse">Critical Error: Mental Health Buffer Overflow</p>
                <p>Stack Trace: Hope → Optimism → Desperation → Void</p>
                <p className="text-destructive">Error Code: 404 - Life Purpose Not Found</p>
              </div>
            </div>

            <Card className="border-destructive bg-destructive/10 p-6">
              <h3 className="mb-4 font-mono text-xl font-semibold text-foreground">Existential Crisis Detected</h3>
              <div className="space-y-3 text-left font-mono text-sm text-muted-foreground">
                <p>
                  <span className="sr-only">You have sent </span>→ You've sent {state.applicationsSubmitted}{" "}
                  applications into the void
                </p>
                <p>
                  <span className="sr-only">You have been rejected </span>→ You've been rejected {state.rejections}{" "}
                  times (and counting)
                </p>
                <p>
                  <span className="sr-only">Time wasted: </span>→ You've wasted {Math.floor(state.timeWasted / 3600)}h{" "}
                  {Math.floor((state.timeWasted % 3600) / 60)}m of your life
                </p>
                <p className="text-destructive">
                  <span className="sr-only">Current sanity level: </span>→ Your sanity level:{" "}
                  {state.sanityLevel.toFixed(1)}% (clinically concerning)
                </p>
              </div>
            </Card>

            <div className="space-y-4">
              <p className="font-mono text-base text-foreground">
                "Maybe the real treasure was the crippling self-doubt we developed along the way."
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  ref={firstFocusableRef}
                  onClick={handleReset}
                  size="lg"
                  className="gap-2 font-mono"
                  aria-label="Reset the simulation and try again"
                >
                  <RotateCcw className="h-5 w-5" aria-hidden="true" />
                  Try Again (Why Though?)
                </Button>
                <Button
                  onClick={() => window.open("https://www.linkedin.com", "_blank")}
                  variant="outline"
                  size="lg"
                  className="gap-2 font-mono"
                  aria-label="Open LinkedIn in a new tab to apply for more jobs"
                >
                  Apply to More Jobs (Masochist Mode)
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Remember: It's not you, it's the broken hiring system. Probably. Maybe. We hope.
              </p>
              <p className="sr-only">Press Escape to close this dialog</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-mono text-2xl font-bold sm:text-3xl">Job Application Simulator</h2>
            <p className="text-sm text-muted-foreground">Watching the infinite loop in action...</p>
          </div>

          <nav aria-label="Simulation controls" className="flex flex-wrap items-center gap-2">
            <Button
              onClick={onToggleRunning}
              variant={isRunning ? "destructive" : "default"}
              size="sm"
              className="gap-2"
              aria-label={isRunning ? "Pause the simulation" : "Resume the simulation"}
              aria-pressed={isRunning}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4" aria-hidden="true" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" aria-hidden="true" />
                  Resume
                </>
              )}
            </Button>
            <Button
              onClick={handleFastForward}
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              aria-label={`Fast forward simulation, current speed ${speed}x`}
            >
              <FastForward className="h-4 w-4" aria-hidden="true" />
              {speed}x
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              aria-label="Reset simulation to initial state"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </Button>
          </nav>
        </header>

        <div className="mb-6">
          <StatsDashboard
            applicationsSubmitted={state.applicationsSubmitted}
            rejections={state.rejections}
            timeWasted={state.timeWasted}
            sanityLevel={state.sanityLevel}
            isRunning={isRunning}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
                <div className="flex gap-1.5" role="presentation" aria-label="Window controls">
                  <div className="h-3 w-3 rounded-full bg-destructive" aria-label="Close" />
                  <div className="h-3 w-3 rounded-full bg-chart-3" aria-label="Minimize" />
                  <div className="h-3 w-3 rounded-full bg-chart-5" aria-label="Maximize" />
                </div>
                <span className="ml-2 font-mono text-xs text-muted-foreground">infinite-applications.ts</span>
              </div>
              <div className="p-4">
                <pre className="font-mono text-sm leading-relaxed" aria-label="Code example">
                  {codeLines.map((line, index) => (
                    <div
                      key={index}
                      className={`transition-colors ${
                        state.currentLine === index ? "bg-primary/20 text-primary" : "text-foreground"
                      }`}
                      aria-current={state.currentLine === index ? "step" : undefined}
                    >
                      <code>{line.text}</code>
                    </div>
                  ))}
                </pre>
              </div>
            </Card>

            <JobPosting job={JOB_POSTINGS[currentJobIndex]} />
          </div>

          <div>
            <ConsoleOutput messages={rejectionMessages} />
          </div>
        </div>
      </div>
    </div>
  )
}
