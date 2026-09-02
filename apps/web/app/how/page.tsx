import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

export const metadata = { title: "How we work" }

export default function HowPage() {
  return <PublicSite page="/how" />
}
