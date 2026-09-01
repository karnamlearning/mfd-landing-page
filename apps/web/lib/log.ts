import "server-only"

export function logEvent(
  event: string,
  fields: Record<string, string | number | boolean | null | undefined> = {},
) {
  const parts = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${value}`)
  console.info(`[${event}] ${parts.join(" ")}`.trim())
}

export function logError(
  event: string,
  err: unknown,
  fields: Record<string, string | number | boolean | null | undefined> = {},
) {
  const message = err instanceof Error ? err.message : String(err)
  logEvent(event, { ...fields, error: message })
}
