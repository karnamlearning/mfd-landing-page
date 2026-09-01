import "server-only"
import "./env"
import { createDb, type Db } from "@mfd/db"

const g = globalThis as typeof globalThis & { __mfdDb?: Db }

export function getDb() {
  if (!g.__mfdDb) g.__mfdDb = createDb()
  return g.__mfdDb
}
