"use client"

import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { FiCopy, FiEye, FiExternalLink, FiMonitor, FiSmartphone } from "react-icons/fi"
import { isPhoneStubSlug } from "@mfd/schema"
import { themes } from "@mfd/tokens"
import { DetailsStep } from "./DetailsStep"
import { FontStep } from "./FontStep"
import { LeadsStep } from "./LeadsStep"
import { usePersistDraft, saveConfig } from "./persist"
import { PreviewFrame } from "./PreviewFrame"
import { PublishModal, PublishStep } from "./PublishModal"
import { ReviewStep } from "./ReviewStep"
import { SectionsStep } from "./SectionsStep"
import { STEPS, useDraft, type ServerDraft, type StepId } from "./store"
import * as U from "./styles"
import { TemplateStep } from "./TemplateStep"
import { ThemeStep } from "./ThemeStep"
import { OtpForm } from "../signup/OtpForm"

const NEXT: Partial<Record<StepId, StepId>> = {
  details: "template",
  template: "theme",
  theme: "font",
  font: "sections",
  sections: "review",
}

function StepBody({ onOpenPublish }: { onOpenPublish: () => void }) {
  const step = useDraft((s) => s.step)
  if (step === "details") return <DetailsStep />
  if (step === "template") return <TemplateStep />
  if (step === "theme") return <ThemeStep />
  if (step === "font") return <FontStep />
  if (step === "sections") return <SectionsStep />
  if (step === "leads") return <LeadsStep />
  if (step === "publish") return <PublishStep onOpen={onOpenPublish} />
  return <ReviewStep onPublish={onOpenPublish} />
}

function AddonsRail() {
  const on = useDraft((s) => s.config.addons.includes("tools"))
  const setToolsPack = useDraft((s) => s.setToolsPack)
  return (
    <U.Rail>
      <U.RailKicker>Add-ons</U.RailKicker>
      <U.AddonCard $on={on}>
        <U.AddonName>Tools pack</U.AddonName>
        <U.AddonCopy>
          Extra investor calculators on the Calculators section. Preview shows them immediately.
          The live site only includes them after you pay.
        </U.AddonCopy>
        <U.AddonBtn type="button" $on={on} onClick={() => setToolsPack(!on)}>
          {on ? "Remove" : "Add"}
        </U.AddonBtn>
      </U.AddonCard>
    </U.Rail>
  )
}

function SiteChrome() {
  const publicUrl = useDraft((s) => s.publicUrl)
  const saving = useDraft((s) => s.saving)
  const dirty = useDraft((s) => s.dirty)
  const saveError = useDraft((s) => s.saveError)
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (!publicUrl) return
    await navigator.clipboard.writeText(publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!publicUrl) return null
  return (
    <U.SiteChrome>
      {saveError ? (
        <U.SaveBtn type="button" $err onClick={() => void saveConfig(true)}>
          Save failed — retry
        </U.SaveBtn>
      ) : saving ? (
        <U.SaveHint>Saving…</U.SaveHint>
      ) : dirty ? (
        <U.SaveBtn type="button" onClick={() => void saveConfig(true)}>
          Save changes
        </U.SaveBtn>
      ) : (
        <U.SaveHint>Saved</U.SaveHint>
      )}
      <U.UrlText title={publicUrl}>{publicUrl.replace(/^https?:\/\//, "")}</U.UrlText>
      <U.ChromeBtn as="button" type="button" onClick={() => void copy()} aria-label="Copy URL">
        <FiCopy size={14} />
        {copied ? "Copied" : "Copy"}
      </U.ChromeBtn>
      <U.ChromeBtn href={publicUrl} target="_blank" rel="noreferrer">
        <FiExternalLink size={14} />
        Open
      </U.ChromeBtn>
    </U.SiteChrome>
  )
}

function Editor() {
  const step = useDraft((s) => s.step)
  const setStep = useDraft((s) => s.setStep)
  const viewport = useDraft((s) => s.viewport)
  const setViewport = useDraft((s) => s.setViewport)
  const previewOpen = useDraft((s) => s.previewOpen)
  const setPreviewOpen = useDraft((s) => s.setPreviewOpen)
  const slug = useDraft((s) => s.config.slug)
  const slugLocked = useDraft((s) => s.slugLocked)
  const status = useDraft((s) => s.status)
  const trialEndsAt = useDraft((s) => s.trialEndsAt)
  const impersonating = useDraft((s) => s.impersonating)
  const [publishOpen, setPublishOpen] = useState(false)
  const next = NEXT[step]
  const yours = slugLocked || status !== "draft" || !isPhoneStubSlug(slug)
  usePersistDraft()
  const trialUntil = trialEndsAt
    ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(trialEndsAt))
    : null

  function openPublish() {
    setStep("publish")
    setPublishOpen(true)
  }

  return (
    <U.Shell>
      <U.Chrome>
      <U.Top>
        <U.BrandMark>
          <U.BrandName>Advisorkhoj</U.BrandName>
          <U.BrandSub>{yours ? "Your site" : "Buyer Place"}</U.BrandSub>
        </U.BrandMark>
        <SiteChrome />
        <U.TopGrow />
        <U.GhostBtn type="button" onClick={() => setPreviewOpen(!previewOpen)}>
          <FiEye size={14} aria-hidden />
          {previewOpen ? "Hide preview" : "Show preview"}
        </U.GhostBtn>
        <U.Seg>
          <U.SegBtn type="button" $on={viewport === "mobile"} onClick={() => setViewport("mobile")}>
            <FiSmartphone size={14} aria-hidden />
            Mobile
          </U.SegBtn>
          <U.SegBtn type="button" $on={viewport === "desktop"} onClick={() => setViewport("desktop")}>
            <FiMonitor size={14} aria-hidden />
            Desktop
          </U.SegBtn>
        </U.Seg>
        <U.PayBtn type="button" onClick={openPublish}>
          Publish
        </U.PayBtn>
      </U.Top>
      {impersonating ? (
        <U.TrialBanner $warn>
          Ops impersonation — you are editing this distributor’s site.{" "}
          <a href="/admin">Back to ops</a>
        </U.TrialBanner>
      ) : null}
      {status === "trial" ? (
        <U.TrialBanner>
          Trial is live{trialUntil ? ` until ${trialUntil}` : ""}. Publish a plan to keep the site up and put
          Tools pack on the public URL.
        </U.TrialBanner>
      ) : null}
      {status === "suspended" ? (
        <U.TrialBanner $warn>Public site is down. Publish a plan to restore it. Your pages are kept.</U.TrialBanner>
      ) : null}
      </U.Chrome>
      <U.Body>
        <U.Left>
          <U.Steps aria-label="Steps">
            {STEPS.map((s) => (
              <U.StepBtn
                key={s.id}
                type="button"
                $on={s.id === step}
                onClick={() => {
                  setStep(s.id)
                  if (s.id === "publish") setPublishOpen(true)
                }}
              >
                <U.StepN $on={s.id === step}>{s.n}</U.StepN>
                {s.label}
              </U.StepBtn>
            ))}
          </U.Steps>
          <U.StepPanel>
            <StepBody onOpenPublish={openPublish} />
            {next ? (
              <U.NextRow>
                <U.NextBtn
                  type="button"
                  onClick={() => {
                    setStep(next)
                    if (next === "publish") setPublishOpen(true)
                  }}
                >
                  Next
                </U.NextBtn>
              </U.NextRow>
            ) : null}
          </U.StepPanel>
        </U.Left>
        <PreviewFrame />
        <AddonsRail />
      </U.Body>
      <PublishModal open={publishOpen} onClose={() => setPublishOpen(false)} />
    </U.Shell>
  )
}

export function PlaceApp() {
  const hydrate = useDraft((s) => s.hydrate)
  const [gate, setGate] = useState<"loading" | "auth" | "ready">("loading")

  async function load() {
    const res = await fetch("/api/me/config")
    if (res.status === 401) {
      setGate("auth")
      return
    }
    if (!res.ok) {
      setGate("auth")
      return
    }
    const data = (await res.json()) as ServerDraft
    hydrate(data)
    setGate("ready")
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount
  }, [])

  return (
    <ThemeProvider theme={themes.slate}>
      <U.EditorGlobal />
      {gate === "loading" ? (
        <U.Marketing>
          <U.StepLead>Loading your draft…</U.StepLead>
        </U.Marketing>
      ) : null}
      {gate === "auth" ? (
        <U.Marketing>
          <U.BrandMark>
            <U.BrandName>Advisorkhoj</U.BrandName>
            <U.BrandSub>Buyer Place</U.BrandSub>
          </U.BrandMark>
          <OtpForm
            onAuthed={() => {
              void load()
            }}
          />
        </U.Marketing>
      ) : null}
      {gate === "ready" ? <Editor /> : null}
    </ThemeProvider>
  )
}
