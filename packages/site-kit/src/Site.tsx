"use client"

import { Fragment, useState, type FormEvent, type ReactNode } from "react"
import { ThemeProvider } from "styled-components"
import {
  FiHeart,
  FiLayers,
  FiPieChart,
  FiRefreshCw,
  FiRepeat,
  FiShield,
  FiSunrise,
  FiTarget,
} from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa6"
import { baseToolIds, mergeSample, visibleToolIds, type SectionId, type TenantConfig } from "@mfd/schema"
import { fontPairs, getTheme } from "@mfd/tokens"
import { copy, serviceCopy, toolCopy, type Copy, type Locale } from "./copy"
import { Calculator } from "./Calculator"
import { GlobalStyle } from "./GlobalStyle"
import * as S from "./styles"
import { firstName, waHref } from "./utils"

const ICONS = {
  mutual_funds: FiPieChart,
  sip: FiRepeat,
  goals: FiTarget,
  stp_swp: FiRefreshCw,
  retirement: FiSunrise,
  life_insurance: FiHeart,
  health_insurance: FiHeart,
  bonds: FiLayers,
} as const

const LOCKED = new Set<SectionId>(["hero", "contact"])

export type SiteProps = {
  config: TenantConfig
  /** When true, empty fields are filled from sampleFill. Never true on the public host. */
  preview?: boolean
  /** Nested in Buyer Place — do not paint document `body`. */
  embedded?: boolean
  children?: ReactNode
}

function activeSections(config: TenantConfig) {
  return config.sections
    .map((row) => (LOCKED.has(row.id) ? { ...row, on: true } : row))
    .filter((row) => row.on)
}

type Ctx = {
  config: TenantConfig
  t: Copy
  locale: Locale
  wa: string
  preview: boolean
  embedded: boolean
}

function Header({ ctx, locale, onLocale }: { ctx: Ctx; locale: Locale; onLocale: (l: Locale) => void }) {
  const { config, t, wa } = ctx
  const on = new Set(activeSections(config).map((s) => s.id))
  const links = [
    { id: "about" as const, href: "/#about", label: t.about },
    { id: "services" as const, href: "/#services", label: t.services },
    { id: "calculators" as const, href: "/calculators", label: t.calculators },
    { id: "contact" as const, href: "/#contact", label: t.contact },
  ].filter((l) => on.has(l.id))

  return (
    <S.HeaderBar>
      <S.HeaderInner>
        <S.Brand href="/">
          {config.details.logoUrl ? (
            <S.Logo src={config.details.logoUrl} alt={config.details.name} />
          ) : (
            <S.BrandName>{config.details.name}</S.BrandName>
          )}
          <S.Tagline>{t.amfi}</S.Tagline>
        </S.Brand>
        <S.Nav>
          {links.map((l) => (
            <a key={l.id} href={l.href}>
              {l.label}
            </a>
          ))}
        </S.Nav>
        {config.template === "local" ? (
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
          {t.wa}
        </S.WaBtn>
      </S.HeaderInner>
    </S.HeaderBar>
  )
}

function HeroSection({ ctx }: { ctx: Ctx }) {
  const { config, t, wa } = ctx
  const d = config.details
  const tpl = config.template
  const src = tpl === "solo" ? d.photoUrl || d.heroImageUrl : d.heroImageUrl || d.photoUrl

  return (
    <S.Hero id="top" $template={tpl}>
      {src ? <S.HeroImg src={src} alt="" $template={tpl} /> : null}
      {tpl !== "solo" ? <S.HeroShade /> : null}
      <S.HeroCopy $template={tpl}>
        <S.Eyebrow>{d.city}</S.Eyebrow>
        <S.HeroTitle $template={tpl}>{d.heroHeadline}</S.HeroTitle>
        <S.HeroLead>{d.pitch}</S.HeroLead>
        <S.WaBtn href={wa} target="_blank" rel="noreferrer">
          <FaWhatsapp size={16} aria-hidden />
          {t.talkTo(firstName(d.name))}
        </S.WaBtn>
      </S.HeroCopy>
    </S.Hero>
  )
}

function AboutSection({ ctx }: { ctx: Ctx }) {
  const { config, t, locale } = ctx
  const d = config.details
  const bio = locale === "hi" && d.bioHi ? d.bioHi : d.bio
  return (
    <S.Section id="about">
      <S.Wrap>
        <S.AboutGrid>
          <div>
            <S.Kicker>{t.about}</S.Kicker>
            <S.H2>{t.aboutTitle(d.city)}</S.H2>
            <S.Bio>{bio}</S.Bio>
          </div>
          {config.template !== "solo" && d.photoUrl ? (
            <S.Portrait src={d.photoUrl} alt={d.name} />
          ) : null}
        </S.AboutGrid>
      </S.Wrap>
    </S.Section>
  )
}

function CredentialsSection({ ctx }: { ctx: Ctx }) {
  const { config, t } = ctx
  if (!config.details.credentials.length) return null
  return (
    <S.Section id="credentials">
      <S.Wrap>
        <S.Kicker>{t.registration}</S.Kicker>
        <S.H2>{t.recordTitle}</S.H2>
        <S.CredGrid>
          {config.details.credentials.map((c) => (
            <S.CredCard key={c.number}>
              <S.CredMark>
                <FiShield size={20} aria-hidden />
              </S.CredMark>
              <S.CredMeta>
                <S.CredLabel>{c.label}</S.CredLabel>
                <strong>
                  {c.name} · {c.number}
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
  const { config, t, locale } = ctx
  return (
    <S.Section id="services">
      <S.Wrap>
        <S.Kicker>{t.services}</S.Kicker>
        <S.H2>{t.servicesTitle}</S.H2>
        <S.ServiceGrid>
          {config.services.map((id) => {
            const item = serviceCopy[id]
            if (!item) return null
            const Icon = ICONS[id as keyof typeof ICONS] ?? FiPieChart
            return (
              <S.ServiceCard key={id}>
                <S.IconWrap>
                  <Icon size={18} aria-hidden />
                </S.IconWrap>
                <S.ServiceTitle>{locale === "hi" ? item.titleHi : item.title}</S.ServiceTitle>
                <S.ServiceCopy>{locale === "hi" ? item.bodyHi : item.body}</S.ServiceCopy>
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
    <S.Section id="stats">
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
  const { t } = ctx
  return (
    <S.Section id="how">
      <S.Wrap>
        <S.Kicker>{t.howKicker}</S.Kicker>
        <S.H2>{t.howTitle}</S.H2>
        <S.StepGrid>
          {t.how.map((step, i) => (
            <S.Step key={step.title}>
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
  const { config, t, locale, preview, embedded } = ctx
  const visible = visibleToolIds(config)
  const extras = visible.filter((id) => !(baseToolIds as readonly string[]).includes(id))
  const hi = locale === "hi"
  const showSip = visible.includes("sip")

  return (
    <S.Section id="calculators">
      <S.Wrap>
        <S.Kicker>{t.planning}</S.Kicker>
        <S.H2>{t.calcTitle}</S.H2>
        {showSip ? <Calculator tool="sip" config={config} t={t} preview={preview} compact /> : null}
        {extras.length ? (
          <S.ServiceGrid style={{ marginTop: "2rem" }}>
            {extras.map((id) => {
              const item = toolCopy[id]
              if (!item) return null
              const card = (
                <S.ServiceCard>
                  <S.ServiceTitle>{hi ? item.titleHi : item.title}</S.ServiceTitle>
                  <S.ServiceCopy>{hi ? item.blurbHi : item.blurb}</S.ServiceCopy>
                </S.ServiceCard>
              )
              return embedded ? (
                <div key={id}>{card}</div>
              ) : (
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
  if (!items.length) return null
  return (
    <S.Section id="testimonials">
      <S.Wrap>
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
  const { config, locale } = ctx
  if (!config.faq.length) return null
  return (
    <S.Section id="faq">
      <S.Wrap>
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
  const { config, t, preview } = ctx
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
    <S.Section id="contact">
      <S.Wrap>
        <S.ContactGrid>
          <div>
            <S.Kicker>{t.contact}</S.Kicker>
            <S.H2>{t.contactTitle}</S.H2>
            <S.Bio>
              {d.address}
              <br />
              {d.city}
              <br />
              {d.hours}
              <br />
              <a href={`mailto:${d.email}`}>{d.email}</a>
            </S.Bio>
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
    <S.Strip href={ctx.wa} target="_blank" rel="noreferrer">
      <FaWhatsapp size={18} aria-hidden />
      {ctx.t.wa} {ctx.config.details.name}
    </S.Strip>
  )
}

function Footer({ ctx }: { ctx: Ctx }) {
  const d = ctx.config.details
  return (
    <S.Foot>
      <S.Wrap>
        <S.FootTop>
          <div>
            <S.BrandName>{d.name}</S.BrandName>
            <p>
              {d.address}, {d.city}
            </p>
          </div>
          <a href="/disclosures">{ctx.t.disclosures}</a>
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

export function Site({ config, preview = false, embedded = false, children }: SiteProps) {
  const resolved = mergeSample(config, preview)
  const [locale, setLocale] = useState<Locale>("en")
  const theme = getTheme(resolved.theme)
  const font = fontPairs[resolved.font]
  const t = copy[resolved.template === "local" ? locale : "en"]
  const wa = waHref(resolved.details.whatsapp)
  const ctx: Ctx = {
    config: resolved,
    t,
    locale: resolved.template === "local" ? locale : "en",
    wa,
    preview,
    embedded,
  }

  return (
    <ThemeProvider theme={theme}>
      <S.Root $heading={font.headingVar} $body={font.bodyVar} $template={resolved.template} $embedded={embedded}>
        <GlobalStyle $embedded={embedded} />
        <Header ctx={ctx} locale={locale} onLocale={setLocale} />
        {children ??
          activeSections(resolved).map((row) => {
            const render = registry[row.id]
            return render ? <Fragment key={row.id}>{render(ctx)}</Fragment> : null
          })}
        <Footer ctx={ctx} />
      </S.Root>
    </ThemeProvider>
  )
}
