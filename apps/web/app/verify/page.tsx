import { notFound, redirect } from "next/navigation"
import { buyerDestination } from "@/lib/buyer"
import { requestHost } from "@/lib/public-site"
import { VerifyOtp } from "../signup/VerifyOtp"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Verify OTP",
  description: "Enter the one-time code sent to your mobile.",
}

export default async function VerifyPage() {
  const { role } = await requestHost()
  if (role === "public") notFound()
  const dest = await buyerDestination()
  if (dest) redirect(dest)
  return <VerifyOtp />
}
