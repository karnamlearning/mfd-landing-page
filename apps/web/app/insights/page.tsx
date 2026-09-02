import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

export const metadata = { title: "Insights" }

export default function InsightsPage() {
  return <PublicSite page="/insights" />
}
