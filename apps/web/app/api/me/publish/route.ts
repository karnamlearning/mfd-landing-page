import { eq, tenants } from "@mfd/db"
import { isPhoneStubSlug, isReservedSlug, tenantConfigSchema } from "@mfd/schema"
import { json, requireSession } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { uniqueSlug } from "@/lib/slug"
import { getTenant, toMePayload } from "@/lib/tenant"

export const runtime = "nodejs"

export async function POST() {
  const { session, error } = await requireSession()
  if (error || !session) return error!
  const row = await getTenant(session.tenantId)
  if (!row) return json({ error: "missing_tenant" }, 404)

  const config = tenantConfigSchema.parse(row.config)
  let slug = row.slug
  if (!row.slugLocked) {
    if (isPhoneStubSlug(slug) && config.details.name.trim()) {
      slug = await uniqueSlug(config.details.name, row.id)
    }
    if (isReservedSlug(slug)) return json({ error: "reserved_slug" }, 400)
  }

  const status = row.status === "draft" ? "trial" : row.status
  const nextConfig = { ...config, slug }
  const db = getDb()
  await db
    .update(tenants)
    .set({
      slug,
      slugLocked: true,
      status,
      config: nextConfig,
    })
    .where(eq(tenants.id, row.id))

  const next = await getTenant(session.tenantId)
  if (!next) return json({ error: "missing_tenant" }, 404)
  return json(toMePayload(next))
}
