import type { TenantConfig } from "@mfd/schema"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { parseHost, type HostRole } from "./host"
import { getTenantBySlug, publicConfig, type TenantStatus } from "./tenant"

export async function requestHost() {
  const h = await headers()
  const role = h.get("x-mfd-role") as HostRole | null
  const slug = h.get("x-mfd-slug")
  if (role === "app" || role === "public" || role === "marketing") {
    return { role, slug: slug || null }
  }
  return parseHost(h.get("x-forwarded-host") || h.get("host") || "")
}

export async function resolvePublicSite(): Promise<
  { kind: "none" } | { kind: "missing" } | { kind: "ok"; config: TenantConfig; status: TenantStatus }
> {
  const { role, slug } = await requestHost()
  if (role !== "public" || !slug) return { kind: "none" }
  const row = await getTenantBySlug(slug)
  if (!row || row.status === "suspended") return { kind: "missing" }
  return { kind: "ok", config: publicConfig(row), status: row.status }
}

export async function loadPublicSite() {
  const resolved = await resolvePublicSite()
  if (resolved.kind === "none") return null
  if (resolved.kind === "missing") notFound()
  return { config: resolved.config, status: resolved.status }
}
