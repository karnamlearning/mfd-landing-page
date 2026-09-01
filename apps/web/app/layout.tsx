import type { Metadata } from "next"
import { fontVariableClassName } from "./fonts"
import { StyledComponentsRegistry } from "./registry"

export const metadata: Metadata = {
  title: "Rahul Sharma · Mutual Fund Distributor",
  description: "AMFI-registered mutual fund distributor in Pune.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariableClassName}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
