import { clearSessionCookie, json } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST() {
  await clearSessionCookie()
  return json({ ok: true })
}
