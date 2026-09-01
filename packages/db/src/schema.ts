import {
  bigint,
  boolean,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import type { TenantConfig } from "@mfd/schema"

const timestamps = {
  createdAt: timestamp("created_at", { mode: "date", fsp: 3 }).notNull().defaultNow(),
}

export const tenants = mysqlTable("tenants", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  slugLocked: boolean("slug_locked").notNull().default(false),
  status: mysqlEnum("status", ["draft", "trial", "active", "suspended"]).notNull().default("draft"),
  config: json("config").$type<TenantConfig>().notNull(),
  ownerPhone: varchar("owner_phone", { length: 20 }),
  ownerEmail: varchar("owner_email", { length: 255 }),
  razorpaySubId: varchar("razorpay_sub_id", { length: 64 }),
  plan: mysqlEnum("plan", ["monthly", "yearly"]),
  trialStartedAt: timestamp("trial_started_at", { mode: "date", fsp: 3 }),
  ...timestamps,
  updatedAt: timestamp("updated_at", { mode: "date", fsp: 3 }).notNull().defaultNow().onUpdateNow(),
})

export const users = mysqlTable("users", {
  id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  tenantId: bigint("tenant_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => tenants.id),
  ...timestamps,
})

export const leads = mysqlTable(
  "leads",
  {
    id: bigint("id", { mode: "number", unsigned: true }).autoincrement().primaryKey(),
    tenantId: bigint("tenant_id", { mode: "number", unsigned: true })
      .notNull()
      .references(() => tenants.id),
    name: varchar("name", { length: 255 }).notNull(),
    mobile: varchar("mobile", { length: 20 }).notNull(),
    city: varchar("city", { length: 128 }),
    message: text("message"),
    source: varchar("source", { length: 64 }).notNull(),
    payload: json("payload").$type<Record<string, unknown>>(),
    ...timestamps,
  },
  (table) => [index("leads_tenant_created_idx").on(table.tenantId, table.createdAt)],
)

export const otpChallenges = mysqlTable("otp_challenges", {
  phone: varchar("phone", { length: 20 }).primaryKey(),
  codeHash: varchar("code_hash", { length: 64 }).notNull(),
  expiresAt: timestamp("expires_at", { mode: "date", fsp: 3 }).notNull(),
  attempts: int("attempts").notNull().default(0),
})

export type TenantRow = typeof tenants.$inferSelect
export type UserRow = typeof users.$inferSelect
export type LeadRow = typeof leads.$inferSelect
export type OtpChallengeRow = typeof otpChallenges.$inferSelect
