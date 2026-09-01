import { desc, eq, leads } from "@mfd/db"
import { json, requireSession } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { logEvent } from "@/lib/log"

export const runtime = "nodejs"

export async function GET() {
  const { session, error } = await requireSession()
  if (error || !session) return error!
  const db = getDb()
  const rows = await db
    .select()
    .from(leads)
    .where(eq(leads.tenantId, session.tenantId))
    .orderBy(desc(leads.createdAt))
    .limit(100)
  logEvent("leads.list", { tenant_id: session.tenantId, count: rows.length })
  return json({
    leads: rows.map((row) => ({
      id: row.id,
      name: row.name,
      mobile: row.mobile,
      city: row.city,
      message: row.message,
      source: row.source,
      createdAt: row.createdAt.toISOString(),
    })),
  })
}
