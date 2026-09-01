"use client"

import { useEffect, useRef } from "react"
import { useDraft, type ServerDraft } from "./store"

let timer: ReturnType<typeof setTimeout> | null = null
let gen = 0
let lastSaved = ""

function snapshot(config: unknown) {
  return JSON.stringify(config)
}

function saveMessage(error?: string) {
  if (error === "invalid_config") return "Could not save — check empty credentials, stats, or quotes."
  if (error === "slug_taken") return "That URL is taken. Try another."
  if (error === "reserved_slug") return "That URL is reserved. Try another."
  return "Save failed — retry"
}

export async function saveConfig(immediate = false): Promise<boolean> {
  const { hydrated } = useDraft.getState()
  if (!hydrated) return true
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
      if (my !== gen) return false
      if (!res.ok) {
        useDraft.setState({
          saving: false,
          saveError: saveMessage(data.error),
        })
        if (data.suggestion) useDraft.getState().setSlug(data.suggestion)
        return false
      }
      useDraft.getState().applyServer(data)
      lastSaved = snapshot(useDraft.getState().config)
      useDraft.setState({ saving: false, saveError: null, dirty: false })
      return true
    } catch {
      if (my !== gen) return false
      useDraft.setState({ saving: false, saveError: saveMessage() })
      return false
    }
  }

  if (immediate) return run()
  timer = setTimeout(() => {
    void run()
  }, 800)
  return true
}

function flushKeepalive() {
  const s = useDraft.getState()
  if (!s.hydrated || !s.dirty) return
  try {
    void fetch("/api/me/config", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(s.config),
      keepalive: true,
    })
  } catch {
    /* page is closing */
  }
}

export function usePersistDraft() {
  const hydrated = useDraft((s) => s.hydrated)
  const config = useDraft((s) => s.config)
  const prevLook = useRef({
    family: config.family,
    pickedFamily: config.pickedFamily,
    template: config.template,
    theme: config.theme,
    font: config.font,
    addons: config.addons.join(","),
  })
  const skip = useRef(true)

  useEffect(() => {
    function onHide() {
      if (document.visibilityState === "hidden") flushKeepalive()
    }
    window.addEventListener("pagehide", flushKeepalive)
    document.addEventListener("visibilitychange", onHide)
    return () => {
      window.removeEventListener("pagehide", flushKeepalive)
      document.removeEventListener("visibilitychange", onHide)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (skip.current) {
      skip.current = false
      lastSaved = snapshot(config)
      prevLook.current = {
        family: config.family,
        pickedFamily: config.pickedFamily,
        template: config.template,
        theme: config.theme,
        font: config.font,
        addons: config.addons.join(","),
      }
      return
    }
    if (snapshot(config) === lastSaved) return
    useDraft.setState({ dirty: true })
    const key = config.addons.join(",")
    const instant =
      prevLook.current.family !== config.family ||
      prevLook.current.pickedFamily !== config.pickedFamily ||
      prevLook.current.template !== config.template ||
      prevLook.current.theme !== config.theme ||
      prevLook.current.font !== config.font ||
      prevLook.current.addons !== key
    prevLook.current = {
      family: config.family,
      pickedFamily: config.pickedFamily,
      template: config.template,
      theme: config.theme,
      font: config.font,
      addons: key,
    }
    void saveConfig(instant)
  }, [hydrated, config])
}
