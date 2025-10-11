"use client"

import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Monitor } from "lucide-react"

/**
 * MobileWarning component displays a one-time alert dialog for mobile users.
 *
 * This component detects mobile devices and shows a warning popup informing users
 * that the website is optimized for desktop browsers. The warning appears only once
 * per session using sessionStorage to track display state.
 *
 * @returns {JSX.Element | null} Alert dialog for mobile users or null if already shown/not mobile
 */
export function MobileWarning() {
  const isMobile = useIsMobile()
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Only run on client side after mount
    if (typeof window === "undefined") return

    // Check if warning has already been shown this session
    const hasSeenWarning = sessionStorage.getItem("mobile-warning-shown")

    // Show warning if user is on mobile and hasn't seen it yet
    if (isMobile && !hasSeenWarning) {
      setShowWarning(true)
    }
  }, [isMobile])

  /**
   * Handles the user acknowledging the warning.
   * Stores the acknowledgment in sessionStorage and closes the dialog.
   */
  const handleAcknowledge = () => {
    sessionStorage.setItem("mobile-warning-shown", "true")
    setShowWarning(false)
  }

  return (
    <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
      <AlertDialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Monitor className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <AlertDialogTitle className="text-center">Desktop Experience Recommended</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-balance">
            This Job Application Simulator is optimized for desktop browsers to provide the best experience. Some
            features may not work as expected on mobile devices.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction onClick={handleAcknowledge} className="w-full sm:w-auto">
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
