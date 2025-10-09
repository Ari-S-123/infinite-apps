import { Card } from "@/components/ui/card"
import { Briefcase, DollarSign, AlertTriangle } from "lucide-react"
import type { JSX } from "react"

type Job = {
  title: string
  requirements: string[]
  salary: string
}

type JobPostingProps = {
  job: Job
}

/**
 * Displays the current job posting being "applied to" in the simulation.
 * Shows absurd requirements and salary information.
 *
 * @param {JobPostingProps} props - Component props
 * @returns {JSX.Element} The rendered job posting component
 */
export function JobPosting({ job }: JobPostingProps): JSX.Element {
  const postingStatuses = [
    "Posted 847 days ago • Still accepting applications",
    "Posted 2 years ago • Position definitely still open (trust us)",
    "Posted 6 months ago • We've interviewed 500 people but none were 'culture fit'",
    "Posted 1 year ago • Reposted weekly to stay fresh",
    "Posted 3 months ago • Already filled but HR forgot to take it down",
    "Posted 18 months ago • We're very selective",
    "Posted 4 days ago • 10,000 applications received",
    "Posted yesterday • Entry level position (5+ years required)",
    "Posted 9 months ago • Still looking for that unicorn",
    "Posted 2 weeks ago • Hiring manager on vacation until next quarter",
    "Posted 1 year ago • Budget was cut but posting stays up",
    "Posted 5 months ago • We'll get back to you (we won't)",
  ]

  const randomStatus = postingStatuses[Math.floor(Math.random() * postingStatuses.length)]

  return (
    <Card className="overflow-hidden" role="article" aria-label="Current job posting">
      <div className="border-b border-border bg-primary/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-mono text-sm font-semibold text-primary">Current Job Posting</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-4 font-mono text-xl font-bold">{job.title}</h3>

        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-chart-3" aria-hidden="true" />
            <span className="text-sm font-semibold text-muted-foreground">Requirements:</span>
          </div>
          <ul className="space-y-2" role="list">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-destructive" aria-hidden="true">
                  •
                </span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-3">
          <DollarSign className="h-4 w-4 text-chart-3" aria-hidden="true" />
          <div>
            <p className="text-xs text-muted-foreground">Salary:</p>
            <p className="font-mono text-sm font-semibold">{job.salary}</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
          <p className="text-xs text-muted-foreground">{randomStatus}</p>
        </div>
      </div>
    </Card>
  )
}
