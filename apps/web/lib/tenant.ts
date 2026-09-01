import "server-only"
import { eq, tenants, type TenantRow } from "@mfd/db"
import { tenantConfigSchema, type TenantConfig } from "@mfd/schema"
import { getDb } from "./db"
import { publicSiteUrl } from "./site-url"

export type TenantStatus = TenantRow["status"]

export type MeConfigPayload = {
  config: TenantConfig
  slugLocked: boolean
  status: TenantStatus
  publicUrl: string
}

export function toMePayload(row: TenantRow): MeConfigPayload {
  const config = tenantConfigSchema.parse(row.config)
  return {
    config: { ...config, slug: row.slug },
    slugLocked: row.slugLocked,
    status: row.status,
    publicUrl: publicSiteUrl(row.slug),
  }
}

export async function getTenant(id: number) {
  const db = getDb()
  const rows = await db.select().from(tenants).where(eq(tenants.id, id)).limit(1)
  return rows[0] ?? null
}

export async function getTenantBySlug(slug: string) {
  const db = getDb()
  const rows = await db.select().from(tenants).where(eq(tenants.slug, slug)).limit(1)
  return rows[0] ?? null
}

/** Unpaid Tools pack is preview-only until billing. Public ignores add-ons unless active. */
export function publicConfig(row: TenantRow): TenantConfig {
  const config = tenantConfigSchema.parse(row.config)
  if (row.status !== "active") return { ...config, slug: row.slug, addons: [] }
  return { ...config, slug: row.slug }
}
