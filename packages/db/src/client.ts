import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import * as schema from "./schema"

export function createDb(url = process.env.DATABASE_URL) {
  if (!url) throw new Error("DATABASE_URL is not set")
  const pool = mysql.createPool(url)
  return drizzle({ client: pool, schema, mode: "default" })
}

export type Db = ReturnType<typeof createDb>
