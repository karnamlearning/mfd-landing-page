import type { Metadata, Viewport } from "next"
import { fontVariableClassName } from "./fonts"
import { StyledComponentsRegistry } from "./registry"

export const metadata: Metadata = {
  title: "Advisorkhoj · Your MFD site",
  description: "A branded site for your mutual fund distribution practice.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
