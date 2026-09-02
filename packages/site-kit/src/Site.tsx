"use client"

import { Fragment, useEffect, useLayoutEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import { FiMenu, FiShield, FiX } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa6"
import { familyOf, lockedSectionIds, lookOf, mergeSample, visibleToolIds, type SectionId, type TenantConfig, type ToolId } from "@mfd/schema"
import { coerceTheme, fontPairs, getTheme } from "@mfd/tokens"
import { brandCopy, brandService } from "./brand"
import { copy, toolCopy, type Copy, type Locale } from "./copy"
import { ChromeContext } from "./chrome-context"
import { Calculator } from "./Calculator"
import { DisclosuresBody, ToolBody, ToolsIndex } from "./Tools"
import { GlobalStyle } from "./GlobalStyle"
import * as S from "./styles"
import { parseInternalHref, scrollSiteTo, waHref } from "./utils"
import { HeraldHome } from "./HeraldHome"
import { LumenHome } from "./LumenHome"
import { heroLayout, onHashNav, SERVICE_ICONS, type SkinCtx } from "./skin-shared"

const ICONS = SERVICE_ICONS

export type PreviewSpotId =
  | "header"
  | "top"
  | "photo"
  | "about"
  | "credentials"
  | "services"
  | "stats"
  | "how"
  | "calculators"
  | "testimonials"
  | "faq"
  | "contact"
  | "whatsapp"

export type SiteProps = {
  config: TenantConfig
  /** When true, empty fields are filled from sampleFill. Never true on the public host. */
  preview?: boolean
  /** Nested in Buyer Place — do not paint document `body`. */
  embedded?: boolean
  /** Buyer Place: scroll + highlight this block when the tick changes. */
  previewFocus?: { id: PreviewSpotId; tick: number } | null
  children?: ReactNode
}

const LOCKED = new Set<string>(lockedSectionIds)

function activeSections(config: TenantConfig) {
  return config.sections
    .map((row) => (LOCKED.has(row.id) ? { ...row, on: true } : row))
    .filter((row) => row.on)
}

type Ctx = SkinCtx

function Header({ ctx, locale, onLocale }: { ctx: Ctx; locale: Locale; onLocale: (l: Locale) => void }) {
  const { config, t, wa, previewPath } = ctx
  const [menu, setMenu] = useState(false)
  const on = new Set(activeSections(config).map((s) => s.id))
  const links = [
    { id: "about" as const, href: "/#about", label: t.about },
    { id: "services" as const, href: "/#services", label: t.services },
    { id: "calculators" as const, href: "/#calculators", label: t.calculators },
    { id: "contact" as const, href: "/#contact", label: t.contact },
  ].filter((l) => on.has(l.id))
  const menuLinks = [
    { id: "about" as const, href: "/#about", label: t.about },
    { id: "services" as const, href: "/#services", label: t.services },
    { id: "how" as const, href: "/#how", label: t.howNav },
    { id: "calculators" as const, href: "/#calculators", label: t.calculators },
    { id: "testimonials" as const, href: "/#testimonials", label: t.quotesNav },
    { id: "faq" as const, href: "/#faq", label: t.faqNav },
    { id: "contact" as const, href: "/#contact", label: t.contact },
  ].filter((l) => on.has(l.id))

  useEffect(() => {
    setMenu(false)
  }, [previewPath])

  return (
    <S.HeaderBar data-spot="header">
      <S.HeaderInner>
        <S.MenuBtn type="button" aria-label={t.menu} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
          {menu ? <FiX size={18} /> : <FiMenu size={18} />}
        </S.MenuBtn>
        <S.Brand href="/" onClick={onHashNav}>
          {config.details.logoUrl ? (
            <S.Logo src={config.details.logoUrl} alt={config.details.name} />
          ) : (
            <S.BrandName>{config.details.name}</S.BrandName>
          )}
          {/* Locked AMFI bar — not a section, not editable, not hideable. */}
          <S.Tagline>{t.amfi}</S.Tagline>
        </S.Brand>
        <S.Nav>
          {links.map((l) => (
            <a key={l.id} href={l.href} onClick={onHashNav}>
                {l.label}
              </a>
          ))}
        </S.Nav>
        {config.addons.includes("bilingual") ? (
          <S.LangToggle>
            <S.LangBtn type="button" $on={locale === "en"} onClick={() => onLocale("en")}>
              EN
            </S.LangBtn>
            <S.LangBtn type="button" $on={locale === "hi"} onClick={() => onLocale("hi")}>
              हिं
            </S.LangBtn>
          </S.LangToggle>
        ) : null}
        <S.WaBtn href={wa} target="_blank" rel="noreferrer">
          <FaWhatsapp size={16} aria-hidden />
          <S.WaLabel>{t.wa}</S.WaLabel>
        </S.WaBtn>
      </S.HeaderInner>
      {menu ? (
        <S.Wrap>
          <S.MobileNav>
            {menuLinks.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => {
                  setMenu(false)
                  onHashNav(e)
                }}
              >
                {l.label}
              </a>
            ))}
          </S.MobileNav>
        </S.Wrap>
      ) : null}
    </S.HeaderBar>
  )
}

function HeroSection({ ctx }: { ctx: Ctx }) {
  const { config, t, wa } = ctx
  const d = config.details
  const tpl = config.template
  const look = lookOf(config)
  const layout = heroLayout(look, tpl)
  const src = tpl === "solo" || look === "folio" ? d.photoUrl || d.heroImageUrl : d.heroImageUrl || d.photoUrl

  const photoInHero = tpl === "solo" || look === "folio"

  return (
    <S.Hero id="top" data-spot="top" $template={tpl} $layout={layout}>
      {src ? <S.HeroImg src={src} alt="" $layout={layout} data-spot={photoInHero ? "photo" : undefined} /> : null}
      {layout !== "split" ? <S.HeroShade /> : null}
      <S.HeroCopy $layout={layout}>
        <S.Eyebrow>{d.city}</S.Eyebrow>
        <S.HeroTitle $template={tpl}>{d.heroHeadline}</S.HeroTitle>
        <S.HeroLead>{d.pitch}</S.HeroLead>
        <S.HeroActions>
          <S.WaBtn href={wa} target="_blank" rel="noreferrer">
            <FaWhatsapp size={16} aria-hidden />
            {ctx.b.cta}
          </S.WaBtn>
          {ctx.config.sections.some((s) => s.id === "calculators" && s.on) ? (
            <S.GhostBtn href="/#calculators" onClick={onHashNav}>{t.seeCalcs}</S.GhostBtn>
          ) : null}
        </S.HeroActions>
      </S.HeroCopy>
    </S.Hero>
  )
}

function AboutSection({ ctx }: { ctx: Ctx }) {
  const { config, t, b, locale } = ctx
  const d = config.details
  const bio = locale === "hi" && d.bioHi ? d.bioHi : d.bio
  const langs = d.languages.filter(Boolean).join(" · ")
  return (
    <S.Section id="about" data-spot="about">
      <S.Wrap>
        <S.AboutGrid>
          <div>
            <S.Kicker>{t.welcome}</S.Kicker>
            <S.H2>{b.aboutTitle}</S.H2>
            <S.Bio>{bio}</S.Bio>
            {langs || d.hours ? (
              <S.MetaRow>
                {langs ? langs : null}
                {langs && d.hours ? " · " : null}
                {d.hours ? `${t.hoursLabel}: ${d.hours}` : null}
              </S.MetaRow>
            ) : null}
          </div>
          {config.template !== "solo" && lookOf(config) !== "folio" && d.photoUrl ? (
            <S.Portrait src={d.photoUrl} alt={d.name} data-spot="photo" />
          ) : null}
        </S.AboutGrid>
        <S.Kicker style={{ marginTop: "2rem" }}>{t.about}</S.Kicker>
        <S.H2>{b.whyTitle}</S.H2>
        <S.WhyGrid>
          {b.why.map((item) => (
            <S.WhyCard key={item.title}>
              <S.ServiceTitle>{item.title}</S.ServiceTitle>
              <S.ServiceCopy>{item.body}</S.ServiceCopy>
            </S.WhyCard>
          ))}
        </S.WhyGrid>
      </S.Wrap>
    </S.Section>
  )
}

function CredentialsSection({ ctx }: { ctx: Ctx }) {
  const { config, t } = ctx
  if (!config.details.credentials.length) return null
  return (
    <S.Section id="credentials" data-spot="credentials">
      <S.Wrap>
        <S.Kicker>{t.registration}</S.Kicker>
        <S.H2>{ctx.b.recordTitle}</S.H2>
        <S.CredGrid>
          {config.details.credentials.map((c) => (
            <S.CredCard key={c.number}>
              <S.CredMark>
                <FiShield size={20} aria-hidden />
              </S.CredMark>
              <S.CredMeta>
                <S.CredLabel>{c.label}</S.CredLabel>
                <strong>
                  {c.name} ARN No {c.number}
                </strong>
              </S.CredMeta>
            </S.CredCard>
          ))}
        </S.CredGrid>
      </S.Wrap>
    </S.Section>
  )
}

function ServicesSection({ ctx }: { ctx: Ctx }) {
  const { config, t, b, locale } = ctx
  const list = lookOf(config) === "folio"
  return (
    <S.Section id="services" data-spot="services">
      <S.Wrap>
        <S.Kicker>{t.services}</S.Kicker>
        <S.H2>{b.servicesTitle}</S.H2>
        <S.SectionLead>{b.servicesLead}</S.SectionLead>
        <S.ServiceGrid $list={list}>
          {config.services.map((id) => {
            const item = brandService(id, config.wording, locale)
            if (!item) return null
            const Icon = ICONS[id as keyof typeof ICONS] ?? ICONS.mutual_funds
            return (
              <S.ServiceCard key={id} $list={list}>
                {list ? null : (
                  <S.IconWrap>
                    <Icon size={18} aria-hidden />
                  </S.IconWrap>
                )}
                <S.ServiceTitle>{item.title}</S.ServiceTitle>
                <S.ServiceCopy>{item.body}</S.ServiceCopy>
              </S.ServiceCard>
            )
          })}
        </S.ServiceGrid>
      </S.Wrap>
    </S.Section>
  )
}

function StatsSection({ ctx }: { ctx: Ctx }) {
  const stats = ctx.config.details.stats
  if (!stats.length) return null
  return (
    <S.Section id="stats" data-spot="stats">
      <S.Wrap>
        <S.StatRow>
          {stats.map((s) => (
            <div key={s.label}>
              <S.StatValue>{s.value}</S.StatValue>
              <S.StatLabel>{s.label}</S.StatLabel>
            </div>
          ))}
        </S.StatRow>
      </S.Wrap>
    </S.Section>
  )
}

function HowSection({ ctx }: { ctx: Ctx }) {
  const { t, b } = ctx
  return (
    <S.Section id="how" data-spot="how">
      <S.Wrap>
        <S.Kicker>{t.howKicker}</S.Kicker>
        <S.H2>{b.howTitle}</S.H2>
        <S.SectionLead>{b.howLead}</S.SectionLead>
        <S.StepGrid>
          {b.how.map((step, i) => (
            <S.Step key={`${step.title}-${i}`}>
              <S.StepN>0{i + 1}</S.StepN>
              <S.ServiceTitle>{step.title}</S.ServiceTitle>
              <S.ServiceCopy>{step.body}</S.ServiceCopy>
            </S.Step>
          ))}
        </S.StepGrid>
      </S.Wrap>
    </S.Section>
  )
}

function CalculatorsSection({ ctx }: { ctx: Ctx }) {
  const { config, t, locale, preview } = ctx
  const visible = visibleToolIds(config)
  const rest = visible.filter((id) => id !== "sip")
  const hi = locale === "hi"
  const showSip = visible.includes("sip")

  return (
    <S.Section id="calculators" data-spot="calculators">
      <S.Wrap>
        <S.Kicker>{t.planning}</S.Kicker>
        <S.H2>{ctx.b.calcTitle}</S.H2>
        <S.SectionLead>{ctx.b.calcLead}</S.SectionLead>
        {showSip ? <Calculator tool="sip" config={config} t={t} preview={preview} compact /> : null}
        {rest.length ? (
          <S.ServiceGrid style={{ marginTop: "2rem" }}>
            {rest.map((id) => {
              const item = toolCopy[id]
              if (!item) return null
              const card = (
                <S.ServiceCard>
                  <S.ServiceTitle>{hi ? item.titleHi : item.title}</S.ServiceTitle>
                  <S.ServiceCopy>{hi ? item.blurbHi : item.blurb}</S.ServiceCopy>
                </S.ServiceCard>
              )
              return (
                <a key={id} href={`/calculators/${id}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {card}
                </a>
              )
            })}
          </S.ServiceGrid>
        ) : null}
      </S.Wrap>
    </S.Section>
  )
}

function TestimonialsSection({ ctx }: { ctx: Ctx }) {
  const items = ctx.config.testimonials
  const t = ctx.t
  if (!items.length) return null
  return (
    <S.Section id="testimonials" data-spot="testimonials">
      <S.Wrap>
        <S.Kicker>{t.quotesKicker}</S.Kicker>
        <S.H2>{ctx.b.quotesTitle}</S.H2>
        <S.QuoteGrid>
          {items.map((item) => (
            <S.Quote key={item.name}>
              <p>“{item.quote}”</p>
              <footer>
                {item.name}, {item.city}
              </footer>
            </S.Quote>
          ))}
        </S.QuoteGrid>
      </S.Wrap>
    </S.Section>
  )
}

function FaqSection({ ctx }: { ctx: Ctx }) {
  const { config, locale, t } = ctx
  if (!config.faq.length) return null
  return (
    <S.Section id="faq" data-spot="faq">
      <S.Wrap>
        <S.Kicker>{t.faqKicker}</S.Kicker>
        <S.H2>{ctx.b.faqTitle}</S.H2>
        <S.FaqList>
          {config.faq.map((item) => (
            <div key={item.q}>
              <S.FaqQ>{locale === "hi" && item.qHi ? item.qHi : item.q}</S.FaqQ>
              <S.FaqA>{locale === "hi" && item.aHi ? item.aHi : item.a}</S.FaqA>
            </div>
          ))}
        </S.FaqList>
      </S.Wrap>
    </S.Section>
  )
}

function ContactSection({ ctx }: { ctx: Ctx }) {
  const { config, t, preview, wa } = ctx
  const d = config.details
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name") ?? "").trim()
    const mobile = String(fd.get("mobile") ?? "").replace(/\D/g, "")
    const city = String(fd.get("city") ?? "").trim()
    const message = String(fd.get("message") ?? "").trim()
    if (!name || mobile.length !== 10) {
      setError("Enter name and a 10-digit mobile.")
      return
    }
    if (preview) {
      setSent(true)
      return
    }
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, mobile, city, message, source: "form" }),
      })
      if (!res.ok) {
        setError("Could not send. Try again.")
        return
      }
      setSent(true)
    } catch {
      setError("Could not send. Try again.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <S.Section id="contact" data-spot="contact">
      <S.Wrap>
        <S.ContactGrid>
          <div>
            <S.Kicker>{t.contact}</S.Kicker>
            <S.H2>{ctx.b.contactTitle}</S.H2>
            <S.Bio>
              {d.address}
              {d.city && (!d.address || !d.address.toLowerCase().includes(d.city.toLowerCase()))
                ? `${d.address ? ", " : ""}${d.city}`
                : null}
            </S.Bio>
            <S.ContactList>
              {d.phone ? (
                <a href={`tel:+91${d.phone.replace(/\D/g, "").slice(-10)}`}>
                  {t.call}: {d.phone}
                </a>
              ) : null}
              {d.whatsapp ? (
                <a href={wa} target="_blank" rel="noreferrer">
                  {t.wa}: {d.whatsapp}
                </a>
              ) : null}
              {d.email ? <a href={`mailto:${d.email}`}>{d.email}</a> : null}
              {d.hours ? (
                <span>
                  {t.hoursLabel}: {d.hours}
                </span>
              ) : null}
            </S.ContactList>
          </div>
          {sent ? (
            <S.Bio>{t.sent}</S.Bio>
          ) : (
            <S.Form onSubmit={(e) => void onSubmit(e)}>
              <S.Field>
                {t.name}
                <S.Input name="name" required autoComplete="name" />
              </S.Field>
              <S.Field>
                {t.mobile}
                <S.PhoneField>
                  <S.PhonePrefix>+91</S.PhonePrefix>
                  <S.PhoneInput
                    name="mobile"
                    type="tel"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                  />
                </S.PhoneField>
              </S.Field>
              <S.Field>
                {t.city}
                <S.Input name="city" autoComplete="address-level2" />
              </S.Field>
              <S.Field>
                {t.message}
                <S.Area name="message" rows={3} />
              </S.Field>
              {error ? <S.ServiceCopy>{error}</S.ServiceCopy> : null}
              <S.Submit type="submit" disabled={busy}>
                {busy ? "…" : t.send}
              </S.Submit>
            </S.Form>
          )}
        </S.ContactGrid>
      </S.Wrap>
    </S.Section>
  )
}

function WhatsappStrip({ ctx }: { ctx: Ctx }) {
  return (
    <S.Strip id="whatsapp" data-spot="whatsapp" href={ctx.wa} target="_blank" rel="noreferrer">
      <FaWhatsapp size={18} aria-hidden />
      {ctx.t.wa} {ctx.config.details.name}
    </S.Strip>
  )
}

function Footer({ ctx }: { ctx: Ctx }) {
  const d = ctx.config.details
  const t = ctx.t
  return (
    <S.Foot id="footer">
      <S.Wrap>
        <S.FootTop>
          <div>
            <S.BrandName>{d.name}</S.BrandName>
            <S.ContactList>
              <span>
                {d.address}
                {d.city && (!d.address || !d.address.toLowerCase().includes(d.city.toLowerCase()))
                  ? `${d.address ? ", " : ""}${d.city}`
                  : null}
              </span>
              {d.phone ? <span>{t.call}: {d.phone}</span> : null}
              {d.email ? <a href={`mailto:${d.email}`}>{d.email}</a> : null}
              {d.hours ? <span>{t.hoursLabel}: {d.hours}</span> : null}
            </S.ContactList>
          </div>
          <S.FootNav>
            <a href="/" onClick={onHashNav}>
              {t.home}
            </a>
            <a href="/#services" onClick={onHashNav}>
              {t.services}
            </a>
            <a href="/calculators" onClick={onHashNav}>
              {t.calculators}
            </a>
            <a href="/disclosures" onClick={onHashNav}>
              {t.disclosures}
            </a>
          </S.FootNav>
        </S.FootTop>
        <S.Disclaimer>{ctx.t.disclaimer(d.name)}</S.Disclaimer>
      </S.Wrap>
    </S.Foot>
  )
}

const registry: Record<SectionId, (ctx: Ctx) => ReactNode> = {
  hero: (ctx) => <HeroSection ctx={ctx} />,
  about: (ctx) => <AboutSection ctx={ctx} />,
  credentials: (ctx) => <CredentialsSection ctx={ctx} />,
  services: (ctx) => <ServicesSection ctx={ctx} />,
  stats: (ctx) => <StatsSection ctx={ctx} />,
  how: (ctx) => <HowSection ctx={ctx} />,
  calculators: (ctx) => <CalculatorsSection ctx={ctx} />,
  testimonials: (ctx) => <TestimonialsSection ctx={ctx} />,
  faq: (ctx) => <FaqSection ctx={ctx} />,
  contact: (ctx) => <ContactSection ctx={ctx} />,
  whatsapp_strip: (ctx) => <WhatsappStrip ctx={ctx} />,
}

function PreviewInner({ path, ctx }: { path: string; ctx: Ctx }) {
  const { config, locale, preview } = ctx
  if (path === "/calculators") return <ToolsIndex config={config} locale={locale} />
  if (path.startsWith("/calculators/")) {
    const tool = path.slice("/calculators/".length)
    if (!visibleToolIds(config).includes(tool as ToolId)) return <ToolsIndex config={config} locale={locale} />
    return <ToolBody config={config} tool={tool} locale={locale} preview={preview} />
  }
  if (path === "/disclosures") {
    return <DisclosuresBody name={config.details.name} arn={config.details.arn ?? ""} />
  }
  return null
}

export function Site({ config, preview = false, embedded = false, previewFocus = null, children }: SiteProps) {
  const resolved = mergeSample(config, preview)
  const family = familyOf(resolved)
  const look = lookOf(resolved)
  const [locale, setLocale] = useState<Locale>("en")
  const [nav, setNav] = useState({ path: "/", hash: "top", tick: 0 })
  const [spot, setSpot] = useState<PreviewSpotId | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const theme = getTheme(coerceTheme(family, resolved.theme))
  const font = fontPairs[resolved.font]
  const bilingual = resolved.addons.includes("bilingual")
  const t = copy[bilingual ? locale : "en"]
  const wa = waHref(resolved.details.whatsapp)
  const ctx: Ctx = {
    config: resolved,
    t,
    b: brandCopy(resolved, t, bilingual ? locale : "en"),
    locale: bilingual ? locale : "en",
    wa,
    preview,
    embedded,
    previewPath: nav.path,
  }

  useLayoutEffect(() => {
    if (!embedded) return
    const root = rootRef.current
    if (!root) return
    const id =
      nav.hash ||
      (nav.path.startsWith("/calculators") ? "calculators" : nav.path === "/" ? "top" : "")
    if (!id) return
    scrollSiteTo(root, id)
  }, [embedded, nav.hash, nav.path, nav.tick])

  useLayoutEffect(() => {
    if (!embedded || !previewFocus) return
    if (nav.path !== "/") {
      setSpot(previewFocus.id)
      setNav({
        path: "/",
        hash: previewFocus.id === "header" ? "top" : previewFocus.id,
        tick: previewFocus.tick,
      })
      return
    }
    const root = rootRef.current
    if (!root) return
    setSpot(previewFocus.id)
    const run = () => scrollSiteTo(root, previewFocus.id)
    run()
    const raf = requestAnimationFrame(run)
    const later = window.setTimeout(run, 80)
    const t = window.setTimeout(() => setSpot(null), 3200)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(later)
      window.clearTimeout(t)
    }
  }, [embedded, previewFocus, nav.path])

  function onPreviewClick(e: MouseEvent<HTMLDivElement>) {
    if (!embedded) return
    const a = (e.target as HTMLElement).closest("a")
    if (!a || a.target === "_blank") return
    const href = a.getAttribute("href") ?? ""
    const parsed = parseInternalHref(href)
    if (!parsed) return
    e.preventDefault()
    e.stopPropagation()
    const path = parsed.path
    const hash =
      parsed.hash ||
      (path === "/" ? "top" : path.startsWith("/calculators") ? "calculators" : "")
    setNav((s) => ({ path, hash, tick: s.tick + 1 }))
  }

  const previewPage = embedded ? <PreviewInner path={nav.path} ctx={ctx} /> : null
  const body =
    (embedded && nav.path !== "/" ? previewPage : null) ??
    children ??
    activeSections(resolved).map((row) => {
      const render = registry[row.id]
      return render ? <Fragment key={row.id}>{render(ctx)}</Fragment> : null
    })

  return (
    <ThemeProvider theme={theme}>
      <ChromeContext.Provider
        value={{
          locale: ctx.locale,
          t,
          name: resolved.details.name,
          arn: resolved.details.arn ?? "",
        }}
      >
      <S.Root
        ref={rootRef}
        data-site-root
        data-preview-nav={embedded ? "" : undefined}
        $heading={font.headingVar}
        $body={font.bodyVar}
        $template={resolved.template}
        $family={family}
        $look={look}
        $embedded={embedded}
        data-preview-spot={spot ?? undefined}
        onClickCapture={onPreviewClick}
      >
        <GlobalStyle $embedded={embedded} />
        {family === "herald" ? (
          <HeraldHome ctx={ctx} locale={locale} onLocale={setLocale} body={embedded && nav.path !== "/" ? body : children} />
        ) : family === "lumen" ? (
          <LumenHome ctx={ctx} locale={locale} onLocale={setLocale} body={embedded && nav.path !== "/" ? body : children} />
        ) : (
          <>
            <Header ctx={ctx} locale={locale} onLocale={setLocale} />
            {body}
            <Footer ctx={ctx} />
          </>
        )}
      </S.Root>
      </ChromeContext.Provider>
    </ThemeProvider>
  )
}
