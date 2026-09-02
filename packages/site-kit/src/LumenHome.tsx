"use client"

import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { FiMenu, FiX } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa6"
import { templateOf, visibleToolIds } from "@mfd/schema"
import { brandService } from "./brand"
import { Calculator } from "./Calculator"
import { LeadForm } from "./LeadForm"
import { activeSections, isOn, onHashNav, type SkinHomeProps } from "./skin-shared"
import { isHomePath, showSection } from "./site-pages"

const drift = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(8%, -6%, 0) scale(1.08); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`

const Page = styled.div`
  position: relative;
  isolation: isolate;
  overflow: clip;
  min-height: 100%;
`

const Orb = styled.div<{ $x: string; $y: string; $c: string }>`
  position: absolute;
  width: 42vmax;
  height: 42vmax;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y};
  border-radius: 50%;
  background: radial-gradient(circle, ${({ $c }) => $c} 0%, transparent 68%);
  filter: blur(8px);
  animation: ${drift} 16s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
`

const Bar = styled.header`
  position: sticky;
  top: 0.7rem;
  z-index: 20;
  width: min(1100px, calc(100% - 1.4rem));
  margin: 0.7rem auto 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.65rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.surface}cc;
  border: 1px solid ${({ theme }) => theme.text}18;
  backdrop-filter: blur(16px);
  min-width: 0;

  @container site (min-width: 760px) {
    gap: 0.7rem;
    padding: 0.55rem 0.75rem;
  }
`

const Brand = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: 650;
  letter-spacing: -0.03em;
  min-width: 0;
  flex: 1;
  overflow: hidden;
`

const Tag = styled.span`
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Nav = styled.nav`
  display: none;
  gap: 0.85rem;
  margin-left: auto;
  font-size: 0.8rem;
  flex-shrink: 0;
  a {
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
  }
  @container site (min-width: 760px) {
    display: flex;
  }
`

const Pill = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  margin-left: auto;
  @container site (min-width: 760px) {
    margin-left: 0;
  }
  padding: 0.4rem 0.55rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 650;

  @container site (min-width: 480px) {
    padding: 0.4rem 0.75rem;
  }
`

const PillLabel = styled.span`
  display: none;
  @container site (min-width: 480px) {
    display: inline;
  }
`

const MenuBtn = styled.button`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.2rem;
  height: 2.2rem;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  @container site (min-width: 760px) {
    display: none;
  }
`

const Stage = styled.div`
  position: relative;
  z-index: 1;
  width: min(1100px, calc(100% - 1.4rem));
  margin: 0 auto;
`

const Hero = styled.section<{ $solo?: boolean }>`
  display: grid;
  gap: 1.5rem;
  padding: 2.4rem 0 2rem;
  @container site (min-width: 860px) {
    grid-template-columns: ${({ $solo }) => ($solo ? "0.85fr 1.15fr" : "1.15fr 0.85fr")};
    align-items: center;
    min-height: 72vh;
  }
`

const GlowName = styled.p`
  margin: 0 0 0.45rem;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
`

const H1 = styled.h1`
  margin: 0 0 0.8rem;
  font-size: clamp(2.2rem, 7cqi, 4.2rem);
  letter-spacing: -0.05em;
  line-height: 0.98;
`

const Lead = styled.p`
  margin: 0 0 1.2rem;
  max-width: 34rem;
  color: ${({ theme }) => theme.muted};
  font-size: 1.05rem;
  line-height: 1.5;
`

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 28px;
  border: 1px solid ${({ theme }) => theme.text}16;
  box-shadow: 0 30px 80px ${({ theme }) => theme.primary}22;
  transform: rotate(2deg);
`

const Glass = styled.section`
  margin: 0 0 1rem;
  padding: 1.25rem 1.2rem 1.35rem;
  border-radius: 24px;
  background: ${({ theme }) => theme.surface}b8;
  border: 1px solid ${({ theme }) => theme.text}14;
  backdrop-filter: blur(18px);
`

const Bento = styled.div`
  display: grid;
  gap: 0.75rem;
  @container site (min-width: 720px) {
    grid-template-columns: 1.2fr 1fr;
  }
`

const Tile = styled.article<{ $big?: boolean }>`
  padding: 1.1rem 1.05rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.bg}80;
  border: 1px solid ${({ theme }) => theme.text}12;
  ${({ $big }) => $big && "grid-row: span 2;"}
`

const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
`

const Stat = styled.div`
  padding: 1rem 0.7rem;
  border-radius: 18px;
  text-align: center;
  background: ${({ theme }) => theme.primary}14;
  border: 1px solid ${({ theme }) => theme.primary}33;
  strong {
    display: block;
    font-size: 1.4rem;
    letter-spacing: -0.04em;
  }
`

const Foot = styled.footer`
  position: relative;
  z-index: 1;
  width: min(1100px, calc(100% - 1.4rem));
  margin: 1.5rem auto 2rem;
  color: ${({ theme }) => theme.muted};
  font-size: 0.78rem;
  a {
    color: inherit;
  }
`

export function LumenHome({ ctx, locale, onLocale, body }: SkinHomeProps) {
  const { config, t, b, wa } = ctx
  const d = config.details
  const [menu, setMenu] = useState(false)
  const bilingual = config.addons.includes("bilingual")
  const on = new Set(activeSections(config).map((s) => s.id))
  const photo = d.photoUrl || d.heroImageUrl
  const solo = templateOf(config) === "solo"
  const path = ctx.previewPath
  const home = isHomePath(path)
  const links = (
    [
      { href: "/about", label: t.about, id: "about" },
      { href: "/services", label: t.services, id: "services" },
      { href: "/calculators", label: t.calculators, id: "calculators" },
      { href: "/contact", label: t.contact, id: "contact" },
    ] as const
  ).filter((l) => on.has(l.id))

  useEffect(() => {
    setMenu(false)
  }, [ctx.previewPath])

  return (
    <Page>
      <Orb $x="-10%" $y="-20%" $c={`${ctx.config.theme === "ember" ? "#e08a4b" : "#8aa4ff"}33`} />
      <Orb $x="60%" $y="30%" $c={`${ctx.config.theme === "aurora" ? "#3dcfb6" : "#c4b5fd"}28`} />

      <Bar data-spot="header">
        <Brand href="/" onClick={onHashNav}>
          {d.name || "Practice"}
          <Tag>{t.amfi}</Tag>
        </Brand>
        <Nav>
          {links.map((l) => (
            <a key={l.id} href={l.href} onClick={onHashNav} aria-current={path === l.href ? "page" : undefined}>
              {l.label}
            </a>
          ))}
        </Nav>
        {bilingual ? (
          <button type="button" onClick={() => onLocale(locale === "en" ? "hi" : "en")} style={{ border: 0, background: "transparent", color: "inherit", cursor: "pointer" }}>
            {locale === "en" ? "हिं" : "EN"}
          </button>
        ) : null}
        <Pill href={wa} target="_blank" rel="noreferrer">
          <FaWhatsapp size={14} aria-hidden />
          <PillLabel>{b.cta}</PillLabel>
        </Pill>
        <MenuBtn type="button" aria-label={t.menu} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
          {menu ? <FiX size={18} /> : <FiMenu size={18} />}
        </MenuBtn>
      </Bar>
      {menu ? (
        <Stage>
          <Glass>
            {links.map((l) => (
              <p key={l.id}>
                <a href={l.href} onClick={(e) => { setMenu(false); onHashNav(e) }}>
                  {l.label}
                </a>
              </p>
            ))}
          </Glass>
        </Stage>
      ) : null}

      {body ? (
        <Stage>{body}</Stage>
      ) : (
        <Stage>
          {home ? (
          <Hero id="top" data-spot="top" $solo={solo}>
            {solo && photo ? <Photo src={photo} alt="" data-spot="photo" /> : null}
            <div>
              <GlowName>{d.city}</GlowName>
              <H1>{d.heroHeadline}</H1>
              <Lead>{d.pitch}</Lead>
            </div>
            {!solo && photo ? <Photo src={photo} alt="" data-spot="photo" /> : null}
          </Hero>
          ) : null}

          {home && isOn(config, "stats") && d.stats.length ? (
            <Glass id="stats" data-spot="stats">
              <StatRow>
                {d.stats.map((s) => (
                  <Stat key={s.label}>
                    <strong>{s.value}</strong>
                    {s.label}
                  </Stat>
                ))}
              </StatRow>
            </Glass>
          ) : null}

          {showSection(path, "/about") && isOn(config, "about") ? (
            <Glass id="about" data-spot="about">
              <GlowName>{t.welcome}</GlowName>
              <h2 style={{ margin: "0 0 0.6rem" }}>{b.aboutTitle}</h2>
              <p style={{ margin: 0, color: "inherit", opacity: 0.84, lineHeight: 1.65 }}>
                {locale === "hi" && d.bioHi ? d.bioHi : d.bio}
              </p>
            </Glass>
          ) : null}

          {showSection(path, "/services") && isOn(config, "services") ? (
            <Glass id="services" data-spot="services">
              <GlowName>{t.services}</GlowName>
              <h2 style={{ margin: "0 0 0.85rem" }}>{b.servicesTitle}</h2>
              <Bento>
                {config.services.map((id, i) => {
                  const item = brandService(id, config.wording, locale)
                  if (!item) return null
                  return (
                    <Tile key={id} $big={i === 0}>
                      <strong>{item.title}</strong>
                      <p style={{ margin: "0.4rem 0 0", opacity: 0.8 }}>{item.body}</p>
                    </Tile>
                  )
                })}
              </Bento>
            </Glass>
          ) : null}

          {home && isOn(config, "credentials") && d.credentials.length ? (
            <Glass id="credentials" data-spot="credentials">
              <GlowName>{t.registration}</GlowName>
              <h2 style={{ margin: "0 0 0.6rem" }}>{b.recordTitle}</h2>
              {d.credentials.map((c) => (
                <p key={c.number}>
                  {c.label} · {c.name} · ARN {c.number}
                </p>
              ))}
            </Glass>
          ) : null}

          {showSection(path, "/how") && isOn(config, "how") ? (
            <Glass id="how" data-spot="how">
              <GlowName>{t.howNav}</GlowName>
              <h2 style={{ margin: "0 0 0.6rem" }}>{b.howTitle}</h2>
              {b.how.map((step, i) => (
                <p key={step.title}>
                  <strong>{i + 1}. {step.title}</strong> — {step.body}
                </p>
              ))}
            </Glass>
          ) : null}

          {home && isOn(config, "calculators") ? (
            <Glass id="calculators" data-spot="calculators">
              <GlowName>{t.planning}</GlowName>
              <h2 style={{ margin: "0 0 0.5rem" }}>{b.calcTitle}</h2>
              <p>{b.calcLead}</p>
              {visibleToolIds(config).includes("sip") ? (
                <Calculator tool="sip" config={config} t={t} preview={ctx.preview} compact />
              ) : null}
              <p>
                <a href="/calculators">{t.allTools}</a>
              </p>
            </Glass>
          ) : null}

          {showSection(path, "/insights") && isOn(config, "testimonials") && config.testimonials.length ? (
            <Glass id="testimonials" data-spot="testimonials">
              <GlowName>{t.quotesNav}</GlowName>
              <h2 style={{ margin: "0 0 0.6rem" }}>{b.quotesTitle}</h2>
              {config.testimonials.map((q) => (
                <p key={q.name}>
                  “{q.quote}” — {q.name}, {q.city}
                </p>
              ))}
            </Glass>
          ) : null}

          {showSection(path, "/blog") && isOn(config, "faq") && config.faq.length ? (
            <Glass id="faq" data-spot="faq">
              <GlowName>{t.faqNav}</GlowName>
              <h2 style={{ margin: "0 0 0.6rem" }}>{b.faqTitle}</h2>
              {config.faq.map((row) => (
                <p key={row.q}>
                  <strong>{locale === "hi" && row.qHi ? row.qHi : row.q}</strong>
                  <br />
                  {locale === "hi" && row.aHi ? row.aHi : row.a}
                </p>
              ))}
            </Glass>
          ) : null}

          {showSection(path, "/contact") && isOn(config, "contact") ? (
            <Glass id="contact" data-spot="contact">
              <GlowName>{t.contact}</GlowName>
              <h2 style={{ margin: "0 0 0.6rem" }}>{b.contactTitle}</h2>
              <LeadForm ctx={ctx} />
            </Glass>
          ) : null}

          {home && isOn(config, "whatsapp_strip") ? (
            <Pill id="whatsapp" data-spot="whatsapp" href={wa} target="_blank" rel="noreferrer" style={{ margin: "0.4rem 0 1.2rem" }}>
              <FaWhatsapp size={14} aria-hidden /> {t.wa} {d.name}
            </Pill>
          ) : null}
        </Stage>
      )}

      <Foot id="footer">
        <p>
          <a href="/">{t.home}</a> · <a href="/calculators">{t.calculators}</a> ·{" "}
          <a href="/disclosures">{t.disclosures}</a>
        </p>
        <p>{t.disclaimer(d.name)}</p>
      </Foot>
    </Page>
  )
}
