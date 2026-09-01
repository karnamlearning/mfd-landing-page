import type { AddonId } from "./ids"

export type BillingCycle = "monthly" | "yearly"

export const BASE_PRICE = { monthly: 299, yearly: 2999 } as const

export const ADDON_PRICE: Record<AddonId, { monthly: number; yearly: number }> = {
  tools: { monthly: 99, yearly: 999 },
  bilingual: { monthly: 99, yearly: 999 },
}

export const ADDON_LABEL: Record<AddonId, string> = {
  tools: "Tools pack",
  bilingual: "Bilingual",
}

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`
}

export function addonDelta(id: AddonId, cycle: BillingCycle) {
  return ADDON_PRICE[id][cycle]
}

export function planTotal(cycle: BillingCycle, addons: readonly string[]) {
  let amount = BASE_PRICE[cycle]
  for (const id of addons) {
    if (id === "tools" || id === "bilingual") amount += ADDON_PRICE[id][cycle]
  }
  return amount
}

export function hasAddon(addons: readonly string[], id: AddonId) {
  return addons.includes(id)
}
