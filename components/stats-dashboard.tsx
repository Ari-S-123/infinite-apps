"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { JSX } from "react"

type StatsDashboardProps = {
  applicationsSubmitted: number
  rejections: number
  timeWasted: number
  sanityLevel: number
  isRunning: boolean
}

/**
 * Displays real-time statistics about the job application simulation.
 * Shows applications submitted, rejections, time wasted, and sanity level.
 *
 * @param {StatsDashboardProps} props - Component props
 * @returns {JSX.Element} The rendered statistics dashboard
 */
export function StatsDashboard({
  applicationsSubmitted,
  rejections,
  timeWasted,
  sanityLevel,
  isRunning,
}: StatsDashboardProps): JSX.Element {
  /**
   * Formats time in seconds to a human-readable string.
   *
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}h ${minutes}m ${secs}s`
  }

  const getMoodEmoji = (): string => {
    if (sanityLevel > 90) return "😊"
    if (sanityLevel > 80) return "🙂"
    if (sanityLevel > 70) return "😐"
    if (sanityLevel > 60) return "😕"
    if (sanityLevel > 50) return "😟"
    if (sanityLevel > 40) return "😰"
    if (sanityLevel > 30) return "😨"
    if (sanityLevel > 20) return "😱"
    if (sanityLevel > 10) return "🤯"
    if (sanityLevel > 5) return "💀"
    return "👻"
  }

  const getMoodDescription = (): string => {
    if (sanityLevel > 90) return "Happy and optimistic"
    if (sanityLevel > 80) return "Slightly concerned"
    if (sanityLevel > 70) return "Neutral"
    if (sanityLevel > 60) return "Worried"
    if (sanityLevel > 50) return "Anxious"
    if (sanityLevel > 40) return "Very stressed"
    if (sanityLevel > 30) return "Panicking"
    if (sanityLevel > 20) return "Terrified"
    if (sanityLevel > 10) return "Mind blown"
    if (sanityLevel > 5) return "Dead inside"
    return "Completely lost"
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Application statistics">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Applications</p>
            <p className="font-mono text-2xl font-bold" aria-live="polite" aria-atomic="true">
              {applicationsSubmitted}
              <span className="sr-only"> applications submitted</span>
            </p>
          </div>
          <TrendingUp className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Rejections</p>
            <p className="font-mono text-2xl font-bold text-destructive" aria-live="polite" aria-atomic="true">
              {rejections}
              <span className="sr-only"> rejections received</span>
            </p>
          </div>
          <TrendingDown className="h-8 w-8 text-destructive" aria-hidden="true" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Time Wasted</p>
            <p className="font-mono text-lg font-bold" aria-live="polite" aria-atomic="true">
              {formatTime(timeWasted)}
              <span className="sr-only"> of time wasted</span>
            </p>
          </div>
          <div className="relative h-8 w-8" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-chart-3">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
              {/* Hour hand */}
              <line
                x1="12"
                y1="12"
                x2="12"
                y2="7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className={isRunning ? "origin-center animate-[spin_60s_linear_infinite]" : ""}
                style={{ transformOrigin: "12px 12px" }}
              />
              {/* Minute hand */}
              <line
                x1="12"
                y1="12"
                x2="12"
                y2="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={isRunning ? "origin-center animate-[spin_6s_linear_infinite]" : ""}
                style={{ transformOrigin: "12px 12px" }}
              />
              {/* Center dot */}
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Sanity Level</p>
            <p className="font-mono text-2xl font-bold" aria-live="assertive" aria-atomic="true">
              {sanityLevel.toFixed(0)}%<span className="sr-only"> sanity remaining, mood: {getMoodDescription()}</span>
            </p>
          </div>
          <div
            className="flex h-8 w-8 items-center justify-center text-3xl transition-all duration-300"
            role="img"
            aria-label={`Mood indicator: ${getMoodDescription()}`}
          >
            {getMoodEmoji()}
          </div>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={sanityLevel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Sanity level progress bar"
        >
          <div
            className={`h-full transition-all ${
              sanityLevel > 75
                ? "bg-chart-2"
                : sanityLevel > 50
                  ? "bg-chart-3"
                  : sanityLevel > 25
                    ? "bg-chart-5"
                    : "bg-destructive"
            }`}
            style={{ width: `${sanityLevel}%` }}
          />
        </div>
      </Card>
    </div>
  )
}
