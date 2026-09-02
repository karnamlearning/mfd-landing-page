import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

export const metadata = { title: "Contact" }

export default function ContactPage() {
  return <PublicSite page="/contact" />
}
