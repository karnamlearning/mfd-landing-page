"use client"

import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa6"
import * as U from "./styles"

type Lead = {
  id: number
  name: string
  mobile: string
  city: string | null
  message: string | null
  source: string
  createdAt: string
}

const SOURCE_LABEL: Record<string, string> = {
  form: "Contact form",
  sip: "SIP",
  lumpsum: "Lumpsum",
  goal_sip: "Goal SIP",
  retirement: "Retirement",
  swp: "SWP",
  inflation: "Inflation",
  compounding: "Compounding",
  sip_stepup: "SIP step-up",
  lumpsum_target: "Lumpsum target",
}

function waHref(mobile: string) {
  const digits = mobile.replace(/\D/g, "")
  const n = digits.length === 10 ? `91${digits}` : digits
  return `https://wa.me/${n}`
}

function sourceLabel(source: string) {
  return SOURCE_LABEL[source] ?? source
}

function formatWhen(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d)
}

export function LeadsStep() {
  const [rows, setRows] = useState<Lead[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch("/api/me/leads")
        if (!res.ok) {
          if (!cancelled) setError("Could not load leads.")
          return
        }
        const data = (await res.json()) as { leads: Lead[] }
        if (!cancelled) setRows(data.leads)
      } catch {
        if (!cancelled) setError("Could not load leads.")
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <U.StepTitle>Leads</U.StepTitle>
      <U.StepLead>People who used the contact form or a calculator on your live site.</U.StepLead>
      {error ? <U.Hint>{error}</U.Hint> : null}
      {rows === null && !error ? <U.Hint>Loading…</U.Hint> : null}
      {rows && rows.length === 0 ? (
        <U.Later>No leads yet. They will show here after someone writes from your site.</U.Later>
      ) : null}
      {rows && rows.length ? (
        <U.LeadTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Source</th>
              <th>When</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.mobile}</td>
                <td>{sourceLabel(row.source)}</td>
                <td>{formatWhen(row.createdAt)}</td>
                <td>
                  <U.ChromeBtn href={waHref(row.mobile)} target="_blank" rel="noreferrer">
                    <FaWhatsapp size={14} aria-hidden />
                    Open WhatsApp
                  </U.ChromeBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </U.LeadTable>
      ) : null}
    </>
  )
}
