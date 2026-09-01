"use client"

import { ErrorStand } from "./missing/view"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <ErrorStand
          title="Something went wrong"
          copy="The page failed to load. Try again, or come back in a moment."
          onRetry={reset}
        />
      </body>
    </html>
  )
}
