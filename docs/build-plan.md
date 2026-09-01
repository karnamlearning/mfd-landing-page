# MFD Site — Build plan (now)

What to build, in order. Companion to [ux.md](./ux.md) and [tech.md](./tech.md).

Do not start a later phase until the previous phase’s **Done** line is true. Phase 0 is a visual gate: if Practice does not look clearly better than [investbux.in](https://www.investbux.in/), stop and fix design before Buyer Place.

---

## What we are building

A **Buyer Place** where an MFD configures a site (no ARN verification), always sees a live preview with filled/sample data, rearranges sections, picks template / theme / font, toggles **Tools pack**, pays, and publishes to `{slug}.{base}`.

Same `site-kit` renderer for preview and live site. styled-components + react-icons (`fi` + `FaWhatsapp`). MySQL tenant JSON. Calculators via BFF. Leads + WhatsApp CTA.

**Shipped when:** an MFD can go details → template → theme → font → sections → add-on → pay → live subdomain that matches the last preview, then come back and edit.

---

## What we are not building (this plan)

ARN verification, KYC, profiler, login/transact, blog/news, AMC logos, page builder, free colours/fonts, self-serve custom domain, extra templates, hero carousel, PMS/AIF inner pages, native app, MutualFundTools advisor tools on the public site.

---

## Phase 0 — Repo and visual gate

Prove the look with **one hardcoded Practice page**. No editor yet.

| Step | Build                                                                                                                                                                                                                                                                                                 | Done                                                                              |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 0.1  | Monorepo: `apps/web`, `packages/schema`, `packages/tokens`, `packages/site-kit`. Next.js, TypeScript, styled-components (`compiler.styledComponents` + registry), react-icons.                                                                                                                        | App runs locally; styled-components SSR does not flash unstyled.                  |
| 0.2  | `tokens`: 8 theme objects (`navy`, `forest`, `maroon`, `sky`, `sand`, `slate`, `ink`, `saffron`) with `bg`, `surface`, `text`, `muted`, `primary`, `accent`, `btnText`, `space`. 5 font pair ids wired to `next/font`.                                                                                | Switching `ThemeProvider` theme restyles the page.                                |
| 0.3  | `schema`: `TenantConfig` Zod types, section ids, service ids, sample-fill object from UX.                                                                                                                                                                                                             | Types compile; sample object exists.                                              |
| 0.4  | Hardcoded Practice landing (Investbux _rhythm_, new skin): locked header (logo + AMFI tagline), hero (one lifestyle image), about, credentials cards, service cards (`fi` icons), stats, featured SIP **layout only** (no API), contact, footer (disclaimer + disclosures link stub). `forest` theme. | Visual review vs Investbux. **Gate:** looks like a 2026 product, not ThemeMascot. |

**Phase 0 done:** gate passed. Do not open Buyer Place until then.

---

## Phase 1 — Renderer from config

JSON drives the site. Still no persistence.

| Step | Build                                                                                                                                                                           | Done                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1.1  | `Site` + section registry: `hero`, `about`, `credentials`, `services`, `stats`, `how`, `calculators`, `testimonials`, `faq`, `contact`, `whatsapp_strip`. Header/footer locked. | `config.sections` order and `on` change what renders. Hero and contact cannot be turned off (schema). |
| 1.2  | Three templates: `solo`, `practice`, `local` — layout + **default section order/on** from UX. Same data, different skin. `local`: EN/हिं toggle on canned strings.              | Switching `template` in a fixture config changes layout.                                              |
| 1.3  | Theme + font from config (`ThemeProvider` + font pair).                                                                                                                         | All 8 × 5 combinations render without broken contrast.                                                |
| 1.4  | `mergeSample(config, preview)`: empty fields filled only when `preview === true`.                                                                                               | Preview shows Rahul Sharma sample; `preview: false` with empty name does not.                         |
| 1.5  | Public routes (still fixture tenant): `/`, `/calculators`, `/calculators/[tool]` placeholder, `/disclosures` canned copy.                                                       | Routes resolve; nav only shows on sections.                                                           |

**Phase 1 done:** a JSON fixture renders a full Practice (and Solo/Local) site.

---

## Phase 2 — Buyer Place (client-only draft)

Editor around the real `Site`. Draft in Zustand. No login, no DB yet.

| Step | Build                                                                                                                                                     | Done                                                           |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 2.1  | Shell: steps left, preview centre (mobile frame default, desktop toggle), add-ons rail right. Mobile: preview one tap away.                               | Layout matches UX. Preview is `<Site preview />`, not a mock.  |
| 2.2  | Step **Details**: all fields from UX (name, logo/photo/hero upload as local File/object URL for now, WhatsApp, city, bio, credentials rows, stats, etc.). | Typing updates preview immediately; sample replaced per field. |
| 2.3  | Step **Template**: three cards; apply to draft. Keep details/theme/font/addons.                                                                           | Preview swaps template with same data.                         |
| 2.4  | Step **Theme**: 8 swatches.                                                                                                                               | Preview restyles instantly.                                    |
| 2.5  | Step **Font**: 5 pairs (`Aa` samples).                                                                                                                    | Preview typeface updates instantly.                            |
| 2.6  | Step **Sections**: list with eye toggle + drag reorder (dnd-kit). Edit nested: services ticks, testimonials, FAQ.                                         | Preview order/visibility matches; hero/contact cannot hide.    |
| 2.7  | **Add-ons rail** on every step: Tools pack Add/Remove → `addons: ["tools"]`. Preview shows extra calculator slots (even if tools are placeholders).       | Toggle from any step; preview updates.                         |
| 2.8  | Step **Review**: summary of template, theme, font, sections, add-ons. Pay button stub.                                                                    | All previous choices visible; preview still live.              |

**Phase 2 done:** full Buyer Place walkthrough with live preview, in-memory only.

---

## Phase 3 — Tenant, auth, publish

Make it a real site on a subdomain.

| Step | Build                                                                                                                                                         | Done                                       |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| 3.1  | MySQL: `tenants`, `users`, `leads`. `config` JSON (`TenantConfig`).                                                                                           | Migrate up locally.                        |
| 3.2  | OTP send/verify (`/api/auth/otp/*`). Session cookie. Create tenant `status=draft` + default config.                                                           | Phone in → session → config load/save.     |
| 3.3  | `GET/PUT /api/me/config`. Debounced persist (1–2s, blur, template/theme/font).                                                                                | Refresh browser; draft survives.           |
| 3.4  | Signed upload (`/api/me/assets`) to S3/R2; store URLs in config (logo, photo, hero).                                                                          | Images on preview and (later) public site. |
| 3.5  | Host routing: `app.{base}` = Buyer Place; `{slug}.{base}` = public `Site` with `preview: false`. Wildcard DNS local/staging. Suspended/missing → generic 404. | Same config; public has no sample fill.    |
| 3.6  | Slug: from name, unique, editable once in review if needed.                                                                                                   | Two MFDs cannot share a slug.              |
| 3.7  | After “publish” (or first save with slug): Buyer Place labelled **Your site** + public URL + copy + QR.                                                       | MFD can open the live URL.                 |

**Phase 3 done:** OTP → edit → live subdomain without payment (draft/trial public OK for staging; production may wait for Phase 5).

---

## Phase 4 — Calculators and leads

Real tools, lead gate, WhatsApp handoff.

| Step | Build                                                                                                                                                                                                                                                                      | Done                                                          |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 4.1  | BFF `POST /api/tools/:id` → Advisorkhoj APIs. DTO only. Hide tools if API missing.                                                                                                                                                                                         | SIP returns invested/value from server, not fake client math. |
| 4.2  | Home **featured SIP widget** (Practice).                                                                                                                                                                                                                                   | Widget on landing; result renders.                            |
| 4.3  | Base four on `/calculators` and `/calculators/[tool]`: SIP, lumpsum, goal SIP, retirement. Per-tool hide via `calculatorHidden`.                                                                                                                                           | Each tool works; WhatsApp CTA includes numbers.               |
| 4.4  | Lead gate: name + mobile before full result. `POST /api/leads` (`source` = tool id).                                                                                                                                                                                       | Lead row stored; result then shows.                           |
| 4.5  | Contact form → lead `source=form` + notify MFD (WhatsApp/email).                                                                                                                                                                                                           | Form on live site creates a lead.                             |
| 4.6  | Tools pack: extra tools (SWP, NPS, inflation, compounding, goal planner, SIP step-up, lumpsum target — skip if API not ready). Preview always if toggled; **public only if paid** (Phase 5; until then use a `paidAddons` flag or treat all draft as preview-only extras). | Extra tools appear/disappear with flag.                       |
| 4.7  | Buyer Place **Leads** list: name, mobile, source, time, Open WhatsApp.                                                                                                                                                                                                     | MFD sees contact + calculator leads.                          |

**Phase 4 done:** calculators create leads; WhatsApp is the conversion path.

---

## Phase 5 — Billing and add-on enforcement

| Step | Build                                                                                                                                                                                        | Done                                |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| 5.1  | Razorpay checkout: ₹299/month or ₹2,999/year. Webhook → `status=active`, store `razorpay_sub_id`.                                                                                            | Test payment activates tenant.      |
| 5.2  | Public site: if not `active`/`trial`, show paywall or keep unpublished (product choice: trial 14 days optional). Unpaid Tools pack **ignored** on public host; still in Buyer Place preview. | Live site cannot leak unpaid tools. |
| 5.3  | Fail/cancel webhook → `suspended`; config kept.                                                                                                                                              | Public down; editor still opens.    |
| 5.4  | Billing screen in editor (invoices / GSTIN later if needed — GSTIN optional field OK).                                                                                                       | MFD sees plan state.                |

**Phase 5 done:** money path works; add-on rules match [tech.md](./tech.md).

---

## Phase 6 — Harden and ops

| Step | Build                                                                                                       | Done                                    |
| ---- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 6.1  | `/disclosures` final copy; AMFI tagline unremovable; banned-phrase hint on bio (no hard block).             | Compliance chrome on every public page. |
| 6.2  | `/admin`: list tenants, impersonate, suspend.                                                               | Ops can help an MFD without DB diving.  |
| 6.3  | Logging: `tenant_id` on tools/leads. Basic error pages.                                                     | Failures are diagnosable.               |
| 6.4  | Staging deploy: wildcard TLS, env (DB, OTP, Razorpay, S3, tools API, WhatsApp).                             | One staging URL for founder demo.       |
| 6.5  | Manual test vs [UX acceptance](./ux.md#ux-acceptance-now) and [tech acceptance](./tech.md#acceptance-tech). | Checklist signed off.                   |

**Phase 6 done:** now-scope is demoable and operable.

---

## Suggested sequence (calendar)

Not estimates — order only. Compress if APIs/Razorpay lag; do not skip Phase 0.

1. Phase 0 (visual gate)
2. Phase 1 (JSON renderer)
3. Phase 2 (Buyer Place)
4. Phase 3 (OTP + subdomain)
5. Phase 4 (tools + leads)
6. Phase 5 (Razorpay)
7. Phase 6 (ops + demo)

Parallel after 0.4: designer polish on tokens while 1.x is built. Parallel after 1.x: confirm Advisorkhoj calculator API list so 4.1 is not blocked.

---

## Definition of done (now-scope)

An MFD can, without a designer:

1. OTP in, no ARN check.
2. Fill details; preview never blank (sample until they type).
3. Pick Practice and see Investbux-like rhythm with the new design.
4. Change template, theme, font; preview matches.
5. Reorder/hide sections; preview matches.
6. Toggle Tools pack from any step; preview calculators change.
7. Preview mobile and desktop at every step.
8. Pay; `{slug}.{base}` matches last preview; unpaid tools absent on public.
9. Return and change any of the above without starting over.
10. See leads and WhatsApp them.

When that list is true, this plan is finished. Next work (profiler, KYC, custom domain UI) is a new plan.
