"use client"

import { useRouter } from "next/navigation"
import { ThemeProvider } from "styled-components"
import { themes } from "@mfd/tokens"
import { OtpForm } from "./OtpForm"
import * as U from "../place/styles"

export function SignupApp() {
  const router = useRouter()
  return (
    <ThemeProvider theme={themes.slate}>
      <U.EditorGlobal />
      <U.Marketing>
        <U.BrandMark>
          <U.BrandName>Advisorkhoj</U.BrandName>
          <U.BrandSub>Your MFD site</U.BrandSub>
        </U.BrandMark>
        <U.MarketingLead>
          A branded site for your practice. WhatsApp-first. Pick a template, then your details — we host it on your own URL.
        </U.MarketingLead>
        <OtpForm onAuthed={() => router.push("/place")} />
      </U.Marketing>
    </ThemeProvider>
  )
}
