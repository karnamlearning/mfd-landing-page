import path from "node:path"
import { config as loadEnv } from "dotenv"
import type { NextConfig } from "next"

loadEnv({ path: path.join(__dirname, "../../.env") })
loadEnv({ path: path.join(__dirname, "../../.env.local") })

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
  outputFileTracingRoot: path.join(__dirname, "../.."),
  transpilePackages: ["@mfd/site-kit", "@mfd/tokens", "@mfd/schema", "@mfd/db"],
  serverExternalPackages: ["mysql2"],
  env: {
    HOST_BASE: process.env.HOST_BASE || "localhost",
    HOST_PROTOCOL: process.env.HOST_PROTOCOL || "http",
    HOST_PORT: process.env.HOST_PORT || "3000",
  },
  allowedDevOrigins: ["*.localhost"],
}

export default nextConfig
