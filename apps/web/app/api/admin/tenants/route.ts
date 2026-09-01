import { desc, tenants } from "@mfd/db"
import { json } from "@/lib/auth"
import { requireAdmin } from "@/lib/admin"
import { getDb } from "@/lib/db"
import { publicSiteUrl } from "@/lib/site-url"

export const runtime = "nodejs"

export async function GET() {
  const { ok, error } = await requireAdmin()
  if (!ok) return error
  const db = getDb()
  const rows = await db.select().from(tenants).orderBy(desc(tenants.updatedAt)).limit(200)
  return json({
    tenants: rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      status: row.status,
      plan: row.plan,
      ownerPhone: row.ownerPhone,
      slugLocked: row.slugLocked,
      updatedAt: row.updatedAt.toISOString(),
      publicUrl: publicSiteUrl(row.slug),
    })),
  })
}
