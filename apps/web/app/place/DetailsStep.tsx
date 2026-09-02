"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { FiUpload } from "react-icons/fi"
import { familyOf, templateOf, type TenantDetails } from "@mfd/schema"
import { saveConfig } from "./persist"
import { PhoneNumber } from "./PhoneNumber"
import { blank, useDraft } from "./store"
import { ShowOnSite, spot } from "./preview"
import * as U from "./styles"

type AssetKind = "logo" | "photo" | "hero"

const PRESET_LANGS = ["English", "Hindi"] as const
const BANNED = /financial planner|financial planning|guaranteed|assured returns/i

function AssetField({
  label,
  kind,
  value,
  onUrl,
}: {
  label: string
  kind: AssetKind
  value: string | undefined
  onUrl: (url: string | undefined) => void
}) {
  const prev = useRef<string | undefined>(value)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const previewId = kind === "logo" ? "header" : kind === "photo" ? "photo" : "top"

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    setErr(null)
    setBusy(true)
    const fd = new FormData()
    fd.append("file", file)
    fd.append("kind", kind)
    try {
      const res = await fetch("/api/me/assets", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok || typeof data.url !== "string") {
        setErr("Upload failed. Try a smaller image.")
        return
      }
      if (prev.current?.startsWith("blob:")) URL.revokeObjectURL(prev.current)
      prev.current = data.url
      onUrl(data.url)
      useDraft.getState().focusPreview(previewId)
      void saveConfig(true)
    } catch {
      setErr("Upload failed.")
    } finally {
      setBusy(false)
    }
  }

  function clear() {
    if (prev.current?.startsWith("blob:")) URL.revokeObjectURL(prev.current)
    prev.current = undefined
    onUrl(undefined)
  }

  return (
    <U.Field {...spot(previewId)}>
      <U.LabelRow>
        <U.LabelLeft>
          {label}
          {blank(value) ? <U.SampleTag>Preview only</U.SampleTag> : null}
        </U.LabelLeft>
        <ShowOnSite id={previewId} />
      </U.LabelRow>
      {!blank(value) ? <U.Thumb src={value} alt="" /> : null}
      <U.FileRow>
        <U.FileBtn>
          <FiUpload size={12} aria-hidden />
          {busy ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" onChange={(e) => void onFile(e)} disabled={busy} />
        </U.FileBtn>
        {!blank(value) ? (
          <U.ClearBtn type="button" onClick={clear}>
            Remove
          </U.ClearBtn>
        ) : null}
      </U.FileRow>
      {err ? <U.Warn>{err}</U.Warn> : null}
    </U.Field>
  )
}

export function DetailsStep() {
  const details = useDraft((s) => s.config.details)
  const bilingual = useDraft((s) => s.config.addons.includes("bilingual"))
  const family = useDraft((s) => familyOf(s.config))
  const variant = useDraft((s) => templateOf(s.config))
  const patch = useDraft((s) => s.patchDetails)
  const [langDraft, setLangDraft] = useState("")
  const d = details
  const showPhoto = family !== "capital" || variant === "solo"
  const showHero = family !== "capital"

  function set<K extends keyof TenantDetails>(key: K, value: TenantDetails[K]) {
    patch({ [key]: value } as Partial<TenantDetails>)
  }

  function toggleLang(lang: string) {
    const has = d.languages.includes(lang)
    set(
      "languages",
      has ? d.languages.filter((x) => x !== lang) : [...d.languages, lang],
    )
  }

  function addCustomLang(e: FormEvent) {
    e.preventDefault()
    const lang = langDraft.trim()
    if (!lang || d.languages.includes(lang)) return
    set("languages", [...d.languages, lang])
    setLangDraft("")
  }

  const bioWarn = d.bio && BANNED.test(d.bio)
  const bioHiWarn = d.bioHi && BANNED.test(d.bioHi)

  return (
    <div
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null
        if (next && e.currentTarget.contains(next)) return
        void saveConfig(true)
      }}
    >
      <U.StepTitle>Your details</U.StepTitle>
      <U.StepLead>
        Empty fields stay filled with sample data in the preview until you type.
        {showPhoto || showHero
          ? " Photos only appear on the live site after you upload them."
          : ""}{" "}
        Click a field, or <strong>On site</strong>, to jump to that place on the preview.
      </U.StepLead>

      <U.Field {...spot("header")}>
        <U.LabelRow>
          <U.LabelLeft>
            Display name
            {blank(d.name) ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelLeft>
          <ShowOnSite id="header" />
        </U.LabelRow>
        <U.Input
          value={d.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Rahul Sharma"
          autoComplete="organization"
        />
      </U.Field>

      <AssetField label="Logo" kind="logo" value={d.logoUrl} onUrl={(url) => set("logoUrl", url)} />
      {showPhoto ? (
        <AssetField label="Photo" kind="photo" value={d.photoUrl} onUrl={(url) => set("photoUrl", url)} />
      ) : null}
      {showHero ? (
        <AssetField label="Hero image" kind="hero" value={d.heroImageUrl} onUrl={(url) => set("heroImageUrl", url)} />
      ) : null}

      <U.Field {...spot("top")}>
        <U.LabelRow>
          <U.LabelLeft>
            Hero headline
            {blank(d.heroHeadline) ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelLeft>
          <ShowOnSite id="top" />
        </U.LabelRow>
        <U.Input
          value={d.heroHeadline ?? ""}
          maxLength={90}
          onChange={(e) => set("heroHeadline", e.target.value)}
        />
        <U.Hint>{(d.heroHeadline ?? "").length}/90</U.Hint>
      </U.Field>

      <U.Field {...spot("top")}>
        <U.LabelRow>
          <U.LabelLeft>
            One-line pitch
            {blank(d.pitch) ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelLeft>
          <ShowOnSite id="top" />
        </U.LabelRow>
        <U.Area
          rows={2}
          maxLength={160}
          value={d.pitch ?? ""}
          onChange={(e) => set("pitch", e.target.value)}
        />
        <U.Hint>{(d.pitch ?? "").length}/160</U.Hint>
      </U.Field>

      <U.Group {...spot("contact")}>
        <U.GroupHead>
          <U.GroupTitle>Contact</U.GroupTitle>
          <ShowOnSite id="contact" />
        </U.GroupHead>
        <U.Field>
          <U.LabelRow>
            WhatsApp number
            {blank(d.whatsapp) ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelRow>
          <PhoneNumber
            value={d.whatsapp}
            onChange={(value) => set("whatsapp", value)}
            aria-label="WhatsApp number"
          />
        </U.Field>
        <U.Field>
          Call number
          <PhoneNumber
            value={d.phone ?? ""}
            onChange={(value) => set("phone", value)}
            aria-label="Call number"
          />
          <U.Hint>Defaults to WhatsApp if you leave this blank.</U.Hint>
        </U.Field>
        <U.Field>
          Email
          <U.Input
            type="email"
            value={d.email ?? ""}
            autoComplete="email"
            onChange={(e) => set("email", e.target.value)}
          />
        </U.Field>
        <U.Field>
          <U.LabelRow>
            City
            {blank(d.city) ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelRow>
          <U.Input
            value={d.city}
            autoComplete="address-level2"
            onChange={(e) => set("city", e.target.value)}
            placeholder="Pune"
          />
        </U.Field>
        <U.Field>
          Address
          <U.Input
            value={d.address ?? ""}
            autoComplete="street-address"
            onChange={(e) => set("address", e.target.value)}
            placeholder="City is enough if empty"
          />
        </U.Field>
      </U.Group>

      <U.Group {...spot("about")}>
        <U.GroupHead>
          <U.GroupTitle>About</U.GroupTitle>
          <ShowOnSite id="about" />
        </U.GroupHead>
        <U.Field>
          Languages spoken
          <U.Chips>
            {PRESET_LANGS.map((lang) => (
              <U.Chip key={lang} type="button" $on={d.languages.includes(lang)} onClick={() => toggleLang(lang)}>
                {lang}
              </U.Chip>
            ))}
            {d.languages
              .filter((lang) => !(PRESET_LANGS as readonly string[]).includes(lang))
              .map((lang) => (
                <U.Chip key={lang} type="button" $on onClick={() => toggleLang(lang)}>
                  {lang}
                </U.Chip>
              ))}
          </U.Chips>
          <U.FileRow as="form" onSubmit={addCustomLang}>
            <U.Input
              value={langDraft}
              onChange={(e) => setLangDraft(e.target.value)}
              placeholder="Add a language"
            />
            <U.ClearBtn type="submit">Add</U.ClearBtn>
          </U.FileRow>
        </U.Field>
        <U.Field>
          Office hours
          <U.Input
            value={d.hours ?? ""}
            onChange={(e) => set("hours", e.target.value)}
            placeholder="Mon–Sat 10am–6pm"
          />
        </U.Field>
        <U.Field>
          <U.LabelRow>
            Bio
            {blank(d.bio) ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelRow>
          <U.Area
            rows={4}
            maxLength={400}
            value={d.bio ?? ""}
            onChange={(e) => set("bio", e.target.value)}
          />
          <U.Hint>Do not use “financial planner”, “financial planning”, “guaranteed”, or “assured returns”.</U.Hint>
          {bioWarn ? <U.Warn>That phrase is risky under AMFI rules — consider rephrasing.</U.Warn> : null}
        </U.Field>
        {bilingual ? (
          <U.Field>
            Bio (Hindi)
            <U.Area rows={3} maxLength={400} value={d.bioHi ?? ""} onChange={(e) => set("bioHi", e.target.value)} />
            {bioHiWarn ? <U.Warn>That phrase is risky under AMFI rules — consider rephrasing.</U.Warn> : null}
          </U.Field>
        ) : null}
        <U.Field>
          ARN (optional, not verified)
          <U.Input value={d.arn ?? ""} onChange={(e) => set("arn", e.target.value)} placeholder="123456" />
        </U.Field>
      </U.Group>

      <U.Group {...spot("credentials")}>
        <U.GroupHead>
          <U.LabelLeft>
            <U.GroupTitle>Credentials</U.GroupTitle>
            {d.credentials.length === 0 ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelLeft>
          <ShowOnSite id="credentials" />
        </U.GroupHead>
        {d.credentials.map((row, i) => (
          <U.RowCard key={i}>
            <U.Field>
              Label
              <U.Input
                value={row.label}
                onChange={(e) => {
                  const next = d.credentials.slice()
                  next[i] = { ...row, label: e.target.value }
                  set("credentials", next)
                }}
                placeholder="AMFI ARN"
              />
            </U.Field>
            <U.Field>
              Name
              <U.Input
                value={row.name}
                onChange={(e) => {
                  const next = d.credentials.slice()
                  next[i] = { ...row, name: e.target.value }
                  set("credentials", next)
                }}
              />
            </U.Field>
            <U.Field>
              Number
              <U.Input
                value={row.number}
                onChange={(e) => {
                  const next = d.credentials.slice()
                  next[i] = { ...row, number: e.target.value }
                  set("credentials", next)
                }}
              />
            </U.Field>
            <U.ClearBtn
              type="button"
              onClick={() => set("credentials", d.credentials.filter((_, j) => j !== i))}
            >
              Remove
            </U.ClearBtn>
          </U.RowCard>
        ))}
        <U.AddLink
          type="button"
          onClick={() => {
            useDraft.getState().ensureSectionOn("credentials")
            useDraft.getState().focusPreview("credentials")
            set("credentials", [...d.credentials, { label: "AMFI ARN", name: d.name || "", number: "" }])
          }}
        >
          + Add credential
        </U.AddLink>
      </U.Group>

      <U.Group {...spot("stats")}>
        <U.GroupHead>
          <U.LabelLeft>
            <U.GroupTitle>Stats</U.GroupTitle>
            {d.stats.length === 0 ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelLeft>
          <ShowOnSite id="stats" />
        </U.GroupHead>
        {d.stats.map((row, i) => (
          <U.RowCard key={i}>
            <U.Field>
              Number
              <U.Input
                value={row.value}
                onChange={(e) => {
                  const next = d.stats.slice()
                  next[i] = { ...row, value: e.target.value }
                  set("stats", next)
                }}
                placeholder="150+"
              />
            </U.Field>
            <U.Field>
              Label
              <U.Input
                value={row.label}
                onChange={(e) => {
                  const next = d.stats.slice()
                  next[i] = { ...row, label: e.target.value }
                  set("stats", next)
                }}
                placeholder="Happy families"
              />
            </U.Field>
            <U.ClearBtn type="button" onClick={() => set("stats", d.stats.filter((_, j) => j !== i))}>
              Remove
            </U.ClearBtn>
          </U.RowCard>
        ))}
        {d.stats.length < 3 ? (
          <U.AddLink
            type="button"
            onClick={() => {
              useDraft.getState().ensureSectionOn("stats")
              useDraft.getState().focusPreview("stats")
              set("stats", [...d.stats, { value: "", label: "" }])
            }}
          >
            + Add stat
          </U.AddLink>
        ) : null}
      </U.Group>
    </div>
  )
}
