"use client"

import { useRef, type MouseEvent } from "react"
import { Site } from "@mfd/site-kit"
import { useDraft } from "./store"
import * as U from "./styles"

export function PreviewFrame() {
  const config = useDraft((s) => s.config)
  const viewport = useDraft((s) => s.viewport)
  const previewOpen = useDraft((s) => s.previewOpen)
  const frameRef = useRef<HTMLDivElement>(null)

  function onClick(e: MouseEvent) {
    const a = (e.target as HTMLElement).closest("a")
    if (!a) return
    e.preventDefault()
    const href = a.getAttribute("href") ?? ""
    const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : ""
    if (!hash) return
    frameRef.current?.querySelector(`#${CSS.escape(hash)}`)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <U.Stage $open={previewOpen}>
      <U.Frame ref={frameRef} $desktop={viewport === "desktop"} onClick={onClick}>
        <Site config={config} preview embedded />
      </U.Frame>
    </U.Stage>
  )
}
