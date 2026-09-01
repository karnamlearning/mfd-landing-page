"use client"

import { useEffect, useRef } from "react"
import { useDraft, type ServerDraft } from "./store"

let timer: ReturnType<typeof setTimeout> | null = null
let gen = 0
let lastSaved = ""

function snapshot(config: unknown) {
  return JSON.stringify(config)
}

export async function saveConfig(immediate = false) {
  const { hydrated } = useDraft.getState()
  if (!hydrated) return
  if (timer) {
    clearTimeout(timer)
    timer = null
  }

  const run = async () => {
    const my = ++gen
    useDraft.setState({ saving: true, saveError: null })
    try {
      const res = await fetch("/api/me/config", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(useDraft.getState().config),
      })
      const data = (await res.json()) as ServerDraft & { error?: string; suggestion?: string }
      if (my !== gen) return
      if (!res.ok) {
        useDraft.setState({
          saving: false,
          saveError: data.error || "save_failed",
        })
        if (data.suggestion) useDraft.getState().setSlug(data.suggestion)
        return
      }
      useDraft.getState().applyServer(data)
      lastSaved = snapshot(useDraft.getState().config)
      useDraft.setState({ saving: false, saveError: null, dirty: false })
    } catch {
      if (my !== gen) return
      useDraft.setState({ saving: false, saveError: "save_failed" })
    }
  }

  if (immediate) return run()
  timer = setTimeout(() => {
    void run()
  }, 1500)
}

export function usePersistDraft() {
  const hydrated = useDraft((s) => s.hydrated)
  const config = useDraft((s) => s.config)
  const prevLook = useRef({ template: config.template, theme: config.theme, font: config.font })
  const skip = useRef(true)

  useEffect(() => {
    if (!hydrated) return
    if (skip.current) {
      skip.current = false
      lastSaved = snapshot(config)
      prevLook.current = { template: config.template, theme: config.theme, font: config.font }
      return
    }
    if (snapshot(config) === lastSaved) return
    useDraft.setState({ dirty: true })
    const instant =
      prevLook.current.template !== config.template ||
      prevLook.current.theme !== config.theme ||
      prevLook.current.font !== config.font
    prevLook.current = { template: config.template, theme: config.theme, font: config.font }
    void saveConfig(instant)
  }, [hydrated, config])
}
