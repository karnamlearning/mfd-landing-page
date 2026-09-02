"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { FiArrowRight, FiCheck, FiChevronDown, FiMenu, FiX } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa6"
import { templateOf, visibleToolIds } from "@mfd/schema"
import { brandService } from "./brand"
import { Calculator } from "./Calculator"
import { LeadForm } from "./LeadForm"
import { isOn, onHashNav, type SkinHomeProps } from "./skin-shared"

const Page = styled.div`
  min-height: 100%;
  background: ${({ theme }) => theme.bg};
`

const Shell = styled.div`
  width: min(1120px, calc(100% - 1.5rem));
  margin: 0 auto;
`

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid ${({ theme }) => theme.text}14;
  background: ${({ theme }) => theme.bg}f2;
  backdrop-filter: blur(12px);
`

const BarInner = styled(Shell)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 0;
  min-width: 0;
`

const Brand = styled.a`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
  color: inherit;
  text-decoration: none;
  font-family: var(--heading), Georgia, serif;
  font-size: 1.05rem;
  letter-spacing: -0.03em;
`

const Amfi = styled.span`
  font-family: var(--body), system-ui, sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 0.15rem 1rem;
  font-size: 0.82rem;
  font-weight: 500;
  a,
  button.nav {
    color: inherit;
    text-decoration: none;
    opacity: 0.82;
    background: none;
    border: 0;
    cursor: pointer;
    font: inherit;
    padding: 0;
  }
  @container site (min-width: 800px) {
    display: flex;
  }
`

const Drop = styled.div`
  position: relative;
`

const DropBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  color: inherit;
  opacity: 0.82;
  background: none;
  border: 0;
  cursor: pointer;
  font: inherit;
  padding: 0;
`

const DropMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.65rem);
  left: 0;
  z-index: 30;
  min-width: 16.5rem;
  padding: 0.45rem 0;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}14;
  box-shadow: 0 12px 32px ${({ theme }) => theme.text}14;
  a {
    display: block;
    padding: 0.45rem 0.85rem;
    opacity: 1;
    font-size: 0.84rem;
  }
  a:hover {
    background: ${({ theme }) => theme.bg};
  }
`

const Sub = styled.div`
  padding: 0.15rem 0 0.45rem 0.85rem;
  a {
    display: block;
    padding: 0.35rem 0;
    font-size: 0.84rem;
    opacity: 0.86;
  }
`

const Consult = styled.a`
  display: none;
  flex-shrink: 0;
  padding: 0.45rem 0.85rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  @container site (min-width: 800px) {
    display: inline-flex;
    align-items: center;
  }
`

const MenuBtn = styled.button`
  display: grid;
  place-items: center;
  width: 2.2rem;
  height: 2.2rem;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  @container site (min-width: 800px) {
    display: none;
  }
`

const Hero = styled.section`
  display: grid;
  gap: 1.5rem;
  padding: 2.4rem 0 2rem;
  @container site (min-width: 860px) {
    grid-template-columns: 1.15fr 0.9fr;
    align-items: center;
    min-height: 72vh;
    padding: 3.2rem 0 2.4rem;
  }
`

const Kicker = styled.p`
  margin: 0 0 0.55rem;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`

const H1 = styled.h1`
  margin: 0 0 0.85rem;
  font-size: clamp(2.1rem, 6.4cqi, 4rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
`

const Lead = styled.p`
  margin: 0 0 1.1rem;
  max-width: 36rem;
  color: ${({ theme }) => theme.muted};
  font-size: 1.05rem;
  line-height: 1.55;
`

const Marks = styled.ul`
  list-style: none;
  margin: 0 0 1.2rem;
  padding: 0;
  display: grid;
  gap: 0.4rem;
  font-size: 0.84rem;
  li {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    color: ${({ theme }) => theme.text};
  }
  svg {
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
  }
`

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  margin-bottom: 1.1rem;
`

const Card = styled.div`
  padding: 1.25rem 1.2rem 1.35rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}14;
`

const CardTitle = styled.p`
  margin: 0 0 0.85rem;
  font-family: var(--heading), Georgia, serif;
  font-size: 1.15rem;
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 0.4rem 0 1.6rem;
  @container site (min-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Stat = styled.div`
  padding: 1rem 0.8rem;
  border-top: 1px solid ${({ theme }) => theme.primary}66;
  strong {
    display: block;
    font-family: var(--heading), Georgia, serif;
    font-size: 1.55rem;
    letter-spacing: -0.03em;
  }
  span {
    color: ${({ theme }) => theme.muted};
    font-size: 0.78rem;
  }
`

const Block = styled.section`
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.text}12;
`

const H2 = styled.h2`
  margin: 0 0 0.9rem;
  font-size: clamp(1.55rem, 3.8cqi, 2.3rem);
`

const Pillars = styled.div`
  display: grid;
  gap: 0.75rem;
  @container site (min-width: 760px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Pillar = styled.article`
  padding: 1.15rem 1.05rem 1.25rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}12;
  h3 {
    margin: 0 0 0.45rem;
    font-size: 1.02rem;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.muted};
    font-size: 0.92rem;
    line-height: 1.55;
  }
`

const Mandates = styled.div`
  display: grid;
  gap: 0.65rem;
  @container site (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Mandate = styled.a`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  align-items: flex-start;
  padding: 1.1rem 1.05rem;
  scroll-margin-top: 5rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}12;
  color: inherit;
  text-decoration: none;
  strong {
    display: block;
    margin-bottom: 0.3rem;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.muted};
    font-size: 0.9rem;
    line-height: 1.5;
  }
  svg {
    flex-shrink: 0;
    margin-top: 0.2rem;
    color: ${({ theme }) => theme.primary};
  }
`

const Steps = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
  @container site (min-width: 760px) {
    grid-template-columns: repeat(4, 1fr);
  }
  li {
    padding: 0.2rem 0 0;
  }
  em {
    display: block;
    font-style: normal;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 0.35rem;
  }
`

const Quote = styled.blockquote`
  margin: 0 0 1.15rem;
  padding: 0;
  color: ${({ theme }) => theme.muted};
  font-size: 1.02rem;
  line-height: 1.6;
  strong {
    display: block;
    margin-top: 0.45rem;
    color: ${({ theme }) => theme.text};
    font-size: 0.88rem;
  }
`

const Wa = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.4rem 0 1.5rem;
  padding: 0.7rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  text-decoration: none;
  font-weight: 650;
`

const Foot = styled.footer`
  padding: 1.6rem 0 2.2rem;
  border-top: 1px solid ${({ theme }) => theme.text}16;
  color: ${({ theme }) => theme.muted};
  font-size: 0.78rem;
  a {
    color: inherit;
  }
`

const Sheet = styled.div`
  padding: 0.75rem 0 1rem;
  a {
    display: block;
    padding: 0.45rem 0;
    color: inherit;
  }
`

const NAV = {
  en: {
    services: "Our Services",
    calc: "Wealth Calculator",
    about: "About Us",
    insights: "Insights",
    blog: "Blog",
  },
  hi: {
    services: "हमारी सेवाएँ",
    calc: "वेल्थ कैलकुलेटर",
    about: "हमारे बारे में",
    insights: "इनसाइट्स",
    blog: "ब्लॉग",
  },
} as const

export function CapitalHome({ ctx, locale, onLocale, body }: SkinHomeProps) {
  const { config, t, b, wa } = ctx
  const d = config.details
  const n = NAV[locale] ?? NAV.en
  const [menu, setMenu] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const bilingual = config.addons.includes("bilingual")
  const photo = d.photoUrl || d.heroImageUrl
  const solo = templateOf(config) === "solo"
  const serviceItems = config.services
    .map((id) => {
      const item = brandService(id, config.wording, locale)
      return item ? { id, title: item.title } : null
    })
    .filter((row): row is { id: (typeof config.services)[number]; title: string } => Boolean(row))

  useEffect(() => {
    setMenu(false)
    setServicesOpen(false)
  }, [ctx.previewPath])

  return (
    <Page>
      <Bar data-spot="header">
        <BarInner>
          <Brand href="/" onClick={onHashNav}>
            {d.name || "Practice"}
            <Amfi>{t.amfi}</Amfi>
          </Brand>
          <Nav>
            <a href="/" onClick={onHashNav}>
              {t.home}
            </a>
            <Drop
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <DropBtn
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((v) => !v)}
              >
                {n.services}
                <FiChevronDown size={14} aria-hidden />
              </DropBtn>
              {servicesOpen ? (
                <DropMenu>
                  {serviceItems.map((s) => (
                    <a key={s.id} href={`/#${s.id}`} onClick={onHashNav}>
                      {s.title}
                    </a>
                  ))}
                </DropMenu>
              ) : null}
            </Drop>
            <a href="/calculators" onClick={onHashNav}>
              {n.calc}
            </a>
            <a href="/#about" onClick={onHashNav}>
              {n.about}
            </a>
            <a href="/#insights" onClick={onHashNav}>
              {n.insights}
            </a>
            <a href="/#blog" onClick={onHashNav}>
              {n.blog}
            </a>
          </Nav>
          {bilingual ? (
            <button
              type="button"
              onClick={() => onLocale(locale === "en" ? "hi" : "en")}
              style={{ border: 0, background: "transparent", color: "inherit", cursor: "pointer" }}
            >
              {locale === "en" ? "हिं" : "EN"}
            </button>
          ) : null}
          <Consult href="/#contact" onClick={onHashNav}>
            {b.cta}
          </Consult>
          <MenuBtn type="button" aria-label={t.menu} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
            {menu ? <FiX size={18} /> : <FiMenu size={18} />}
          </MenuBtn>
        </BarInner>
      </Bar>
      {menu ? (
        <Shell>
          <Sheet>
            <a
              href="/"
              onClick={(e) => {
                setMenu(false)
                onHashNav(e)
              }}
            >
              {t.home}
            </a>
            <p style={{ margin: "0.7rem 0 0.15rem", opacity: 0.55, fontSize: "0.72rem", letterSpacing: "0.08em" }}>
              {n.services}
            </p>
            <Sub>
              {serviceItems.map((s) => (
                <a
                  key={s.id}
                  href={`/#${s.id}`}
                  onClick={(e) => {
                    setMenu(false)
                    onHashNav(e)
                  }}
                >
                  {s.title}
                </a>
              ))}
            </Sub>
            <a
              href="/calculators"
              onClick={(e) => {
                setMenu(false)
                onHashNav(e)
              }}
            >
              {n.calc}
            </a>
            <a
              href="/#about"
              onClick={(e) => {
                setMenu(false)
                onHashNav(e)
              }}
            >
              {n.about}
            </a>
            <a
              href="/#insights"
              onClick={(e) => {
                setMenu(false)
                onHashNav(e)
              }}
            >
              {n.insights}
            </a>
            <a
              href="/#blog"
              onClick={(e) => {
                setMenu(false)
                onHashNav(e)
              }}
            >
              {n.blog}
            </a>
          </Sheet>
        </Shell>
      ) : null}

      {body ? (
        <Shell>{body}</Shell>
      ) : (
        <Shell>
          <Hero id="top" data-spot="top">
            <div>
              {solo && photo ? <Photo src={photo} alt="" data-spot="photo" /> : null}
              <Kicker>{d.city}</Kicker>
              <H1>{d.heroHeadline}</H1>
              <Lead>{d.pitch}</Lead>
              <Marks>
                <li>
                  <FiCheck size={14} aria-hidden /> {t.amfi}
                </li>
                {d.hours ? (
                  <li>
                    <FiCheck size={14} aria-hidden /> {d.hours}
                  </li>
                ) : null}
              </Marks>
            </div>
            <Card>
              <CardTitle>{t.contactTitle}</CardTitle>
              <LeadForm ctx={ctx} />
            </Card>
          </Hero>

          {isOn(config, "stats") && d.stats.length ? (
            <Stats id="stats" data-spot="stats">
              {d.stats.map((s) => (
                <Stat key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </Stat>
              ))}
            </Stats>
          ) : null}

          {isOn(config, "services") ? (
            <Block id="services" data-spot="services">
              <Kicker>{n.services}</Kicker>
              <H2>{b.servicesTitle}</H2>
              <Lead as="p" style={{ marginBottom: "1.1rem" }}>
                {b.servicesLead}
              </Lead>
              <Mandates>
                {config.services.map((id) => {
                  const item = brandService(id, config.wording, locale)
                  if (!item) return null
                  return (
                    <Mandate key={id} id={id} href="/#contact" onClick={onHashNav}>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.body}</p>
                      </div>
                      <FiArrowRight size={16} aria-hidden />
                    </Mandate>
                  )
                })}
              </Mandates>
            </Block>
          ) : null}

          {isOn(config, "calculators") ? (
            <Block id="calculators" data-spot="calculators">
              <Kicker>{n.calc}</Kicker>
              <H2>{b.calcTitle}</H2>
              <p>{b.calcLead}</p>
              {visibleToolIds(config).includes("sip") ? (
                <Calculator tool="sip" config={config} t={t} preview={ctx.preview} compact />
              ) : null}
              <p>
                <a href="/calculators">{t.seeCalcs}</a>
              </p>
            </Block>
          ) : null}

          {isOn(config, "about") ? (
            <Block id="about" data-spot="about">
              <Kicker>{n.about}</Kicker>
              <H2>{b.aboutTitle}</H2>
              <p style={{ margin: "0 0 1.2rem", maxWidth: "40rem", color: "inherit", opacity: 0.86, lineHeight: 1.65 }}>
                {locale === "hi" && d.bioHi ? d.bioHi : d.bio}
              </p>
              <Pillars>
                {b.why.map((item) => (
                  <Pillar key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </Pillar>
                ))}
              </Pillars>
            </Block>
          ) : null}

          {isOn(config, "testimonials") && config.testimonials.length ? (
            <Block id="insights" data-spot="testimonials">
              <Kicker>{n.insights}</Kicker>
              <H2>{b.quotesTitle}</H2>
              {config.testimonials.map((q) => (
                <Quote key={q.name}>
                  “{q.quote}”
                  <strong>
                    {q.name}, {q.city}
                  </strong>
                </Quote>
              ))}
            </Block>
          ) : null}

          {isOn(config, "faq") && config.faq.length ? (
            <Block id="blog" data-spot="faq">
              <Kicker>{n.blog}</Kicker>
              <H2>{b.faqTitle}</H2>
              {config.faq.map((row) => (
                <p key={row.q}>
                  <strong>{locale === "hi" && row.qHi ? row.qHi : row.q}</strong>
                  <br />
                  {locale === "hi" && row.aHi ? row.aHi : row.a}
                </p>
              ))}
            </Block>
          ) : null}

          {isOn(config, "credentials") && d.credentials.length ? (
            <Block id="credentials" data-spot="credentials">
              <Kicker>{t.registration}</Kicker>
              <H2>{b.recordTitle}</H2>
              {d.credentials.map((c) => (
                <p key={c.number}>
                  {c.label} · {c.name} · ARN {c.number}
                </p>
              ))}
            </Block>
          ) : null}

          {isOn(config, "how") ? (
            <Block id="how" data-spot="how">
              <Kicker>{t.howNav}</Kicker>
              <H2>{b.howTitle}</H2>
              <Steps>
                {b.how.map((step, i) => (
                  <li key={step.title}>
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <strong>{step.title}</strong>
                    <p style={{ margin: "0.35rem 0 0", color: "inherit", opacity: 0.8 }}>{step.body}</p>
                  </li>
                ))}
              </Steps>
            </Block>
          ) : null}

          {isOn(config, "contact") ? (
            <Block id="contact" data-spot="contact">
              <Kicker>{t.contact}</Kicker>
              <H2>{b.contactTitle}</H2>
              <p>
                {d.address}
                {d.city ? `${d.address ? ", " : ""}${d.city}` : null}
              </p>
              {d.phone ? <p>{t.call}: {d.phone}</p> : null}
              {d.email ? <p>{d.email}</p> : null}
            </Block>
          ) : null}

          {isOn(config, "whatsapp_strip") ? (
            <Wa id="whatsapp" data-spot="whatsapp" href={wa} target="_blank" rel="noreferrer">
              <FaWhatsapp size={14} aria-hidden /> {t.wa} {d.name}
            </Wa>
          ) : null}
        </Shell>
      )}

      <Shell>
        <Foot id="footer">
          <p>
            <a href="/" onClick={onHashNav}>
              {t.home}
            </a>
            {" · "}
            <a href="/calculators" onClick={onHashNav}>
              {n.calc}
            </a>
            {" · "}
            <a href="/disclosures" onClick={onHashNav}>
              {t.disclosures}
            </a>
          </p>
          <p>{t.disclaimer(d.name)}</p>
        </Foot>
      </Shell>
    </Page>
  )
}
