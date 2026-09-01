"use client"

import { Fragment, useMemo, useState, type FormEvent, type ReactNode } from "react"
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
import { GlobalStyle } from "./GlobalStyle"
import * as S from "./styles"
import { firstName, inr, sipFuture, waHref } from "./utils"

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
  const { config, t, locale } = ctx
  const [monthly, setMonthly] = useState(10000)
  const [years, setYears] = useState(15)
  const [ret, setRet] = useState(12)
  const projected = useMemo(() => sipFuture(monthly, years, ret), [monthly, years, ret])
  const extras = visibleToolIds(config).filter((id) => !(baseToolIds as readonly string[]).includes(id))
  const hi = locale === "hi"

  return (
    <S.Section id="calculators">
      <S.Wrap>
        <S.Kicker>{t.planning}</S.Kicker>
        <S.H2>{t.calcTitle}</S.H2>
        <S.CalcGrid>
          <div>
            <S.Field>
              {t.monthly}
              <S.Input
                type="number"
                min={500}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
              />
            </S.Field>
            <S.Field>
              {t.years}
              <S.Input
                type="number"
                min={1}
                max={40}
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 1)}
              />
            </S.Field>
            <S.Field>
              {t.expected}
              <S.Input
                type="number"
                min={1}
                max={20}
                value={ret}
                onChange={(e) => setRet(Number(e.target.value) || 1)}
              />
            </S.Field>
          </div>
          <S.Result>
            <S.ResultK>{t.illustrative}</S.ResultK>
            <S.ResultN>{inr(projected)}</S.ResultN>
            <S.ServiceCopy>{t.calcNote}</S.ServiceCopy>
            <p style={{ marginTop: "1rem" }}>
              <a href="/calculators">{t.allTools}</a>
            </p>
          </S.Result>
        </S.CalcGrid>
        {extras.length ? (
          <S.ServiceGrid style={{ marginTop: "2rem" }}>
            {extras.map((id) => {
              const item = toolCopy[id]
              if (!item) return null
              return (
                <S.ServiceCard key={id}>
                  <S.ServiceTitle>{hi ? item.titleHi : item.title}</S.ServiceTitle>
                  <S.ServiceCopy>{hi ? item.blurbHi : item.blurb}</S.ServiceCopy>
                </S.ServiceCard>
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
  const { config, t } = ctx
  const d = config.details
  function onSubmit(e: FormEvent) {
    e.preventDefault()
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
          <S.Form onSubmit={onSubmit}>
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
            <S.Submit type="submit">{t.send}</S.Submit>
          </S.Form>
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
