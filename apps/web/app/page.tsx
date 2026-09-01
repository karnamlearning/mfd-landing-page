import { Site } from "@mfd/site-kit"
import { loadPublicSite, requestHost, resolvePublicSite } from "@/lib/public-site"
import { SignupApp } from "./signup/SignupApp"

export const dynamic = "force-dynamic"

export async function generateMetadata() {
  const resolved = await resolvePublicSite()
  if (resolved.kind === "ok") {
    const name = resolved.config.details.name.trim()
    return {
      title: name ? `${name} · Mutual Fund Distributor` : "Mutual Fund Distributor",
      description: resolved.config.details.pitch?.trim() || "AMFI-registered mutual fund distributor.",
    }
  }
  if (resolved.kind === "missing") return { title: "Not found" }
  const { role } = await requestHost()
  if (role === "app") return { title: "Buyer Place" }
  return {
    title: "Advisorkhoj · Your MFD site",
    description: "A branded site for your mutual fund distribution practice.",
  }
}

export default async function HomePage() {
  const site = await loadPublicSite()
  if (site) return <Site config={site.config} preview={false} />
  return <SignupApp />
}
