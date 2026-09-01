"use client"

import { useRef, type MouseEvent } from "react"
import { Site } from "@mfd/site-kit"
import { useDraft } from "./store"
import * as U from "./styles"

export function PreviewFrame() {
  const config = useDraft((s) => s.config)
  const viewport = useDraft((s) => s.viewport)
  const previewOpen = useDraft((s) => s.previewOpen)

  function onClick(e: MouseEvent) {
    const a = (e.target as HTMLElement).closest("a")
    if (!a) return
    const href = a.getAttribute("href") ?? ""
    if (a.target === "_blank" || /^(tel:|mailto:|sms:|https?:)/i.test(href)) return
    e.preventDefault()
  }

  return (
    <U.Stage $open={previewOpen}>
      <U.Frame $desktop={viewport === "desktop"} onClick={onClick}>
        <Site config={config} preview embedded />
      </U.Frame>
    </U.Stage>
  )
}
