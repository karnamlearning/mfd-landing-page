import path from "node:path"
import { config } from "dotenv"

const root = path.resolve(process.cwd(), "../..")
config({ path: path.join(root, ".env") })
config({ path: path.join(root, ".env.local") })
config({ path: path.resolve(process.cwd(), ".env") })
config({ path: path.resolve(process.cwd(), ".env.local") })
