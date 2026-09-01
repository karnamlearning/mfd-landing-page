# MFD Site - UX (now)

Buyer Place: an MFD configures a branded investor site, always sees a live preview with data filled in, and can attach add-ons before paying. After purchase, the same editor is “edit my site.”

ARN verification is **out**. ARN may be typed as optional text.

This file is the now-scope only. Profiler, KYC, portfolio, transact, custom HTML, and self-serve custom domain are not in this UX.

---

## Reference: Investbux

Founder example: [investbux.in](https://www.investbux.in/) - a custom Advisorkhoj-built MFD site (Investbux Financial Services, Ambala). This is the **look and IA to productize**, not a site we clone page-for-page.

### What we take from it (now)

| Pattern                                                        | How it shows up in Buyer Place                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Logo + “AMFI Registered Mutual Fund Distributor” in the header | Locked header. Tagline always on.                                         |
| Lifestyle hero: photo, headline, subcopy, CTA                  | `hero` section. Stock/lifestyle image + their pitch, not only a headshot. |
| Welcome / about blurb                                          | `about` section.                                                          |
| ARN as credential cards (firm + person; AMFI mark)             | `credentials` section. Multiple ARN rows. Not verified.                   |
| Services as icon cards                                         | `services` section. Tick which cards show.                                |
| Stat counters (families, clients, AUM)                         | `stats` section. Three numbers they type.                                 |
| SIP calculator on the home page                                | `calculators` section: one featured tool on the landing page.             |
| Calculators as a first-class area                              | Calculators list (base four; Tools pack extras).                          |
| Footer: address, phone, email, disclaimer                      | Locked footer from Details.                                               |
| Commission disclosures link                                    | Locked footer link to a canned disclosures page.                          |
| Green / white / black professional look                        | Theme `forest` (default on Practice).                                     |
| Firm, not solo-influencer                                      | Template `practice` is the Investbux-like skin.                           |

### What we do **not** take now

Investbux is a **custom multi-page** site. Out of now-scope even though the example has them:

- Client login, partner login, transact / “Invest Now”
- Inner pages per product (PMS, AIF, bonds, unlisted stocks, insurance)
- Our Team page
- Blog + AMC news feeds
- Partner / AMC logo rows
- Sign up
- FAQ hubs (NRI, “financial planning”)
- Mega-nav with 15+ links

Those can become add-ons or later section types. Do not design them in Buyer Place now.

Canned copy must stay AMFI-safer than Investbux where needed (avoid “financial planning” as a product name).

---

## Product surfaces

| Surface     | Who                        | Purpose                                                                   |
| ----------- | -------------------------- | ------------------------------------------------------------------------- |
| Buyer Place | MFD (before and after pay) | Configure template, theme, font, sections, add-ons; preview; pay          |
| Live site   | Investor / prospect        | Public site on a subdomain                                                |
| Ops admin   | Advisorkhoj                | List tenants, impersonate, suspend _(minimal; not designed in this file)_ |

Advisor-only tools (proposals, report builder, MFD planner) stay on MutualFundTools. This product is client-facing.

---

## Layout: Buyer Place

Persistent chrome. The MFD never leaves preview.

```
┌─────────────────────────────────────────────────────────────────┐
│  Advisorkhoj   Buyer Place          [Desktop | Mobile]  Pay     │
├──────────────┬──────────────────────────────────┬───────────────┤
│              │                                  │               │
│  Steps       │         Live preview             │  Add-ons      │
│              │         (their data /            │  (always      │
│  1 Details   │          sample fill)            │   visible)    │
│  2 Template  │                                  │               │
│  3 Theme     │                                  │  Tools pack   │
│  4 Font      │                                  │  [Add]        │
│  5 Sections  │                                  │               │
│  6 Review    │                                  │               │
│              │                                  │               │
└──────────────┴──────────────────────────────────┴───────────────┘
```

- Left: current step controls. Steps are clickable; order is a suggestion, not a lock.
- Centre: live preview of the **real template**. What they see is what publishes.
- Right: add-ons rail. Visible on every step.
- Top: viewport toggle (desktop / mobile). Mobile is the default preview on small screens; on desktop, default to mobile width in the pane so they see the phone site first.

On a phone, stack: preview on top (collapsible), then controls, add-ons as a bottom sheet or trailing section. Preview must remain one tap away (“Show preview”).

---

## Preview rules

1. Preview is available at **every** stage (details, template, theme, font, sections, add-ons, pay).
2. Preview uses **their filled fields**. Empty fields use **sample data** so the site never looks blank.
3. Changing template, theme, font, section order, or an add-on updates the preview immediately.
4. Sample data is clearly sample (e.g. muted label “Sample” on photo/name in the editor only - not on the published site).
5. After they type, sample is replaced for that field and does not come back unless they clear it.

### Sample fill (until they type)

| Field        | Sample                                                          |
| ------------ | --------------------------------------------------------------- |
| Display name | Rahul Sharma                                                    |
| City         | Pune                                                            |
| Pitch        | Mutual fund distributor helping families invest with discipline |
| Bio          | Short AMFI-safe paragraph                                       |
| WhatsApp     | 98765 43210                                                     |
| Photo        | Neutral placeholder portrait                                    |
| Hero image   | Family / goals lifestyle stock                                  |
| Credentials  | One sample ARN card                                             |
| Stats        | 150+ families · 450+ clients · sample AUM                       |
| Testimonials | 2 canned quotes                                                 |
| FAQs         | 3 canned Q&As                                                   |

---

## Step 1 - Details

Fields:

| Field            | Required | Notes                                                                                          |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------- |
| Display name     | Yes      | Firm or person name in header and hero                                                         |
| Logo             | No       | Header. Placeholder wordmark from display name if empty                                        |
| Photo            | No       | Optional headshot for About; hero uses lifestyle image                                         |
| Hero image       | No       | Lifestyle/family/office photo. Sample stock until uploaded                                     |
| Hero headline    | No       | ~90 chars. Sample: “There are as many types of mutual funds as each of your financial goals.”  |
| One-line pitch   | No       | Hero supporting line, ~160 chars                                                               |
| WhatsApp number  | Yes      | Primary CTA                                                                                    |
| Call number      | No       | Defaults to WhatsApp number if empty                                                           |
| Email            | No       |                                                                                                |
| Address          | No       | Footer. City is enough if empty                                                                |
| City             | Yes      |                                                                                                |
| Languages spoken | No       | Chips: English, Hindi, + free add                                                              |
| Bio              | No       | About blurb, ~400 chars. Hint: do not use “financial planner”, “guaranteed”, “assured returns” |
| Credentials      | No       | Repeatable rows: label (e.g. AMFI ARN) + name + number. Not verified. Sample: one ARN row      |
| Stats            | No       | Up to 3: number + label (e.g. `150+` / Happy families)                                         |
| Office hours     | No       | Free text, e.g. Mon–Sat 10am–6pm                                                               |

Primary CTA on the live site is WhatsApp. Enquiry form is always on Contact.

---

## Step 2 - Templates

Three templates. Same tenant data, different layout and default section order. Switching template keeps details, theme (if compatible), font, and add-ons.

| ID         | Name              | Personality                                                                                                                     |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `solo`     | Solo Advisor      | Person-first: headshot in hero, WhatsApp-heavy. Default for new ARNs.                                                           |
| `practice` | Practice / Office | **Investbux-like.** Firm logo, lifestyle hero, credential cards, service cards, stats, home SIP widget. Default theme `forest`. |
| `local`    | Local / Bilingual | English + Hindi toggle in header. Larger type, simpler nav.                                                                     |

UI: three cards with a static thumbnail + “Preview this” which applies it to the live pane. Selected card is highlighted.

`practice` default section order (Investbux rhythm): Hero → About → Credentials → Services → Stats → Calculators → Contact. Testimonials and FAQ off until they add content.

---

## Step 3 - Theme

Colour **packs**, not a free hex picker.

Each theme sets: background, surface, text, muted text, primary, accent, button text.

Offer **8 themes**, usable on all templates:

| ID        | Name       | Feel                                                         |
| --------- | ---------- | ------------------------------------------------------------ |
| `navy`    | Navy trust | Deep navy + gold accent (default for Solo)                   |
| `forest`  | Forest     | Green + cream / black (Investbux-like; default for Practice) |
| `maroon`  | Maroon     | Traditional / serious                                        |
| `sky`     | Sky        | Light blue + white                                           |
| `sand`    | Sand       | Warm beige                                                   |
| `slate`   | Slate      | Grey professional                                            |
| `ink`     | Ink        | Near-black + white, high contrast                            |
| `saffron` | Saffron    | Saffron accent on off-white (default for Local)              |

UI: swatch row. Selected theme applies to preview instantly. Contrast must stay readable (themes are designed, not user-mixed).

---

## Step 4 - Font

**Pairs** only (heading + body). Four to six options:

| ID         | Heading           | Body              | Feel                     |
| ---------- | ----------------- | ----------------- | ------------------------ |
| `modern`   | Plus Jakarta Sans | Plus Jakarta Sans | Default, clean           |
| `formal`   | Playfair Display  | Source Sans 3     | Practice / older clients |
| `friendly` | Nunito            | Nunito            | Approachable, Local      |
| `classic`  | Merriweather      | Lato              | Conservative             |
| `sharp`    | DM Sans           | DM Sans           | Contemporary             |

UI: each option shows “Aa” in that pair. Applying updates preview headings and body at once.

---

## Step 5 - Sections

Fixed catalog. MFD can **show/hide** and **drag to reorder**. They cannot create new section types or edit HTML.

### Catalog

| ID               | Section        | Default on                                         | Notes                                                                                                           |
| ---------------- | -------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `hero`           | Hero           | On                                                 | Lifestyle (or headshot on Solo): headline, subcopy, WhatsApp CTA. Cannot hide. **One slide now** (no carousel). |
| `about`          | About          | On                                                 | Welcome blurb, city, photo if any                                                                               |
| `credentials`    | Credentials    | On for Practice; off for Solo until they add a row | AMFI-style cards: mark + “ARN No {n}”. Multiple rows (firm + person), like Investbux.                           |
| `services`       | Services       | On                                                 | Icon cards from ticks. Card grid, not a text list.                                                              |
| `stats`          | Stats          | On for Practice; off for Solo                      | 3 counters. Hide if all empty (sample in preview only).                                                         |
| `how`            | How I work     | Off on Practice; on on Solo                        | 3 canned steps                                                                                                  |
| `calculators`    | Calculators    | On                                                 | Home: featured SIP widget (Investbux). Also a tool list. Base four; Tools pack extras.                          |
| `testimonials`   | Testimonials   | Off until they add one; sample in preview          | Up to 5: quote, name, city                                                                                      |
| `faq`            | FAQ            | Off on Practice; on on Solo                        | Canned 3; edit/add up to 8                                                                                      |
| `contact`        | Contact        | On                                                 | Form + WhatsApp + address. Cannot hide.                                                                         |
| `whatsapp_strip` | WhatsApp strip | On                                                 | Sticky or mid-page bar                                                                                          |

**Locked (not in the reorder list):**

- Header (logo, AMFI tagline under logo like Investbux, nav, language toggle on `local`)
- Footer (address, phone, email, commission disclosures, market-risk disclaimer, optional Advisorkhoj credit)

Reorder UI: vertical list with drag handle, eye toggle, optional “edit” for testimonials/FAQ/services. Dragging updates preview order.

### Services ticks (inside Services section editor)

Canned rows, tick to show. Each is a **card** (icon + title + 2-line canned copy). No inner product pages now - no “Read more” to a unique URL.

**On by default:** Mutual funds, SIP, Goal-based investing

**Optional (Investbux-like, still cards only):** STP / SWP, Retirement, Life insurance, Health insurance, Bonds

Unticked cards never appear. PMS / AIF / unlisted stocks are **not** in this list (custom-site territory).

---

## Add-ons rail (all stages)

Always visible. Does not wait for a final step.

### Now: Tools pack

- Extra **investor** calculators on the Calculators section (wrap existing Advisorkhoj APIs; do not rebuild math).
- When off: base four only - SIP, lumpsum, goal SIP, retirement (each can be hidden in section options).
- When on: preview immediately shows extra tools (target list, hide if API not ready): SWP, NPS, inflation, compounding, composite goal planner, SIP step-up, lumpsum target - same _class_ of tools as [Investbux calculators](https://www.investbux.in/), not a clone of every slug.
- CTA: Add / Remove. Added state is selected until they pay; after pay it stays on the tenant.

Add-ons do not replace MutualFundTools advisor tools (proposals, report builder, MFD planner). Those stay off this site.

Further add-ons (profiler, KYC, content, extra language) are **not shown** in this version of the rail.

---

## Step 6 - Review and pay

Summary: template, theme, font, visible sections (in order), add-ons, WhatsApp, city.

- Preview still full-size.
- Pay: **₹299/month** or **₹2,999/year**. Sales language may still say ₹10/day.
- On success: site publishes to `{slug}.mfd.advisorkhoj.com` (host TBD).
- Same Buyer Place becomes the editor (labelled “Your site”).

Trial: optional 14 days; product decision, not a separate UX flow beyond a banner.

---

## Live site (investor)

Mobile-first. WhatsApp is the primary conversion.

**Every page**

- Header (logo + AMFI tagline)
- Footer disclaimer
- WhatsApp (header button + strip if enabled)

**Pages (thin - not Investbux’s mega sitemap)**

Default: one scrolling landing page; nav anchors to sections.

Routes now:

- `/` landing
- `/calculators` list + each tool (`/calculators/sip`, …)
- `/disclosures` canned commission + market-risk text

No `/login`, `/blog`, `/news`, `/services/pms`, `/team`.

**Header**

- Logo, AMFI tagline under logo
- Nav: Home, Services, Calculators, About, Contact (only if those sections are on)
- WhatsApp or Call as the action (not Client / Partner login)

**Hero**

- Full-width image, overlay, headline, subcopy, one CTA
- Practice: lifestyle sample; Solo: their photo allowed

**Credentials**

- Cards with accent border, AMFI mark, “{Name} ARN No {number}”

**Services**

- Icon cards in a grid (Investbux “Our Services”)

**Stats**

- Icon + big number + label; three across on desktop, stack on mobile

**Calculators**

- Home featured SIP widget: monthly amount, tenure, expected return → result
- Full list: base four; extras if Tools pack is on
- Result: summary + “Discuss this with {name} on WhatsApp” (numbers in the message)
- Soft gate: name + mobile before full result → creates a lead

**Contact form**

- Name, mobile, city (optional), message → lead + notify MFD (WhatsApp/email)
- Footer also shows phone, email, address like Investbux

**Bilingual (`local` template)**

- Header toggle EN / हिं. Canned UI strings in both languages. User-entered bio stays as typed unless they fill both (optional second bio field on Details when template is `local`).

---

## After purchase: editor

Identical to Buyer Place. Differences:

- Top: “Your site” + public URL + Copy + QR
- Pay button becomes **Billing**
- Leads: simple list (name, mobile, source `form` | `sip_calc` | …, time, Open WhatsApp)

No CRM. No blog CMS.

---

## Guardrails (UX copy and controls)

- Cannot hide Hero, Contact, AMFI bar, Footer.
- Cannot remove AMFI tagline.
- Theme/font from lists only.
- Bio: inline hint on banned phrases; do not hard-block in v1.
- No AMC / partner logo rows (Investbux has them; we do not now).
- No “financial planning” in canned copy.
- No login / transact buttons in the header.

---

## Out of this file (do not design now)

ARN verification, KYC, risk profiler, portfolio / client / partner login, BSE/NSE/MFU transact, extra templates, arbitrary colours/fonts, new section types, page builder, self-serve custom domain, blog + news feed, AMC/partner logo row, team page, PMS/AIF/unlisted inner pages, native app, hero carousel (more than one slide).

---

## UX acceptance (now)

An MFD can, without a designer:

1. Enter details (no ARN check) and see the preview fill.
2. Pick **Practice / Office** and see an Investbux-like rhythm (hero, credentials, service cards, stats, SIP widget) with their data.
3. Pick a template, theme, and font; preview updates each time.
4. Reorder and hide/show sections; preview matches.
5. Toggle Tools pack from any step; calculators in preview change.
6. Preview on mobile and desktop at every stage.
7. Pay and get a live subdomain that matches the last preview.
8. Come back and change any of the above without starting over.
