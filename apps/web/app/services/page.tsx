import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

export const metadata = { title: "Services" }

export default function ServicesPage() {
  return <PublicSite page="/services" />
}
