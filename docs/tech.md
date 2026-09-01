# MFD Site - Tech (now)

Companion to [ux.md](./ux.md). Now-scope only: Buyer Place, one renderer, publish to subdomain, Tools pack, leads, Razorpay.

Visual bar: **better than custom ThemeMascot sites** (e.g. [investbux.in](https://www.investbux.in/)). Investbux is IA reference, not a frontend to copy. No WordPress, no per-MFD repos, no legacy JSP for this UI.

---

## Principle

**One renderer, two shells.**

Public site and Buyer Place preview are the same React tree, fed the same tenant config. Preview is not a mock. If it is not the real components, WYSIWYG is a lie and we maintain two UIs.

```
Tenant config (JSON)
        │
        ▼
   Site renderer     packages/site-kit
   (sections, tokens, calculators)
        │
   ┌────┴────┐
   ▼         ▼
Buyer      Live site
preview    Host → tenant
```

The product is a **config-driven renderer** plus an editor that writes JSON. MFDs do not get HTML.

---

## Non-goals (now)

- ARN verification, KYC, profiler, portfolio, transact
- Page builder / arbitrary HTML / extra section types
- Free colour picker / arbitrary Google Fonts
- Self-serve custom domain (ops can CNAME by hand)
- Headless CMS, blog, news, AMC logo rows
- Per-tenant deploy, Kubernetes per MFD
- Embedding this UI in the old Advisorkhoj Java stack

---

## Repo

pnpm workspace + Turborepo (or npm workspaces if that is simpler). One Next.js app until scale forces a split.

```
apps/web                 Buyer Place + public site (host routing)
packages/schema          Zod tenant config, sample fill, section ids
packages/tokens          8 theme objects + 5 font pairs (styled-components `DefaultTheme`)
packages/site-kit        Header, footer, sections, calculator UI (styled-components + react-icons)
```

`apps/web` depends on the three packages. `site-kit` depends on `schema` + `tokens` only. Calculator math does not live in `site-kit`; it calls the BFF.

---

## Stack

| Layer           | Choice                                  | Why                                                |
| --------------- | --------------------------------------- | -------------------------------------------------- |
| UI              | Next.js App Router, TypeScript          | SSR/SEO on public pages, one React tree for editor |
| Style           | **styled-components** + `ThemeProvider` | Theme switch = swap theme object; no Tailwind      |
| Icons           | **react-icons** (one family, see below) | Service cards, stats, WhatsApp, editor chrome      |
| Fonts           | `next/font` for the five pairs          | No FOUT from runtime Google Fonts                  |
| Preview state   | Zustand (or React context)              | Draft config; live preview                         |
| Section reorder | dnd-kit on the section id list          | Not a general drag engine                          |
| DB              | MySQL                                   | Match other Advisorkhoj products; JSON config, leads, billing |
| Files           | S3-compatible (S3 / R2)                 | Logo, photo, hero                                  |
| Auth            | Mobile OTP                              | Match how MFDs live; no ARN check now              |
| Pay             | Razorpay subscriptions                  | ₹299/mo or ₹2,999/yr                               |
| Tools           | BFF → existing Advisorkhoj APIs         | Do not rewrite calculators                         |
| Notify          | WhatsApp / email (existing vendor)      | New lead, calculator gate                          |

Do not use Bootstrap, Tailwind, or theme kits. Tokens + styled-components are the design system.

Next.js: enable `compiler.styledComponents` and wrap the tree in a `StyledComponentsRegistry` (server stylesheet) so public SSR does not flash unstyled. `site-kit` components are `"use client"` where they use styled-components, or collect styles on the server via the registry.

---

## Design system (quality)

Design is encoded so 1,000 MFDs cannot ship a 2017 brochure.

- 8px grid, one type scale, real whitespace - spacing and type live on `theme.space` / `theme.font`
- Themes: 8 packs from [ux.md](./ux.md) (`navy`, `forest`, …). Each pack is a **styled-components theme object**: `bg`, `surface`, `text`, `muted`, `primary`, `accent`, `btnText`. Swap via `<ThemeProvider theme={themes[config.theme]}>`.
- Fonts: 5 pairs only (`modern`, `formal`, `friendly`, `classic`, `sharp`) applied as `theme.font` (heading/body family names from `next/font`)
- Templates (`solo`, `practice`, `local`) change layout and default section order, not a different styling library
- `practice` + `forest` is the Investbux-like **rhythm** with a 2026 skin
- Motion: none or ~150ms opacity. No preloader, no bouncing counters
- One hero image, no carousel
- Icons: **react-icons** only. Use **Feather** (`react-icons/fi`) for UI chrome and service/stat cards so weight and size stay consistent. WhatsApp: `FaWhatsapp` from `react-icons/fa6` (no Feather equivalent). Do not mix Hi, Md, Bs, etc. on the public site.

Example (site-kit):

```tsx
import styled, { ThemeProvider } from "styled-components"
import { FiShield, FiTrendingUp } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa6"
import { themes } from "@mfd/tokens"

const Card = styled.article`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: ${({ theme }) => theme.space[4]};
`

<ThemeProvider theme={themes[config.theme]}>
  <Card>
    <FiShield />
    <a href={whatsappHref}><FaWhatsapp /> Talk on WhatsApp</a>
  </Card>
</ThemeProvider>
```

**First engineering gate:** a hardcoded Practice page using `site-kit` + sample content that is clearly better than Investbux. If it is not, do not start the editor.

---

## Tenant config

Source of truth. Validate with Zod in `packages/schema`. Preview holds this object in memory; publish persists it.

```ts
type TenantConfig = {
  slug: string;
  template: "solo" | "practice" | "local";
  theme: ThemeId;
  font: FontId;
  addons: Array<"tools">;
  details: {
    name: string;
    logoUrl?: string;
    photoUrl?: string;
    heroImageUrl?: string;
    heroHeadline?: string;
    pitch?: string;
    whatsapp: string;
    phone?: string;
    email?: string;
    address?: string;
    city: string;
    languages: string[];
    bio?: string;
    bioHi?: string; // local template only
    credentials: Array<{ label: string; name: string; number: string }>;
    stats: Array<{ value: string; label: string }>; // max 3
    hours?: string;
    arn?: string; // optional text, not verified
  };
  services: ServiceId[]; // ticks
  sections: Array<{ id: SectionId; on: boolean }>; // order = array order
  calculatorHidden: ToolId[]; // hide individual base/addon tools
};
```

Rules in schema, not in random UI:

- `hero` and `contact` cannot be `on: false`
- Unknown `id` rejected
- Sample merge happens **only** when `preview: true` (see Preview)

Defaults per template (section on/off and order) live in `schema`, matching [ux.md](./ux.md) (`practice`: Hero → About → Credentials → Services → Stats → Calculators → Contact).

---

## Renderer (`site-kit`)

Section registry:

```ts
const sections = {
  hero: Hero,
  about: About,
  credentials: Credentials,
  services: Services,
  stats: Stats,
  how: How,
  calculators: Calculators,
  testimonials: Testimonials,
  faq: Faq,
  contact: Contact,
  whatsapp_strip: WhatsappStrip,
};
```

Landing page maps `config.sections.filter(s => s.on)` to that map. Header and footer are locked (not in the list).

Public routes (now):

| Path                  | Render                              |
| --------------------- | ----------------------------------- |
| `/`                   | Landing: visible sections in order  |
| `/calculators`        | Tool index (base four ± Tools pack) |
| `/calculators/[tool]` | One tool                            |
| `/disclosures`        | Canned commission + market-risk     |

Host middleware loads tenant by slug (or `Host`). Missing/suspended tenant → generic 404, not a leak of other MFDs.

Public/preview tree:

```tsx
<ThemeProvider theme={themes[config.theme]}>
  <FontVars font={config.font} />
  <Site config={config} />
</ThemeProvider>
```

`data-template={config.template}` may still sit on a wrapper for layout variants. Do not drive colours through Tailwind classes or a parallel CSS-variable sheet unless `tokens` also emit them for the registry - **theme object is canonical**.

---

## Preview (Buyer Place)

Editor shell in `apps/web` (steps, add-ons rail, pay). Centre pane is:

```tsx
<SiteFrame viewport="mobile" | "desktop">
  <Site config={mergeSample(draft)} preview />
</SiteFrame>
```

- Same `Site` as production
- Draft in Zustand; every field updates preview with no save
- `mergeSample`: empty fields filled from sample data **only if `preview`**
- Published render never uses sample (“Rahul Sharma” must not ship)
- Theme / font / template / section order / Tools pack all go through the same draft object
- Iframe not required in v1. Use same-document preview for speed. Revisit iframe only for CSS isolation bugs.

Phone-width frame is the default on desktop, per UX.

---

## Routing and tenancy

One deployment.

| Host            | App                                 |
| --------------- | ----------------------------------- |
| `app.{base}`    | Buyer Place (OTP session)           |
| `{slug}.{base}` | Public `site-kit`                   |
| `{base}`        | Marketing / signup into Buyer Place |

`base` TBD (e.g. `mfd.advisorkhoj.com`). Wildcard DNS + TLS.

Custom domain later: CNAME to the app, `tenants.custom_domain`, SSL (Cloudflare or similar). Not self-serve now.

---

## Data model (MySQL)

Same three tables as the rest of Advisorkhoj: relational rows, `TenantConfig` as a MySQL 8 `JSON` column. Validate with Zod on read/write.

**tenants**

- `id`, `slug` unique, `status` (`draft` \| `trial` \| `active` \| `suspended`)
- `config` JSON (`TenantConfig`)
- `owner_phone`, `owner_email`
- `razorpay_sub_id`, `plan` (`monthly` \| `yearly`)
- `created_at`, `updated_at`

**leads**

- `id`, `tenant_id`
- `name`, `mobile`, `city`, `message`
- `source` (`form` \| `sip_calc` \| …)
- `payload` JSON (calculator inputs)
- `created_at`

**users** (MFD)

- `id`, `phone` unique, `tenant_id`
- OTP session in cookie or JWT; keep thin

**assets**

- Store keys in `config` URLs; files in object storage. Signed upload from Buyer Place.

Draft vs published: v1 can write `config` in place (preview is client state until they click something that persists). Persist on: debounce (1–2s), blur, template/theme/font change, pay. Optional `config_draft` column if we need crash-safe editor later - not required to start.

---

## APIs (`apps/web` route handlers)

| Method  | Path                    | Purpose                          |
| ------- | ----------------------- | -------------------------------- |
| POST    | `/api/auth/otp/send`    | Phone OTP                        |
| POST    | `/api/auth/otp/verify`  | Session                          |
| GET/PUT | `/api/me/config`        | Load / save draft (auth)         |
| POST    | `/api/me/assets`        | Signed upload                    |
| POST    | `/api/billing/checkout` | Razorpay                         |
| POST    | `/api/billing/webhook`  | Activate / suspend               |
| POST    | `/api/tools/:id`        | BFF to Advisorkhoj calculator    |
| POST    | `/api/leads`            | Public, tenant from host or body |
| GET     | `/api/admin/tenants`    | Ops, later                       |

Public site is RSC/SSR from `tenants.config` by host. No public GET of another tenant’s config.

**Tools BFF:** `site-kit` posts inputs to `/api/tools/sip` (etc.). Server calls Advisorkhoj, returns a small DTO (invested, value, chart points). Hide tools whose API is not ready. Never expose legacy URLs or keys to the browser.

Lead gate: calculator UI withholds the full result until name + mobile; then `POST /api/leads` and show result + WhatsApp deep link with numbers in the text.

---

## Auth, billing, add-ons

- Signup: phone OTP. Create `tenant` with `status=draft`, default `practice` or `solo` config + sample-ready empties.
- No ARN verification.
- Add-ons on the draft: `addons: ["tools"]` immediately in preview. After pay, webhook sets `status=active` and paid add-ons stick.
- Unpaid Tools pack: still previewable in Buyer Place; **public site ignores unpaid add-ons**.
- Fail / cancel: `suspended` - public site down or paywall page; config kept.

---

## Build order

1. **Tokens + Practice page** - hardcoded sample, new visual system. Gate: looks better than Investbux.
2. **Schema + renderer** - JSON drives section order, theme, font, template.
3. **Buyer Place** - details, template, theme, font, section list (dnd), add-ons rail, always-on preview.
4. **MySQL + OTP** - persist tenant, publish to `{slug}.{base}`.
5. **SIP BFF + home widget** - then lumpsum, goal SIP, retirement.
6. **Tools pack flag** - extra tools when paid; preview-on, public-off until paid.
7. **Razorpay + leads + WhatsApp notify.**

Do not start step 3 until step 1 passes a visual check.

---

## Ops (minimal)

- Env: DB, OTP, Razorpay, S3, Advisorkhoj API key, WhatsApp.
- `/admin`: list tenants, impersonate (load their config in Buyer Place), suspend. Can be a protected route, not a product.
- Logging: tenant id on every tools/leads call.

---

## Acceptance (tech)

- Changing theme/font/template/section order in the editor updates the **same** components that render `{slug}.{base}` after save.
- Published HTML never contains sample-fill strings if the MFD cleared or replaced those fields.
- Chosen theme/font ids match `ThemeProvider` + `next/font` on both preview and `{slug}.{base}`.
- Public icons come from `react-icons/fi` (+ `FaWhatsapp` only where needed).
- Calculator results come from the BFF, not client-side invented math (except trivial display).
- Unpaid `tools` add-on is visible in preview and absent on the public host.
- One codebase, many tenants - no generated HTML repo per MFD.
