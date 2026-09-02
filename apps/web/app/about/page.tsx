import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

export const metadata = { title: "About" }

export default function AboutPage() {
  return <PublicSite page="/about" />
}
