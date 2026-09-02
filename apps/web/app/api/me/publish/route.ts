import { eq, tenants } from "@mfd/db"
import { json, requireSession } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { getTenant, resolvePublishSlug, toMePayload } from "@/lib/tenant"

export const runtime = "nodejs"

export async function POST() {
  const { session, error } = await requireSession()
  if (error || !session) return error!
  const row = await getTenant(session.tenantId)
  if (!row) return json({ error: "missing_tenant" }, 404)

  const locked = await resolvePublishSlug(row)
  if ("error" in locked) return json({ error: locked.error }, 400)

  const status = row.status === "draft" ? "trial" : row.status
  const trialStartedAt = row.trialStartedAt ?? (status === "trial" ? new Date() : row.trialStartedAt)
  const db = getDb()
  await db
    .update(tenants)
    .set({
      slug: locked.slug,
      slugLocked: true,
      status,
      config: locked.config,
      trialStartedAt,
    })
    .where(eq(tenants.id, row.id))

  const next = await getTenant(session.tenantId)
  if (!next) return json({ error: "missing_tenant" }, 404)
  return json(await toMePayload(next))
}
