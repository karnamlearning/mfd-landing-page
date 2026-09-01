import type { TenantConfig } from "@mfd/schema"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { parseHost, type HostRole } from "./host"
import { getTenantBySlug, isPublicLive, isTrialExpired, publicConfig, type TenantStatus } from "./tenant"

export async function requestHost() {
  const h = await headers()
  const role = h.get("x-mfd-role") as HostRole | null
  const slug = h.get("x-mfd-slug")
  if (role === "app" || role === "public" || role === "marketing") {
    return { role, slug: slug || null }
  }
  return parseHost(h.get("x-forwarded-host") || h.get("host") || "")
}

export type PublicSite =
  | { kind: "none" }
  | { kind: "missing" }
  | { kind: "paywall" }
  | { kind: "ok"; config: TenantConfig; status: TenantStatus }

export async function resolvePublicSite(): Promise<PublicSite> {
  const { role, slug } = await requestHost()
  if (role !== "public" || !slug) return { kind: "none" }
  const row = await getTenantBySlug(slug)
  if (!row || row.status === "suspended" || row.status === "draft") return { kind: "missing" }
  if (isTrialExpired(row)) return { kind: "paywall" }
  if (!isPublicLive(row)) return { kind: "missing" }
  return { kind: "ok", config: publicConfig(row), status: row.status }
}

export async function loadPublicSite() {
  const resolved = await resolvePublicSite()
  if (resolved.kind === "none") return null
  if (resolved.kind === "missing") notFound()
  if (resolved.kind === "paywall") return { paywall: true as const, config: null, status: null }
  return { paywall: false as const, config: resolved.config, status: resolved.status }
}
