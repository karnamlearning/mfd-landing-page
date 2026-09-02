import type { MouseEvent, ReactNode } from "react"
import { FiHeart, FiLayers, FiPieChart, FiRefreshCw, FiRepeat, FiSunrise, FiTarget } from "react-icons/fi"
import { lockedSectionIds, lookOf, type LookId, type SectionId, type TenantConfig, type TemplateId } from "@mfd/schema"
import type { BrandCopy } from "./brand"
import type { Copy, Locale } from "./copy"
import { parseInternalHref, scrollSiteTo } from "./utils"

export type SkinCtx = {
  config: TenantConfig
  t: Copy
  b: BrandCopy
  locale: Locale
  wa: string
  preview: boolean
  embedded: boolean
  previewPath: string
}

export function onHashNav(e: MouseEvent<HTMLAnchorElement>) {
  if (e.currentTarget.closest("[data-preview-nav]")) return
  const href = e.currentTarget.getAttribute("href") ?? ""
  const parsed = parseInternalHref(href)
  if (!parsed?.hash) return
  const here = typeof window !== "undefined" ? window.location.pathname : "/"
  if (parsed.path !== here) return
  e.preventDefault()
  scrollSiteTo(e.currentTarget, parsed.hash)
}

export const SERVICE_ICONS = {
  mutual_funds: FiPieChart,
  sip: FiRepeat,
  goals: FiTarget,
  stp_swp: FiRefreshCw,
  retirement: FiSunrise,
  life_insurance: FiHeart,
  health_insurance: FiHeart,
  bonds: FiLayers,
} as const

const LOCKED = new Set<string>(lockedSectionIds)

export function activeSections(config: TenantConfig) {
  return config.sections
    .map((row) => (LOCKED.has(row.id) ? { ...row, on: true } : row))
    .filter((row) => row.on)
}

export function isOn(config: TenantConfig, id: SectionId) {
  return activeSections(config).some((row) => row.id === id)
}

export function heroLayout(look: LookId, tpl: TemplateId): "split" | "overlay" | "center" {
  if (look === "counter") return "center"
  if (look === "folio" || tpl === "solo") return "split"
  return "overlay"
}

export function lookFrom(config: TenantConfig): LookId {
  return lookOf(config)
}

export type SkinHomeProps = {
  ctx: SkinCtx
  locale: Locale
  onLocale: (l: Locale) => void
  body?: ReactNode
}
