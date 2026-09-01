import {
  DM_Sans,
  Lato,
  Merriweather,
  Nunito,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Source_Sans_3,
} from "next/font/google"

export const fontModern = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-modern",
  display: "swap",
})

export const fontFormalHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-formal-heading",
  display: "swap",
})

export const fontFormalBody = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-formal-body",
  display: "swap",
})

export const fontFriendly = Nunito({
  subsets: ["latin"],
  variable: "--font-friendly",
  display: "swap",
})

export const fontClassicHeading = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-classic-heading",
  display: "swap",
})

export const fontClassicBody = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-classic-body",
  display: "swap",
})

export const fontSharp = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sharp",
  display: "swap",
})

export const fontVariableClassName = [
  fontModern.variable,
  fontFormalHeading.variable,
  fontFormalBody.variable,
  fontFriendly.variable,
  fontClassicHeading.variable,
  fontClassicBody.variable,
  fontSharp.variable,
].join(" ")
