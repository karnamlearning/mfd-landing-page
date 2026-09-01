import { json } from "@/lib/auth"
import { adminConfigured, adminGateSecret, requireAdmin, secretsMatch, setAdminCookie } from "@/lib/admin"
import { logEvent } from "@/lib/log"

export const runtime = "nodejs"

export async function POST(req: Request) {
  if (!adminConfigured()) return json({ error: "not_configured" }, 404)
  let body: { secret?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: "invalid_json" }, 400)
  }
  const secret = (body.secret ?? "").trim()
  if (!secretsMatch(secret, adminGateSecret())) {
    logEvent("admin.login", { ok: false })
    return json({ error: "unauthorized" }, 401)
  }
  await setAdminCookie()
  logEvent("admin.login", { ok: true })
  return json({ ok: true })
}

export async function GET() {
  const { ok, error } = await requireAdmin()
  if (!ok) return error
  return json({ ok: true })
}
