import { Card } from "@/components/ui/card"
import { Keyboard, Eye, Volume2 } from "lucide-react"
import type { JSX } from "react"

/**
 * Displays accessibility information and keyboard shortcuts for the application.
 * Helps users understand how to navigate and interact with the demo.
 *
 * @returns {JSX.Element} The rendered accessibility information component
 */
export function AccessibilityInfo(): JSX.Element {
  return (
    <Card className="p-6">
      <h3 className="mb-4 flex items-center gap-2 font-mono text-xl font-semibold">
        <Eye className="h-5 w-5" aria-hidden="true" />
        Accessibility Features
      </h3>

      <div className="space-y-6">
        <section>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <Keyboard className="h-4 w-4" aria-hidden="true" />
            Keyboard Navigation
          </h4>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="min-w-24 font-mono text-muted-foreground">Tab</dt>
              <dd>Navigate between interactive elements</dd>
            </div>
            <div className="flex gap-3">
              <dt className="min-w-24 font-mono text-muted-foreground">Shift + Tab</dt>
              <dd>Navigate backwards</dd>
            </div>
            <div className="flex gap-3">
              <dt className="min-w-24 font-mono text-muted-foreground">Enter/Space</dt>
              <dd>Activate buttons and links</dd>
            </div>
            <div className="flex gap-3">
              <dt className="min-w-24 font-mono text-muted-foreground">Escape</dt>
              <dd>Close modal dialogs</dd>
            </div>
            <div className="flex gap-3">
              <dt className="min-w-24 font-mono text-muted-foreground">Skip Link</dt>
              <dd>Press Tab on page load to reveal skip to main content link</dd>
            </div>
          </dl>
        </section>

        <section>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Screen Reader Support
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>All interactive elements have descriptive labels</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>Dynamic content updates are announced via ARIA live regions</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>Statistics and state changes are communicated to assistive technologies</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>Modal dialogs properly trap focus and announce their purpose</span>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="mb-3 text-sm font-semibold text-primary">Visual Accessibility</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>Color contrast meets WCAG AA standards</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>Information is not conveyed by color alone</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>Animations respect prefers-reduced-motion settings</span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true">•</span>
              <span>Focus indicators are clearly visible</span>
            </li>
          </ul>
        </section>
      </div>
    </Card>
  )
}
