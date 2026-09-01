"use client"

import { createContext, useContext } from "react"
import type { Copy, Locale } from "./copy"

export type ChromeCtx = {
  locale: Locale
  t: Copy
  name: string
  arn: string
}

export const ChromeContext = createContext<ChromeCtx | null>(null)

export function useChrome() {
  return useContext(ChromeContext)
}
