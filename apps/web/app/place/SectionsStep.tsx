"use client"

import { useState } from "react"
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FiChevronDown, FiChevronRight, FiEye, FiEyeOff, FiMenu } from "react-icons/fi"
import {
  familyOf,
  lockedSectionIds,
  serviceIds,
  type SectionId,
  type ServiceId,
  type ServiceWording,
  type WordingLine,
} from "@mfd/schema"
import { copy, serviceCopy } from "@mfd/site-kit"
import { saveConfig } from "./persist"
import { blank, useDraft, type PreviewSpot } from "./store"
import { spot } from "./preview"
import * as U from "./styles"

const LABELS: Record<SectionId, string> = {
  hero: "Hero",
  about: "About",
  credentials: "Credentials",
  services: "Services",
  stats: "Stats",
  how: "How I work",
  calculators: "Calculators",
  testimonials: "Testimonials",
  faq: "FAQ",
  contact: "Contact",
  whatsapp_strip: "WhatsApp strip",
}

const CAPITAL_LABELS: Partial<Record<SectionId, string>> = {
  about: "About Us",
  services: "Our Services",
  calculators: "Wealth Calculator",
  testimonials: "Insights",
  faq: "Blog",
}

function sectionLabel(id: SectionId) {
  const family = familyOf(useDraft.getState().config)
  if (family === "capital") return CAPITAL_LABELS[id] ?? LABELS[id]
  return LABELS[id]
}

const SERVICE_LABELS: Record<ServiceId, string> = {
  mutual_funds: "Mutual funds",
  sip: "SIP",
  goals: "Goal-based investing",
  stp_swp: "STP / SWP",
  retirement: "Retirement",
  life_insurance: "Life insurance",
  health_insurance: "Health insurance",
  bonds: "Bonds",
}

const SECTION_SPOT: Record<SectionId, PreviewSpot> = {
  hero: "top",
  about: "about",
  credentials: "credentials",
  services: "services",
  stats: "stats",
  how: "how",
  calculators: "calculators",
  testimonials: "testimonials",
  faq: "faq",
  contact: "contact",
  whatsapp_strip: "whatsapp",
}
const LOCKED = new Set<string>(lockedSectionIds)
const EDITABLE = new Set<SectionId>([
  "hero",
  "about",
  "credentials",
  "services",
  "how",
  "calculators",
  "testimonials",
  "faq",
  "contact",
])
const BANNED = /financial planner|financial planning|guaranteed|assured returns/i
const DEFAULTS = copy.en

function SortableRow({
  id,
  on,
  open,
  onToggle,
  onEdit,
}: {
  id: SectionId
  on: boolean
  open: boolean
  onToggle: () => void
  onEdit: () => void
}) {
  const locked = LOCKED.has(id)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : undefined,
  }

  return (
    <U.SecRow ref={setNodeRef} style={style} $dim={!on}>
      <U.SecMain>
        <U.Handle type="button" aria-label="Reorder" {...attributes} {...listeners}>
          <FiMenu size={15} />
        </U.Handle>
        <U.SecName
          type="button"
          onClick={() => {
            if (!locked) useDraft.getState().ensureSectionOn(id)
            useDraft.getState().focusPreview(SECTION_SPOT[id])
          }}
          title="Show this block on the preview"
        >
          {sectionLabel(id)}
        </U.SecName>
        {EDITABLE.has(id) ? (
          <U.IconBtn type="button" onClick={onEdit} aria-label={`Edit ${sectionLabel(id)}`}>
            {open ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </U.IconBtn>
        ) : null}
        <U.IconBtn
          type="button"
          $muted={!on}
          disabled={locked}
          onClick={onToggle}
          title={locked ? "Always on" : on ? "Hide" : "Show"}
          aria-label={on ? `Hide ${sectionLabel(id)}` : `Show ${sectionLabel(id)}`}
        >
          {on ? <FiEye size={16} /> : <FiEyeOff size={16} />}
        </U.IconBtn>
      </U.SecMain>
      {open ? (
        <div {...spot(SECTION_SPOT[id])}>
          <NestedEditor id={id} />
        </div>
      ) : null}
    </U.SecRow>
  )
}

function NestedEditor({ id }: { id: SectionId }) {
  if (id === "hero") return <HeroEditor />
  if (id === "about") return <AboutEditor />
  if (id === "credentials") return <CredentialsEditor />
  if (id === "services") return <ServicesEditor />
  if (id === "how") return <HowEditor />
  if (id === "calculators") return <CalculatorsEditor />
  if (id === "testimonials") return <TestimonialsEditor />
  if (id === "faq") return <FaqEditor />
  if (id === "contact") return <ContactEditor />
  return null
}

function WordField({
  label,
  value,
  placeholder,
  onChange,
  area,
  maxLength,
  hi,
}: {
  label: string
  value: string | undefined
  placeholder: string
  onChange: (v: string) => void
  area?: boolean
  maxLength?: number
  hi?: boolean
}) {
  const text = value ?? ""
  const warn = text && BANNED.test(text)
  return (
    <U.Field>
      <U.LabelRow>
        {hi ? `${label} (Hindi)` : label}
        {blank(text) ? <U.SampleTag>Default</U.SampleTag> : null}
      </U.LabelRow>
      {area ? (
        <U.Area
          rows={3}
          maxLength={maxLength}
          value={text}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <U.Input
          maxLength={maxLength}
          value={text}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {warn ? <U.Warn>That phrase is risky under AMFI rules — consider rephrasing.</U.Warn> : null}
    </U.Field>
  )
}

function HeroEditor() {
  const wording = useDraft((s) => s.config.wording)
  const name = useDraft((s) => s.config.details.name)
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const patchWording = useDraft((s) => s.patchWording)
  const first = name.trim().split(/\s+/)[0] || "Rahul"
  const cta = DEFAULTS.talkTo(first)

  return (
    <U.Nested>
      <U.Hint>Headline, pitch, and images are in Details. The AMFI tagline in the header stays locked.</U.Hint>
      <WordField
        label="WhatsApp button"
        value={wording.cta}
        placeholder={cta}
        maxLength={40}
        onChange={(v) => patchWording({ cta: v })}
      />
      {local ? (
        <WordField
          label="WhatsApp button"
          hi
          value={wording.ctaHi}
          placeholder={copy.hi.talkTo(first)}
          maxLength={40}
          onChange={(v) => patchWording({ ctaHi: v })}
        />
      ) : null}
    </U.Nested>
  )
}

function AboutEditor() {
  const wording = useDraft((s) => s.config.wording)
  const city = useDraft((s) => s.config.details.city) || "Pune"
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const patchWording = useDraft((s) => s.patchWording)

  return (
    <U.Nested>
      <U.Hint>Bio, photo, city, and hours are in Details.</U.Hint>
      <WordField
        label="About heading"
        value={wording.aboutTitle}
        placeholder={DEFAULTS.aboutTitle(city)}
        maxLength={90}
        onChange={(v) => patchWording({ aboutTitle: v })}
      />
      {local ? (
        <WordField
          label="About heading"
          hi
          value={wording.aboutTitleHi}
          placeholder={copy.hi.aboutTitle(city)}
          maxLength={90}
          onChange={(v) => patchWording({ aboutTitleHi: v })}
        />
      ) : null}
      <WordField
        label="Why-us heading"
        value={wording.whyTitle}
        placeholder={DEFAULTS.whyTitle}
        maxLength={80}
        onChange={(v) => patchWording({ whyTitle: v })}
      />
      {local ? (
        <WordField
          label="Why-us heading"
          hi
          value={wording.whyTitleHi}
          placeholder={copy.hi.whyTitle}
          maxLength={80}
          onChange={(v) => patchWording({ whyTitleHi: v })}
        />
      ) : null}
      <LineList
        stored={wording.why}
        canned={DEFAULTS.why}
        cannedHi={copy.hi.why}
        local={local}
        max={4}
        onChange={(why) => patchWording({ why })}
      />
    </U.Nested>
  )
}

function CredentialsEditor() {
  const wording = useDraft((s) => s.config.wording)
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const patchWording = useDraft((s) => s.patchWording)
  return (
    <U.Nested>
      <U.Hint>ARN rows are in Details. This heading is the only branding line here.</U.Hint>
      <WordField
        label="Heading"
        value={wording.recordTitle}
        placeholder={DEFAULTS.recordTitle}
        maxLength={60}
        onChange={(v) => patchWording({ recordTitle: v })}
      />
      {local ? (
        <WordField
          label="Heading"
          hi
          value={wording.recordTitleHi}
          placeholder={copy.hi.recordTitle}
          maxLength={60}
          onChange={(v) => patchWording({ recordTitleHi: v })}
        />
      ) : null}
    </U.Nested>
  )
}

function ServicesEditor() {
  const selected = useDraft((s) => s.config.services)
  const wording = useDraft((s) => s.config.wording)
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const setServices = useDraft((s) => s.setServices)
  const ensureSectionOn = useDraft((s) => s.ensureSectionOn)
  const patchWording = useDraft((s) => s.patchWording)

  function toggle(id: ServiceId) {
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]
    setServices(next)
    if (next.length) ensureSectionOn("services")
  }

  function patchService(id: ServiceId, patch: ServiceWording) {
    patchWording({
      services: {
        ...wording.services,
        [id]: { ...wording.services?.[id], ...patch },
      },
    })
  }

  return (
    <U.Nested>
      <WordField
        label="Heading"
        value={wording.servicesTitle}
        placeholder={DEFAULTS.servicesTitle}
        maxLength={80}
        onChange={(v) => patchWording({ servicesTitle: v })}
      />
      {local ? (
        <WordField
          label="Heading"
          hi
          value={wording.servicesTitleHi}
          placeholder={copy.hi.servicesTitle}
          maxLength={80}
          onChange={(v) => patchWording({ servicesTitleHi: v })}
        />
      ) : null}
      <WordField
        label="Lead"
        area
        value={wording.servicesLead}
        placeholder={DEFAULTS.servicesLead}
        maxLength={280}
        onChange={(v) => patchWording({ servicesLead: v })}
      />
      {local ? (
        <WordField
          label="Lead"
          hi
          area
          value={wording.servicesLeadHi}
          placeholder={copy.hi.servicesLead}
          maxLength={280}
          onChange={(v) => patchWording({ servicesLeadHi: v })}
        />
      ) : null}
      {serviceIds.map((id) => {
        const on = selected.includes(id)
        const canned = serviceCopy[id]
        const row = wording.services?.[id]
        return (
          <U.RowCard key={id}>
            <U.Tick type="button" $on={on} onClick={() => toggle(id)}>
              <U.TickBox $on={on} />
              {SERVICE_LABELS[id]}
            </U.Tick>
            {on && canned ? (
              <>
                <WordField
                  label="Title"
                  value={row?.title}
                  placeholder={canned.title}
                  maxLength={60}
                  onChange={(v) => patchService(id, { title: v })}
                />
                <WordField
                  label="Copy"
                  area
                  value={row?.body}
                  placeholder={canned.body}
                  maxLength={280}
                  onChange={(v) => patchService(id, { body: v })}
                />
                {local ? (
                  <>
                    <WordField
                      label="Title"
                      hi
                      value={row?.titleHi}
                      placeholder={canned.titleHi}
                      maxLength={60}
                      onChange={(v) => patchService(id, { titleHi: v })}
                    />
                    <WordField
                      label="Copy"
                      hi
                      area
                      value={row?.bodyHi}
                      placeholder={canned.bodyHi}
                      maxLength={280}
                      onChange={(v) => patchService(id, { bodyHi: v })}
                    />
                  </>
                ) : null}
              </>
            ) : null}
          </U.RowCard>
        )
      })}
    </U.Nested>
  )
}

function HowEditor() {
  const wording = useDraft((s) => s.config.wording)
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const patchWording = useDraft((s) => s.patchWording)
  return (
    <U.Nested>
      <WordField
        label="Heading"
        value={wording.howTitle}
        placeholder={DEFAULTS.howTitle}
        maxLength={80}
        onChange={(v) => patchWording({ howTitle: v })}
      />
      {local ? (
        <WordField
          label="Heading"
          hi
          value={wording.howTitleHi}
          placeholder={copy.hi.howTitle}
          maxLength={80}
          onChange={(v) => patchWording({ howTitleHi: v })}
        />
      ) : null}
      <WordField
        label="Lead"
        area
        value={wording.howLead}
        placeholder={DEFAULTS.howLead}
        maxLength={280}
        onChange={(v) => patchWording({ howLead: v })}
      />
      {local ? (
        <WordField
          label="Lead"
          hi
          area
          value={wording.howLeadHi}
          placeholder={copy.hi.howLead}
          maxLength={280}
          onChange={(v) => patchWording({ howLeadHi: v })}
        />
      ) : null}
      <LineList
        stored={wording.how}
        canned={DEFAULTS.how}
        cannedHi={copy.hi.how}
        local={local}
        max={6}
        onChange={(how) => patchWording({ how })}
      />
    </U.Nested>
  )
}

function CalculatorsEditor() {
  const wording = useDraft((s) => s.config.wording)
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const patchWording = useDraft((s) => s.patchWording)
  return (
    <U.Nested>
      <U.Hint>Calculator field labels stay locked. This is the section heading and lead only.</U.Hint>
      <WordField
        label="Heading"
        value={wording.calcTitle}
        placeholder={DEFAULTS.calcTitle}
        maxLength={80}
        onChange={(v) => patchWording({ calcTitle: v })}
      />
      {local ? (
        <WordField
          label="Heading"
          hi
          value={wording.calcTitleHi}
          placeholder={copy.hi.calcTitle}
          maxLength={80}
          onChange={(v) => patchWording({ calcTitleHi: v })}
        />
      ) : null}
      <WordField
        label="Lead"
        area
        value={wording.calcLead}
        placeholder={DEFAULTS.calcLead}
        maxLength={240}
        onChange={(v) => patchWording({ calcLead: v })}
      />
      {local ? (
        <WordField
          label="Lead"
          hi
          area
          value={wording.calcLeadHi}
          placeholder={copy.hi.calcLead}
          maxLength={240}
          onChange={(v) => patchWording({ calcLeadHi: v })}
        />
      ) : null}
    </U.Nested>
  )
}

function ContactEditor() {
  const wording = useDraft((s) => s.config.wording)
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const patchWording = useDraft((s) => s.patchWording)
  return (
    <U.Nested>
      <U.Hint>Address, phone, and the form labels come from Details. The footer disclaimer stays locked.</U.Hint>
      <WordField
        label="Heading"
        value={wording.contactTitle}
        placeholder={DEFAULTS.contactTitle}
        maxLength={80}
        onChange={(v) => patchWording({ contactTitle: v })}
      />
      {local ? (
        <WordField
          label="Heading"
          hi
          value={wording.contactTitleHi}
          placeholder={copy.hi.contactTitle}
          maxLength={80}
          onChange={(v) => patchWording({ contactTitleHi: v })}
        />
      ) : null}
    </U.Nested>
  )
}

function LineList({
  stored,
  canned,
  cannedHi,
  local,
  max,
  onChange,
}: {
  stored: WordingLine[] | undefined
  canned: Array<{ title: string; body: string }>
  cannedHi: Array<{ title: string; body: string }>
  local: boolean
  max: number
  onChange: (next: WordingLine[] | undefined) => void
}) {
  const seeded = Boolean(stored?.length)
  const rows = seeded
    ? stored!
    : canned.map(() => ({ title: "", body: "", titleHi: "", bodyHi: "" }))

  function commit(next: WordingLine[]) {
    onChange(next)
  }

  function update(i: number, patch: Partial<WordingLine>) {
    const base = seeded
      ? stored!.map((row) => ({ ...row }))
      : canned.map((c, j) => ({
          title: c.title,
          body: c.body,
          titleHi: cannedHi[j]?.title,
          bodyHi: cannedHi[j]?.body,
        }))
    base[i] = { ...base[i], ...patch }
    commit(base)
  }

  return (
    <>
      {rows.map((row, i) => (
        <U.RowCard key={i}>
          <WordField
            label={`Card ${i + 1} title`}
            value={row.title}
            placeholder={canned[i]?.title ?? "Title"}
            maxLength={60}
            onChange={(v) => update(i, { title: v })}
          />
          <WordField
            label="Copy"
            area
            value={row.body}
            placeholder={canned[i]?.body ?? ""}
            maxLength={280}
            onChange={(v) => update(i, { body: v })}
          />
          {local ? (
            <>
              <WordField
                label="Title"
                hi
                value={row.titleHi}
                placeholder={cannedHi[i]?.title ?? ""}
                maxLength={60}
                onChange={(v) => update(i, { titleHi: v })}
              />
              <WordField
                label="Copy"
                hi
                area
                value={row.bodyHi}
                placeholder={cannedHi[i]?.body ?? ""}
                maxLength={280}
                onChange={(v) => update(i, { bodyHi: v })}
              />
            </>
          ) : null}
          {seeded ? (
            <U.ClearBtn type="button" onClick={() => commit(stored!.filter((_, j) => j !== i))}>
              Remove
            </U.ClearBtn>
          ) : null}
        </U.RowCard>
      ))}
      {seeded && rows.length < max ? (
        <U.AddLink
          type="button"
          onClick={() => commit([...stored!, { title: "", body: "" }])}
        >
          + Add card
        </U.AddLink>
      ) : null}
      {seeded ? (
        <U.ClearBtn type="button" onClick={() => onChange(undefined)}>
          Reset to defaults
        </U.ClearBtn>
      ) : (
        <U.AddLink
          type="button"
          onClick={() =>
            commit(
              canned.map((c, i) => ({
                title: c.title,
                body: c.body,
                titleHi: cannedHi[i]?.title,
                bodyHi: cannedHi[i]?.body,
              })),
            )
          }
        >
          Start from defaults
        </U.AddLink>
      )}
    </>
  )
}

function TestimonialsEditor() {
  const items = useDraft((s) => s.config.testimonials)
  const wording = useDraft((s) => s.config.wording)
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const setTestimonials = useDraft((s) => s.setTestimonials)
  const ensureSectionOn = useDraft((s) => s.ensureSectionOn)
  const patchWording = useDraft((s) => s.patchWording)

  return (
    <U.Nested>
      <WordField
        label="Heading"
        value={wording.quotesTitle}
        placeholder={DEFAULTS.quotesTitle}
        maxLength={80}
        onChange={(v) => patchWording({ quotesTitle: v })}
      />
      {local ? (
        <WordField
          label="Heading"
          hi
          value={wording.quotesTitleHi}
          placeholder={copy.hi.quotesTitle}
          maxLength={80}
          onChange={(v) => patchWording({ quotesTitleHi: v })}
        />
      ) : null}
      {items.map((row, i) => (
        <U.RowCard key={i}>
          <U.Field>
            Quote
            <U.Area
              rows={2}
              value={row.quote}
              onChange={(e) => {
                const next = items.slice()
                next[i] = { ...row, quote: e.target.value }
                setTestimonials(next)
              }}
            />
          </U.Field>
          <U.Field>
            Name
            <U.Input
              value={row.name}
              onChange={(e) => {
                const next = items.slice()
                next[i] = { ...row, name: e.target.value }
                setTestimonials(next)
              }}
            />
          </U.Field>
          <U.Field>
            City
            <U.Input
              value={row.city}
              onChange={(e) => {
                const next = items.slice()
                next[i] = { ...row, city: e.target.value }
                setTestimonials(next)
              }}
            />
          </U.Field>
          <U.ClearBtn type="button" onClick={() => setTestimonials(items.filter((_, j) => j !== i))}>
            Remove
          </U.ClearBtn>
        </U.RowCard>
      ))}
      {items.length < 5 ? (
        <U.AddLink
          type="button"
          onClick={() => {
            setTestimonials([...items, { quote: "", name: "", city: "" }])
            ensureSectionOn("testimonials")
          }}
        >
          + Add testimonial
        </U.AddLink>
      ) : null}
    </U.Nested>
  )
}

function FaqEditor() {
  const items = useDraft((s) => s.config.faq)
  const wording = useDraft((s) => s.config.wording)
  const local = useDraft((s) => s.config.addons.includes("bilingual"))
  const setFaq = useDraft((s) => s.setFaq)
  const ensureSectionOn = useDraft((s) => s.ensureSectionOn)
  const patchWording = useDraft((s) => s.patchWording)

  return (
    <U.Nested>
      <WordField
        label="Heading"
        value={wording.faqTitle}
        placeholder={DEFAULTS.faqTitle}
        maxLength={80}
        onChange={(v) => patchWording({ faqTitle: v })}
      />
      {local ? (
        <WordField
          label="Heading"
          hi
          value={wording.faqTitleHi}
          placeholder={copy.hi.faqTitle}
          maxLength={80}
          onChange={(v) => patchWording({ faqTitleHi: v })}
        />
      ) : null}
      {items.map((row, i) => (
        <U.RowCard key={i}>
          <U.Field>
            Question
            <U.Input
              value={row.q}
              onChange={(e) => {
                const next = items.slice()
                next[i] = { ...row, q: e.target.value }
                setFaq(next)
              }}
            />
          </U.Field>
          <U.Field>
            Answer
            <U.Area
              rows={2}
              value={row.a}
              onChange={(e) => {
                const next = items.slice()
                next[i] = { ...row, a: e.target.value }
                setFaq(next)
              }}
            />
          </U.Field>
          {local ? (
            <>
              <U.Field>
                Question (Hindi)
                <U.Input
                  value={row.qHi ?? ""}
                  onChange={(e) => {
                    const next = items.slice()
                    next[i] = { ...row, qHi: e.target.value }
                    setFaq(next)
                  }}
                />
              </U.Field>
              <U.Field>
                Answer (Hindi)
                <U.Area
                  rows={2}
                  value={row.aHi ?? ""}
                  onChange={(e) => {
                    const next = items.slice()
                    next[i] = { ...row, aHi: e.target.value }
                    setFaq(next)
                  }}
                />
              </U.Field>
            </>
          ) : null}
          <U.ClearBtn type="button" onClick={() => setFaq(items.filter((_, j) => j !== i))}>
            Remove
          </U.ClearBtn>
        </U.RowCard>
      ))}
      {items.length < 8 ? (
        <U.AddLink
          type="button"
          onClick={() => {
            setFaq([...items, { q: "", a: "" }])
            ensureSectionOn("faq")
          }}
        >
          + Add FAQ
        </U.AddLink>
      ) : null}
    </U.Nested>
  )
}

export function SectionsStep() {
  const sections = useDraft((s) => s.config.sections)
  const setSections = useDraft((s) => s.setSections)
  const toggleSection = useDraft((s) => s.toggleSection)
  const [openId, setOpenId] = useState<SectionId | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sections.findIndex((row) => row.id === active.id)
    const newIndex = sections.findIndex((row) => row.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    setSections(arrayMove(sections, oldIndex, newIndex))
  }

  return (
    <div
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null
        if (next && e.currentTarget.contains(next)) return
        void saveConfig(true)
      }}
    >
      <U.StepTitle>Sections</U.StepTitle>
      <U.StepLead>
        Show, hide, drag to reorder, and edit the words on each block. Click a name to jump to it on the preview. AMFI
        tagline, disclosures, and the footer disclaimer stay locked.
      </U.StepLead>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={sections.map((row) => row.id)} strategy={verticalListSortingStrategy}>
          <U.SecList>
            {sections.map((row) => (
              <SortableRow
                key={row.id}
                id={row.id}
                on={row.on}
                open={openId === row.id}
                onToggle={() => {
                  const turningOn = !row.on
                  toggleSection(row.id)
                  if (turningOn) useDraft.getState().focusPreview(SECTION_SPOT[row.id])
                }}
                onEdit={() => {
                  setOpenId((cur) => (cur === row.id ? null : row.id))
                  useDraft.getState().ensureSectionOn(row.id)
                  useDraft.getState().focusPreview(SECTION_SPOT[row.id])
                }}
              />
            ))}
          </U.SecList>
        </SortableContext>
      </DndContext>
    </div>
  )
}
