import { addonToolIds, baseToolIds, type ToolId } from "./ids"
import type { TenantConfig } from "./tenant"

/** Tools the BFF can illustrate. Hide the rest until Advisorkhoj API is wired. */
export const readyToolIds = [
  "sip",
  "lumpsum",
  "goal_sip",
  "retirement",
  "swp",
  "inflation",
  "compounding",
  "sip_stepup",
  "lumpsum_target",
] as const

export type ReadyToolId = (typeof readyToolIds)[number]

const ready = new Set<string>(readyToolIds)

export function visibleToolIds(config: TenantConfig): ToolId[] {
  const ids: ToolId[] = [...baseToolIds]
  if (config.addons.includes("tools")) ids.push(...addonToolIds)
  return ids.filter((id) => ready.has(id) && !config.calculatorHidden.includes(id))
}
