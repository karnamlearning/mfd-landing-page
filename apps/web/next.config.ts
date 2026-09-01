import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  outputFileTracingRoot: path.join(__dirname, "../.."),
  transpilePackages: ["@mfd/site-kit", "@mfd/tokens", "@mfd/schema"],
}

export default nextConfig
