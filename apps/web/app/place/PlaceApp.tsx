"use client"

import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { FiCopy, FiEye, FiExternalLink, FiMonitor, FiSmartphone } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa6"
import { ADDON_LABEL, ADDON_PRICE, addonIds, familyIds, familyMeta, formatInr, isPhoneStubSlug, type AddonId } from "@mfd/schema"
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
import { TemplateGallery } from "./TemplateGallery"
import { ThemeStep } from "./ThemeStep"
import { OtpForm } from "../signup/OtpForm"

const NEXT: Partial<Record<StepId, StepId>> = {
  details: "theme",
  theme: "font",
  font: "sections",
  sections: "review",
}

function StepBody({ onOpenPublish }: { onOpenPublish: () => void }) {
  const step = useDraft((s) => s.step)
  if (step === "details") return <DetailsStep />
  if (step === "theme") return <ThemeStep />
  if (step === "font") return <FontStep />
  if (step === "sections") return <SectionsStep />
  if (step === "leads") return <LeadsStep />
  if (step === "publish") return <PublishStep onOpen={onOpenPublish} />
  return <ReviewStep onPublish={onOpenPublish} />
}

function AddonsRail() {
  const addons = useDraft((s) => s.config.addons)
  const setAddon = useDraft((s) => s.setAddon)
  return (
    <U.Rail>
      <U.RailKicker>Add-ons</U.RailKicker>
      {addonIds.map((id) => {
        const on = addons.includes(id)
        return (
          <U.AddonCard key={id} $on={on}>
            <U.AddonName>{ADDON_LABEL[id]}</U.AddonName>
            <U.AddonCopy>{ADDON_BLURB[id]}</U.AddonCopy>
            <U.AddonPrice>
              +{formatInr(ADDON_PRICE[id].monthly)} / month · +{formatInr(ADDON_PRICE[id].yearly)} / year
            </U.AddonPrice>
            <U.AddonBtn type="button" $on={on} onClick={() => setAddon(id, !on)}>
              {on ? "Remove" : "Add"}
            </U.AddonBtn>
          </U.AddonCard>
        )
      })}
    </U.Rail>
  )
}

const ADDON_BLURB: Record<AddonId, string> = {
  tools:
    "Extra investor calculators on the Calculators section. They show in preview now, and on the live site once the site is published.",
  bilingual:
    "English and Hindi on the site: header toggle, and Hindi fields in Details and Sections. They show in preview now, and on the live site once the site is published.",
}

const SALES_WA =
  "https://wa.me/919611235245?text=" +
  encodeURIComponent("Hi Advisorkhoj — I need a custom MFD site beyond Buyer Place.")

function CustomSiteBar({ dock }: { dock?: boolean }) {
  return (
    <U.CustomBar $dock={dock}>
      <U.CustomCopy>
        <strong>Want a custom site?</strong>
        <U.CustomMore>
          {" "}
          Extra pages, a unique layout, or work this builder doesn’t cover — we’ll build it for you.
        </U.CustomMore>
      </U.CustomCopy>
      <U.CustomCta href={SALES_WA} target="_blank" rel="noreferrer">
        <FaWhatsapp size={14} aria-hidden />
        Talk to us
      </U.CustomCta>
    </U.CustomBar>
  )
}

function FamilySwitch({ onBrowse }: { onBrowse: () => void }) {
  const family = useDraft((s) => s.config.family ?? "classic")
  const setFamily = useDraft((s) => s.setFamily)
  const focusPreview = useDraft((s) => s.focusPreview)
  return (
    <U.Seg aria-label="Template">
      {familyIds.map((id) => (
        <U.SegBtn
          key={id}
          type="button"
          $on={family === id}
          onClick={() => {
            setFamily(id)
            focusPreview("top")
          }}
        >
          {familyMeta[id].name}
        </U.SegBtn>
      ))}
      <U.SegBtn type="button" $on={false} onClick={onBrowse}>
        All
      </U.SegBtn>
    </U.Seg>
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
          {saveError}
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
  const pickedFamily = useDraft((s) => s.config.pickedFamily)
  const [publishOpen, setPublishOpen] = useState(false)
  const [browse, setBrowse] = useState(false)
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

  if (pickedFamily === false || browse) {
    return (
      <>
        <TemplateGallery browsing={browse} onPicked={() => setBrowse(false)} />
        <CustomSiteBar />
      </>
    )
  }

  return (
    <U.Shell>
      <U.Chrome>
        <U.Top>
          <U.BrandMark>
            <U.BrandName>Advisorkhoj</U.BrandName>
            <U.BrandSub>{yours ? "Your site" : "Buyer Place"}</U.BrandSub>
          </U.BrandMark>
          <FamilySwitch onBrowse={() => setBrowse(true)} />
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
            Trial is live{trialUntil ? ` until ${trialUntil}` : ""}. Publish a plan to keep the site up after the
            trial.
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
                  void saveConfig(true)
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
                    void saveConfig(true)
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
      <CustomSiteBar />
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
