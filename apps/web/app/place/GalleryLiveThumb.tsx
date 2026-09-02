"use client"

import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { applyFamily, samplePracticeConfig, type FamilyId } from "@mfd/schema"
import { Site } from "@mfd/site-kit"
import * as U from "./styles"

/** Wide enough that desktop container queries (nav, split hero) fire. */
export const GALLERY_SITE_WIDTH = 920

function previewConfig(id: FamilyId) {
  const config = applyFamily({ ...samplePracticeConfig, pickedFamily: false }, id)
  return {
    ...config,
    sections: config.sections.map((row) => (row.id === "calculators" ? { ...row, on: false } : row)),
  }
}

export function GalleryLiveThumb({ id }: { id: FamilyId }) {
  const clipRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const config = useMemo(() => previewConfig(id), [id])

  useLayoutEffect(() => {
    const clip = clipRef.current
    const page = pageRef.current
    if (!clip || !page) return

    const measure = () => {
      const s = clip.clientWidth / GALLERY_SITE_WIDTH
      const visible = clip.clientHeight / Math.max(s, 0.01)
      clip.style.setProperty("--s", String(s))
      clip.style.setProperty("--pan", `${Math.min(0, visible - page.offsetHeight)}px`)
    }

    const ro = new ResizeObserver(measure)
    ro.observe(clip)
    ro.observe(page)
    const imgs = [...page.querySelectorAll("img")]
    imgs.forEach((img) => img.addEventListener("load", measure))
    measure()
    const later = window.setTimeout(measure, 480)
    return () => {
      ro.disconnect()
      imgs.forEach((img) => img.removeEventListener("load", measure))
      window.clearTimeout(later)
    }
  }, [id])

  useEffect(() => {
    const clip = clipRef.current
    if (!clip) return
    const io = new IntersectionObserver(
      ([entry]) => {
        clip.dataset.play = entry?.isIntersecting ? "1" : "0"
      },
      { threshold: 0.3 },
    )
    io.observe(clip)
    clip.dataset.play = "1"
    return () => io.disconnect()
  }, [])

  return (
    <U.LiveThumb ref={clipRef} $id={id} data-play="1" aria-hidden inert>
      <U.LiveStage ref={pageRef}>
        <Site config={config} preview embedded />
      </U.LiveStage>
    </U.LiveThumb>
  )
}
