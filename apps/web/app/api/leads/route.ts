import { leads } from "@mfd/db"
import { json } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { logError, logEvent } from "@/lib/log"
import { normalizePhone } from "@/lib/phone"
import { requestHost } from "@/lib/public-site"
import { getTenantBySlug, isPublicLive } from "@/lib/tenant"

export const runtime = "nodejs"

export async function POST(req: Request) {
  let body: {
    name?: string
    mobile?: string
    city?: string
    message?: string
    source?: string
    payload?: Record<string, unknown>
  }
  try {
    body = await req.json()
  } catch {
    return json({ error: "invalid_json" }, 400)
  }

  const name = (body.name ?? "").trim()
  const mobile = normalizePhone(body.mobile ?? "")
  const source = (body.source ?? "").trim().slice(0, 64)
  if (!name || !mobile || !source) return json({ error: "invalid" }, 400)

  const { slug } = await requestHost()
  if (!slug) return json({ error: "missing_tenant" }, 400)
  const tenant = await getTenantBySlug(slug)
  if (!tenant || !isPublicLive(tenant)) return json({ error: "missing_tenant" }, 404)

  const db = getDb()
  try {
    await db.insert(leads).values({
      tenantId: tenant.id,
      name,
      mobile,
      city: (body.city ?? "").trim() || null,
      message: (body.message ?? "").trim() || null,
      source,
      payload: body.payload ?? null,
    })
  } catch (err) {
    logError("leads.fail", err, { tenant_id: tenant.id, source })
    return json({ error: "save_failed" }, 500)
  }
  logEvent("leads", { tenant_id: tenant.id, source })
  return json({ ok: true })
}
