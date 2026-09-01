import { addonToolIds, baseToolIds, type ToolId } from "./ids"
import type { TenantConfig } from "./tenant"

export function visibleToolIds(config: TenantConfig): ToolId[] {
  const ids: ToolId[] = [...baseToolIds]
  if (config.addons.includes("tools")) ids.push(...addonToolIds)
  return ids.filter((id) => !config.calculatorHidden.includes(id))
}
