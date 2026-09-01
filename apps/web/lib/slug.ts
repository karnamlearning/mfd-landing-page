import "server-only"
import { eq, tenants } from "@mfd/db"
import { isReservedSlug, slugifyName } from "@mfd/schema"
import { getDb } from "./db"

export async function slugTaken(slug: string, excludeTenantId?: number) {
  const db = getDb()
  const rows = await db.select({ id: tenants.id }).from(tenants).where(eq(tenants.slug, slug)).limit(1)
  const id = rows[0]?.id
  if (id == null) return false
  return id !== excludeTenantId
}

export async function uniqueSlug(base: string, excludeTenantId?: number) {
  const root = slugifyName(base)
  let candidate = isReservedSlug(root) ? `${root}-site` : root
  let n = 2
  while (isReservedSlug(candidate) || (await slugTaken(candidate, excludeTenantId))) {
    candidate = `${root}-${n++}`
    if (n > 200) throw new Error("Could not allocate a unique slug")
  }
  return candidate
}
