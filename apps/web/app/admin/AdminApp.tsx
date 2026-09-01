"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ThemeProvider } from "styled-components"
import { themes } from "@mfd/tokens"
import * as A from "./styles"

type TenantRow = {
  id: number
  slug: string
  status: "draft" | "trial" | "active" | "suspended"
  plan: "monthly" | "yearly" | null
  ownerPhone: string | null
  slugLocked: boolean
  updatedAt: string
  publicUrl: string
}

function tone(status: TenantRow["status"]): "ok" | "warn" | "mute" {
  if (status === "active" || status === "trial") return "ok"
  if (status === "suspended") return "warn"
  return "mute"
}

function when(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso))
}

export function AdminApp() {
  const [gate, setGate] = useState<"loading" | "login" | "ready" | "missing">("loading")
  const [secret, setSecret] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [rows, setRows] = useState<TenantRow[]>([])

  async function load() {
    const res = await fetch("/api/admin/tenants")
    if (res.status === 404) {
      setGate("missing")
      return
    }
    if (res.status === 401) {
      setGate("login")
      return
    }
    if (!res.ok) {
      setGate("login")
      setError("Could not load tenants.")
      return
    }
    const data = (await res.json()) as { tenants: TenantRow[] }
    setRows(data.tenants)
    setGate("ready")
  }

  useEffect(() => {
    void load()
  }, [])

  async function login(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ secret }),
      })
      if (!res.ok) {
        setError(res.status === 404 ? "Admin is not configured." : "Wrong secret.")
        return
      }
      setSecret("")
      await load()
    } catch {
      setError("Could not sign in.")
    } finally {
      setBusy(false)
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    setRows([])
    setGate("login")
  }

  async function act(id: number, kind: "suspend" | "restore" | "impersonate") {
    setBusy(true)
    setError(null)
    try {
      if (kind === "impersonate") {
        const res = await fetch(`/api/admin/tenants/${id}/impersonate`, { method: "POST" })
        const data = (await res.json()) as { placeUrl?: string }
        if (!res.ok || !data.placeUrl) {
          setError("Could not open that site.")
          return
        }
        window.location.href = data.placeUrl
        return
      }
      const res = await fetch(`/api/admin/tenants/${id}/suspend`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: kind }),
      })
      if (!res.ok) {
        setError("Could not update that tenant.")
        return
      }
      await load()
    } catch {
      setError("Request failed.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <ThemeProvider theme={themes.slate}>
      <A.Shell>
        <A.Global />
        <A.Top>
          <A.Brand>
            <A.BrandName>Advisorkhoj</A.BrandName>
            <A.BrandSub>Ops</A.BrandSub>
          </A.Brand>
          {gate === "ready" ? (
            <A.Ghost type="button" onClick={() => void logout()}>
              Sign out
            </A.Ghost>
          ) : null}
        </A.Top>
        <A.Body>
          {gate === "loading" ? <A.Lead>Loading…</A.Lead> : null}
          {gate === "missing" ? (
            <A.Card>
              <A.Title>Admin is off</A.Title>
              <A.Lead>Set ADMIN_SECRET on the server to enable this page.</A.Lead>
            </A.Card>
          ) : null}
          {gate === "login" ? (
            <A.Card>
              <A.Title>Ops sign-in</A.Title>
              <A.Lead>Not a product screen. Use the ops secret to list tenants, impersonate, or suspend.</A.Lead>
              {error ? <A.Warn>{error}</A.Warn> : null}
              <form onSubmit={(e) => void login(e)}>
                <A.Field>
                  Secret
                  <A.Input
                    type="password"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    autoComplete="current-password"
                  />
                </A.Field>
                <A.Primary type="submit" disabled={busy || !secret.trim()}>
                  {busy ? "Signing in…" : "Continue"}
                </A.Primary>
              </form>
            </A.Card>
          ) : null}
          {gate === "ready" ? (
            <>
              <A.Lead>
                {rows.length} tenant{rows.length === 1 ? "" : "s"}. Impersonate opens Buyer Place as that
                distributor. Suspend takes the public site down; the draft stays.
              </A.Lead>
              {error ? <A.Warn>{error}</A.Warn> : null}
              <A.TableWrap>
                <A.Table>
                  <thead>
                    <tr>
                      <th>Slug</th>
                      <th>Status</th>
                      <th>Plan</th>
                      <th>Phone</th>
                      <th>Updated</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <A.Link href={row.publicUrl} target="_blank" rel="noreferrer">
                            {row.slug}
                          </A.Link>
                        </td>
                        <td>
                          <A.Status $tone={tone(row.status)}>{row.status}</A.Status>
                        </td>
                        <td>{row.plan ?? "—"}</td>
                        <td>{row.ownerPhone ?? "—"}</td>
                        <td>{when(row.updatedAt)}</td>
                        <td>
                          <A.RowActions>
                            <A.TextBtn
                              type="button"
                              disabled={busy}
                              onClick={() => void act(row.id, "impersonate")}
                            >
                              Impersonate
                            </A.TextBtn>
                            {row.status === "suspended" ? (
                              <A.TextBtn
                                type="button"
                                disabled={busy}
                                onClick={() => void act(row.id, "restore")}
                              >
                                Restore
                              </A.TextBtn>
                            ) : (
                              <A.TextBtn
                                type="button"
                                disabled={busy}
                                onClick={() => void act(row.id, "suspend")}
                              >
                                Suspend
                              </A.TextBtn>
                            )}
                          </A.RowActions>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </A.Table>
              </A.TableWrap>
            </>
          ) : null}
        </A.Body>
      </A.Shell>
    </ThemeProvider>
  )
}
