import { Site } from "@mfd/site-kit"
import { redirect } from "next/navigation"
import { PaywallView } from "./missing/view"
import { buyerDestination } from "@/lib/buyer"
import { loadPublicSite, requestHost, resolvePublicSite } from "@/lib/public-site"
import { SendOtp } from "./signup/SendOtp"

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
  if (resolved.kind === "paywall") return { title: "Site paused" }
  if (resolved.kind === "missing") return { title: "Not found" }
  const { role } = await requestHost()
  if (role === "app") return { title: "Sign in" }
  return {
    title: "Advisorkhoj · Your MFD site",
    description: "A branded site for your mutual fund distribution practice.",
  }
}

export default async function HomePage() {
  const site = await loadPublicSite()
  if (site?.paywall) return <PaywallView />
  if (site?.config) return <Site config={site.config} preview={false} />
  const dest = await buyerDestination()
  if (dest) redirect(dest)
  return <SendOtp />
}
