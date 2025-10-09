"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef } from "react"
import { XCircle } from "lucide-react"
import type { JSX } from "react/jsx-runtime"

type RejectionMessage = {
  id: number
  message: string
  timestamp: number
}

type ConsoleOutputProps = {
  messages: RejectionMessage[]
}

/**
 * Displays a scrolling console output of rejection messages.
 * Auto-scrolls to show the latest rejections.
 *
 * @param {ConsoleOutputProps} props - Component props
 * @returns {JSX.Element} The rendered console output component
 */
export function ConsoleOutput({ messages }: ConsoleOutputProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <Card className="flex h-[750px] flex-col overflow-hidden" role="region" aria-label="Console output">
      <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
        <div className="flex gap-1.5" role="presentation" aria-label="Window controls">
          <div className="h-3 w-3 rounded-full bg-destructive" aria-label="Close" />
          <div className="h-3 w-3 rounded-full bg-chart-3" aria-label="Minimize" />
          <div className="h-3 w-3 rounded-full bg-chart-5" aria-label="Maximize" />
        </div>
        <span className="ml-2 font-mono text-xs text-muted-foreground">Console</span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions"
      >
        {messages.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">Waiting for rejections...</p>
        ) : (
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className="flex items-start gap-2 font-mono text-sm animate-in fade-in slide-in-from-bottom-2"
              >
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                <span className="text-muted-foreground">
                  Rejection #{index + 1}:<span className="sr-only"> received</span>
                </span>
                <span className="text-destructive">{msg.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
