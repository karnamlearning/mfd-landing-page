import { json } from "@/lib/auth"
import { clearAdminCookie, requireAdmin } from "@/lib/admin"

export const runtime = "nodejs"

export async function POST() {
  const { ok, error } = await requireAdmin()
  if (!ok) return error
  await clearAdminCookie()
  return json({ ok: true })
}
