import { eq, tenants } from "@mfd/db"
import {
  isPhoneStubSlug,
  isReservedSlug,
  slugifyName,
  tenantConfigSchema,
} from "@mfd/schema"
import { json, requireSession } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { slugTaken, uniqueSlug } from "@/lib/slug"
import { getTenant, toMePayload } from "@/lib/tenant"

export const runtime = "nodejs"

export async function GET() {
  const { session, error } = await requireSession()
  if (error || !session) return error!
  const row = await getTenant(session.tenantId)
  if (!row) return json({ error: "missing_tenant" }, 404)
  return json({ ...toMePayload(row), impersonating: Boolean(session.impersonated) })
}

export async function PUT(req: Request) {
  const { session, error } = await requireSession()
  if (error || !session) return error!
  const row = await getTenant(session.tenantId)
  if (!row) return json({ error: "missing_tenant" }, 404)

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: "invalid_json" }, 400)
  }
  const parsed = tenantConfigSchema.safeParse(body)
  if (!parsed.success) return json({ error: "invalid_config", details: parsed.error.flatten() }, 400)

  let config = parsed.data
  let slug = row.slug

  if (row.slugLocked) {
    config = { ...config, slug: row.slug }
  } else {
    const requested = slugifyName(config.slug)
    if (isPhoneStubSlug(row.slug) && config.details.name.trim() && isPhoneStubSlug(requested)) {
      slug = await uniqueSlug(config.details.name, row.id)
    } else if (requested && requested !== row.slug) {
      if (isReservedSlug(requested)) return json({ error: "reserved_slug" }, 400)
      if (await slugTaken(requested, row.id)) {
        const suggestion = await uniqueSlug(requested, row.id)
        return json({ error: "slug_taken", suggestion }, 409)
      }
      slug = requested
    } else if (isPhoneStubSlug(row.slug) && config.details.name.trim()) {
      slug = await uniqueSlug(config.details.name, row.id)
    }
    config = { ...config, slug }
  }

  const db = getDb()
  await db
    .update(tenants)
    .set({
      slug,
      config,
      ownerPhone: config.details.whatsapp || config.details.phone || row.ownerPhone,
      ownerEmail: config.details.email || row.ownerEmail,
    })
    .where(eq(tenants.id, row.id))

  const next = await getTenant(session.tenantId)
  if (!next) return json({ error: "missing_tenant" }, 404)
  return json({ ...toMePayload(next), impersonating: Boolean(session.impersonated) })
}
