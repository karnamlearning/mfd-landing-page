import { PublicSite } from "@/lib/public-page"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Calculators",
}

export default function CalculatorsPage() {
  return <PublicSite page="/calculators" />
}
