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
import { lockedSectionIds, serviceIds, type SectionId, type ServiceId } from "@mfd/schema"
import { useDraft } from "./store"
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

const LOCKED = new Set<string>(lockedSectionIds)
const EDITABLE = new Set<SectionId>(["services", "testimonials", "faq"])

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
        <U.SecName>{LABELS[id]}</U.SecName>
        {EDITABLE.has(id) ? (
          <U.IconBtn type="button" onClick={onEdit} aria-label={`Edit ${LABELS[id]}`}>
            {open ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </U.IconBtn>
        ) : null}
        <U.IconBtn
          type="button"
          $muted={!on}
          disabled={locked}
          onClick={onToggle}
          title={locked ? "Always on" : on ? "Hide" : "Show"}
          aria-label={on ? `Hide ${LABELS[id]}` : `Show ${LABELS[id]}`}
        >
          {on ? <FiEye size={16} /> : <FiEyeOff size={16} />}
        </U.IconBtn>
      </U.SecMain>
      {open ? <NestedEditor id={id} /> : null}
    </U.SecRow>
  )
}

function NestedEditor({ id }: { id: SectionId }) {
  if (id === "services") return <ServicesEditor />
  if (id === "testimonials") return <TestimonialsEditor />
  if (id === "faq") return <FaqEditor />
  return null
}

function ServicesEditor() {
  const selected = useDraft((s) => s.config.services)
  const setServices = useDraft((s) => s.setServices)
  const ensureSectionOn = useDraft((s) => s.ensureSectionOn)

  function toggle(id: ServiceId) {
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]
    setServices(next)
    if (next.length) ensureSectionOn("services")
  }

  return (
    <U.Nested>
      {serviceIds.map((id) => {
        const on = selected.includes(id)
        return (
          <U.Tick key={id} type="button" $on={on} onClick={() => toggle(id)}>
            <U.TickBox $on={on} />
            {SERVICE_LABELS[id]}
          </U.Tick>
        )
      })}
    </U.Nested>
  )
}

function TestimonialsEditor() {
  const items = useDraft((s) => s.config.testimonials)
  const setTestimonials = useDraft((s) => s.setTestimonials)
  const ensureSectionOn = useDraft((s) => s.ensureSectionOn)

  return (
    <U.Nested>
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
  const setFaq = useDraft((s) => s.setFaq)
  const local = useDraft((s) => s.config.template === "local")
  const ensureSectionOn = useDraft((s) => s.ensureSectionOn)

  return (
    <U.Nested>
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
    <>
      <U.StepTitle>Sections</U.StepTitle>
      <U.StepLead>Show, hide, and drag to reorder. Hero and Contact stay on. Header and footer are locked.</U.StepLead>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={sections.map((row) => row.id)} strategy={verticalListSortingStrategy}>
          <U.SecList>
            {sections.map((row) => (
              <SortableRow
                key={row.id}
                id={row.id}
                on={row.on}
                open={openId === row.id}
                onToggle={() => toggleSection(row.id)}
                onEdit={() => setOpenId((cur) => (cur === row.id ? null : row.id))}
              />
            ))}
          </U.SecList>
        </SortableContext>
      </DndContext>
    </>
  )
}
