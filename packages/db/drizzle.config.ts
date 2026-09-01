import path from "node:path"
import { fileURLToPath } from "node:url"
import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

const here = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(here, "../../.env") })
config({ path: path.resolve(here, "../../.env.local") })

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
