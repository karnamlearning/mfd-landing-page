"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { FiUpload } from "react-icons/fi"
import type { TenantDetails } from "@mfd/schema"
import { blank, useDraft } from "./store"
import * as U from "./styles"

const PRESET_LANGS = ["English", "Hindi"] as const
const BANNED = /financial planner|guaranteed|assured returns/i

function AssetField({
  label,
  value,
  onUrl,
}: {
  label: string
  value: string | undefined
  onUrl: (url: string | undefined) => void
}) {
  const prev = useRef<string | undefined>(value)

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    if (prev.current?.startsWith("blob:")) URL.revokeObjectURL(prev.current)
    const url = URL.createObjectURL(file)
    prev.current = url
    onUrl(url)
  }

  function clear() {
    if (prev.current?.startsWith("blob:")) URL.revokeObjectURL(prev.current)
    prev.current = undefined
    onUrl(undefined)
  }

  return (
    <U.Field>
      <U.LabelRow>
        {label}
        {blank(value) ? <U.SampleTag>Sample</U.SampleTag> : null}
      </U.LabelRow>
      {!blank(value) ? <U.Thumb src={value} alt="" /> : null}
      <U.FileRow>
        <U.FileBtn>
          <FiUpload size={12} aria-hidden />
          Upload
          <input type="file" accept="image/*" onChange={onFile} />
        </U.FileBtn>
        {!blank(value) ? (
          <U.ClearBtn type="button" onClick={clear}>
            Remove
          </U.ClearBtn>
        ) : null}
      </U.FileRow>
    </U.Field>
  )
}

export function DetailsStep() {
  const details = useDraft((s) => s.config.details)
  const local = useDraft((s) => s.config.template === "local")
  const patch = useDraft((s) => s.patchDetails)
  const [langDraft, setLangDraft] = useState("")
  const d = details

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

  return (
    <>
      <U.StepTitle>Your details</U.StepTitle>
      <U.StepLead>Empty fields stay filled with sample data in the preview until you type.</U.StepLead>

      <U.Field>
        <U.LabelRow>
          Display name
          {blank(d.name) ? <U.SampleTag>Sample</U.SampleTag> : null}
        </U.LabelRow>
        <U.Input
          value={d.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Rahul Sharma"
          autoComplete="organization"
        />
      </U.Field>

      <AssetField label="Logo" value={d.logoUrl} onUrl={(url) => set("logoUrl", url)} />
      <AssetField label="Photo" value={d.photoUrl} onUrl={(url) => set("photoUrl", url)} />
      <AssetField label="Hero image" value={d.heroImageUrl} onUrl={(url) => set("heroImageUrl", url)} />

      <U.Field>
        <U.LabelRow>
          Hero headline
          {blank(d.heroHeadline) ? <U.SampleTag>Sample</U.SampleTag> : null}
        </U.LabelRow>
        <U.Input
          value={d.heroHeadline ?? ""}
          maxLength={90}
          onChange={(e) => set("heroHeadline", e.target.value)}
        />
        <U.Hint>{(d.heroHeadline ?? "").length}/90</U.Hint>
      </U.Field>

      <U.Field>
        <U.LabelRow>
          One-line pitch
          {blank(d.pitch) ? <U.SampleTag>Sample</U.SampleTag> : null}
        </U.LabelRow>
        <U.Area
          rows={2}
          maxLength={160}
          value={d.pitch ?? ""}
          onChange={(e) => set("pitch", e.target.value)}
        />
        <U.Hint>{(d.pitch ?? "").length}/160</U.Hint>
      </U.Field>

      <U.Group>
        <U.GroupTitle>Contact</U.GroupTitle>
        <U.Field>
          <U.LabelRow>
            WhatsApp number
            {blank(d.whatsapp) ? <U.SampleTag>Sample</U.SampleTag> : null}
          </U.LabelRow>
          <U.Input
            value={d.whatsapp}
            inputMode="tel"
            autoComplete="tel"
            onChange={(e) => set("whatsapp", e.target.value)}
            placeholder="98765 43210"
          />
        </U.Field>
        <U.Field>
          Call number
          <U.Input
            value={d.phone ?? ""}
            inputMode="tel"
            onChange={(e) => set("phone", e.target.value)}
            placeholder="Same as WhatsApp if empty"
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
        <U.Field>
          Office hours
          <U.Input
            value={d.hours ?? ""}
            onChange={(e) => set("hours", e.target.value)}
            placeholder="Mon–Sat 10am–6pm"
          />
        </U.Field>
      </U.Group>

      <U.Group>
        <U.GroupTitle>About</U.GroupTitle>
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
          <U.Hint>Do not use “financial planner”, “guaranteed”, or “assured returns”.</U.Hint>
          {bioWarn ? <U.Warn>That phrase is risky under AMFI rules — consider rephrasing.</U.Warn> : null}
        </U.Field>
        {local ? (
          <U.Field>
            Bio (Hindi)
            <U.Area rows={3} maxLength={400} value={d.bioHi ?? ""} onChange={(e) => set("bioHi", e.target.value)} />
          </U.Field>
        ) : null}
        <U.Field>
          ARN (optional, not verified)
          <U.Input value={d.arn ?? ""} onChange={(e) => set("arn", e.target.value)} placeholder="123456" />
        </U.Field>
      </U.Group>

      <U.Group>
        <U.LabelRow>
          <U.GroupTitle>Credentials</U.GroupTitle>
          {d.credentials.length === 0 ? <U.SampleTag>Sample</U.SampleTag> : null}
        </U.LabelRow>
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
          onClick={() =>
            set("credentials", [...d.credentials, { label: "AMFI ARN", name: d.name || "", number: "" }])
          }
        >
          + Add credential
        </U.AddLink>
      </U.Group>

      <U.Group>
        <U.LabelRow>
          <U.GroupTitle>Stats</U.GroupTitle>
          {d.stats.length === 0 ? <U.SampleTag>Sample</U.SampleTag> : null}
        </U.LabelRow>
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
          <U.AddLink type="button" onClick={() => set("stats", [...d.stats, { value: "", label: "" }])}>
            + Add stat
          </U.AddLink>
        ) : null}
      </U.Group>
    </>
  )
}
