import "server-only"
import { eq, tenants, type TenantRow } from "@mfd/db"
import { isPhoneStubSlug, isReservedSlug, tenantConfigSchema, type TenantConfig } from "@mfd/schema"
import { getDb } from "./db"
import { uniqueSlug } from "./slug"
import { publicSiteUrl } from "./site-url"

export const TRIAL_DAYS = 14

export type TenantStatus = TenantRow["status"]
export type TenantPlan = TenantRow["plan"]

export function trialEndsAt(row: TenantRow): Date | null {
  if (row.status !== "trial" || !row.trialStartedAt) return null
  return new Date(row.trialStartedAt.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000)
}

export function isTrialExpired(row: TenantRow) {
  const end = trialEndsAt(row)
  return Boolean(end && Date.now() >= end.getTime())
}

export function isPublicLive(row: TenantRow) {
  if (row.status === "active") return true
  if (row.status === "trial") return !isTrialExpired(row)
  return false
}

export type MeConfigPayload = {
  config: TenantConfig
  slugLocked: boolean
  status: TenantStatus
  plan: TenantPlan
  trialEndsAt: string | null
  publicUrl: string
}

export function toMePayload(row: TenantRow): MeConfigPayload {
  const config = tenantConfigSchema.parse(row.config)
  return {
    config: { ...config, slug: row.slug },
    slugLocked: row.slugLocked,
    status: row.status,
    plan: row.plan,
    trialEndsAt: trialEndsAt(row)?.toISOString() ?? null,
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

export async function getTenantBySubId(subId: string) {
  const db = getDb()
  const rows = await db.select().from(tenants).where(eq(tenants.razorpaySubId, subId)).limit(1)
  return rows[0] ?? null
}

/** Unpaid Tools pack is preview-only. Public extras only when the tenant is paid-active. */
export function publicConfig(row: TenantRow): TenantConfig {
  const config = tenantConfigSchema.parse(row.config)
  if (row.status !== "active") return { ...config, slug: row.slug, addons: [] }
  return { ...config, slug: row.slug }
}

export async function resolvePublishSlug(
  row: TenantRow,
): Promise<{ error: "reserved_slug" } | { slug: string; config: TenantConfig }> {
  const config = tenantConfigSchema.parse(row.config)
  let slug = row.slug
  if (!row.slugLocked) {
    if (isPhoneStubSlug(slug) && config.details.name.trim()) {
      slug = await uniqueSlug(config.details.name, row.id)
    }
    if (isReservedSlug(slug)) return { error: "reserved_slug" as const }
  }
  return { slug, config: { ...config, slug } }
}
