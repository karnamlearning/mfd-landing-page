import "server-only"
import { tenantConfigSchema } from "@mfd/schema"
import { getSession } from "./auth"
import { getTenant } from "./tenant"

export type BuyerDest = "/templates" | "/place"

export async function buyerDestination(): Promise<BuyerDest | null> {
  const session = await getSession()
  if (!session) return null
  const row = await getTenant(session.tenantId)
  if (!row) return "/templates"
  const picked = tenantConfigSchema.parse(row.config).pickedFamily
  return picked === false ? "/templates" : "/place"
}
