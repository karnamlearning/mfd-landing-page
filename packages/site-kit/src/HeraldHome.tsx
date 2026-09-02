"use client"

import styled from "styled-components"
import { FiMenu, FiX } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa6"
import { brandService } from "./brand"
import { Calculator } from "./Calculator"
import { LeadForm } from "./LeadForm"
import { activeSections, isOn, onHashNav, type SkinHomeProps } from "./skin-shared"
import { visibleToolIds } from "@mfd/schema"
import { useEffect, useState } from "react"

const Page = styled.div`
  --rule: ${({ theme }) => theme.text}22;
  padding-bottom: 2rem;
`

const Mast = styled.header`
  border-bottom: 3px double ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.surface};
`

const MastInner = styled.div`
  width: min(1080px, calc(100% - 1.6rem));
  margin: 0 auto;
  padding: 0.85rem 0 0.7rem;
`

const Flag = styled.p`
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`

const Title = styled.a`
  display: block;
  margin: 0.15rem 0 0.1rem;
  color: inherit;
  text-decoration: none;
  font-family: var(--heading), Georgia, serif;
  font-size: clamp(1.8rem, 6cqi, 3.1rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
`

const Amfi = styled.p`
  margin: 0 0 0.65rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

const Rail = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 1rem;
  padding: 0.45rem 0 0;
  border-top: 1px solid ${({ theme }) => theme.text};
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`

const Tools = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
`

const InkBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: ${({ theme }) => theme.btnText};
  background: ${({ theme }) => theme.primary};
  text-decoration: none;
  padding: 0.28rem 0.55rem;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const MenuBtn = styled.button`
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: 0.2rem;
  @media (min-width: 720px) {
    display: none;
  }
`

const DeskNav = styled.div`
  display: none;
  @media (min-width: 720px) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem 1rem;
    flex: 1;
  }
`

const Sheet = styled.div`
  width: min(1080px, calc(100% - 1.6rem));
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
`

const Rule = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.text};
  margin: 0;
`

const Lead = styled.section`
  padding: 1.4rem 0 1.6rem;
  display: grid;
  gap: 1.1rem;
  @media (min-width: 800px) {
    grid-template-columns: 1.3fr 0.9fr;
    align-items: end;
  }
`

const Eyebrow = styled.p`
  margin: 0 0 0.4rem;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`

const H1 = styled.h1`
  margin: 0 0 0.7rem;
  font-size: clamp(2rem, 6cqi, 3.4rem);
  line-height: 1.05;
`

const Deck = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.45;
  max-width: 36rem;
`

const Fig = styled.figure`
  margin: 0;
  img {
    width: 100%;
    aspect-ratio: 5 / 4;
    object-fit: cover;
    filter: grayscale(0.15) contrast(1.05);
  }
  figcaption {
    margin-top: 0.35rem;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.muted};
  }
`

const Block = styled.section`
  padding: 1.35rem 0 1.5rem;
`

const Kicker = styled.p`
  margin: 0 0 0.3rem;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`

const H2 = styled.h2`
  margin: 0 0 0.75rem;
  font-size: clamp(1.45rem, 3.6cqi, 2.1rem);
`

const Cols = styled.div`
  columns: 1;
  gap: 2rem;
  @media (min-width: 760px) {
    columns: 2;
  }
  p {
    margin: 0 0 0.8rem;
    line-height: 1.65;
  }
`

const Classified = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: grid;
    grid-template-columns: 2.2rem 1fr;
    gap: 0.6rem;
    padding: 0.7rem 0;
    border-top: 1px solid var(--rule);
  }
  strong {
    display: block;
    margin-bottom: 0.2rem;
  }
`

const Tape = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.4rem;
  padding: 0.85rem 0;
  border-top: 1px solid ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.text};
`

const Notice = styled.div`
  border: 1px solid ${({ theme }) => theme.text};
  padding: 0.85rem 1rem;
  margin-top: 0.6rem;
`

const Colophon = styled.footer`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 3px double ${({ theme }) => theme.text};
  font-size: 0.78rem;
  color: ${({ theme }) => theme.muted};
  a {
    color: inherit;
  }
`

export function HeraldHome({ ctx, locale, onLocale, body }: SkinHomeProps) {
  const { config, t, b, wa } = ctx
  const d = config.details
  const [menu, setMenu] = useState(false)
  const bilingual = config.addons.includes("bilingual")
  const on = new Set(activeSections(config).map((s) => s.id))
  const photo = d.photoUrl || d.heroImageUrl
  const links = (
    [
      { href: "/#about", label: t.about, id: "about" },
      { href: "/#services", label: t.services, id: "services" },
      { href: "/#calculators", label: t.calculators, id: "calculators" },
      { href: "/#contact", label: t.contact, id: "contact" },
    ] as const
  ).filter((l) => on.has(l.id))

  useEffect(() => {
    setMenu(false)
  }, [ctx.previewPath])

  return (
    <Page>
      <Mast data-spot="header">
        <MastInner>
          <Flag>
            {d.city || "India"} · Vol. I · AMFI
          </Flag>
          <Title href="/" onClick={onHashNav}>
            {d.name || "The Desk"}
          </Title>
          <Amfi>{t.amfi}</Amfi>
          <Rail>
            <MenuBtn type="button" aria-label={t.menu} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
              {menu ? <FiX size={18} /> : <FiMenu size={18} />}
            </MenuBtn>
            <DeskNav>
              {links.map((l) => (
                <a key={l.id} href={l.href} onClick={onHashNav}>
                  {l.label}
                </a>
              ))}
            </DeskNav>
            <Tools>
              {bilingual ? (
                <>
                  <button type="button" onClick={() => onLocale("en")} style={{ border: 0, background: "transparent", color: "inherit", cursor: "pointer" }}>
                    EN
                  </button>
                  <button type="button" onClick={() => onLocale("hi")} style={{ border: 0, background: "transparent", color: "inherit", cursor: "pointer" }}>
                    हिं
                  </button>
                </>
              ) : null}
              <InkBtn href={wa} target="_blank" rel="noreferrer">
                <FaWhatsapp size={12} aria-hidden />
                {t.wa}
              </InkBtn>
            </Tools>
          </Rail>
          {menu ? (
            <DeskNav style={{ display: "flex", marginTop: "0.6rem" }}>
              {links.map((l) => (
                <a key={l.id} href={l.href} onClick={(e) => { setMenu(false); onHashNav(e) }}>
                  {l.label}
                </a>
              ))}
            </DeskNav>
          ) : null}
        </MastInner>
      </Mast>

      {body ?? (
        <Sheet>
          <Lead id="top" data-spot="top">
            <div>
              <Eyebrow>{d.city}</Eyebrow>
              <H1>{d.heroHeadline}</H1>
              <Deck>{d.pitch}</Deck>
            </div>
            {photo ? (
              <Fig data-spot="photo">
                <img src={photo} alt="" />
                <figcaption>{d.city} · {d.name}</figcaption>
              </Fig>
            ) : null}
          </Lead>
          <Rule />

          {isOn(config, "about") ? (
            <Block id="about" data-spot="about">
              <Kicker>{t.welcome}</Kicker>
              <H2>{b.aboutTitle}</H2>
              <Cols>
                <p>{locale === "hi" && d.bioHi ? d.bioHi : d.bio}</p>
                {d.languages.length || d.hours ? (
                  <p>
                    {d.languages.filter(Boolean).join(" · ")}
                    {d.languages.length && d.hours ? " · " : null}
                    {d.hours ? `${t.hoursLabel}: ${d.hours}` : null}
                  </p>
                ) : null}
              </Cols>
            </Block>
          ) : null}

          {isOn(config, "stats") && d.stats.length ? (
            <Tape id="stats" data-spot="stats">
              {d.stats.map((s) => (
                <span key={s.label}>
                  <strong>{s.value}</strong> {s.label}
                </span>
              ))}
            </Tape>
          ) : null}

          {isOn(config, "services") ? (
            <Block id="services" data-spot="services">
              <Kicker>{t.services}</Kicker>
              <H2>{b.servicesTitle}</H2>
              <Classified>
                {config.services.map((id, i) => {
                  const item = brandService(id, config.wording, locale)
                  if (!item) return null
                  return (
                    <li key={id}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>{item.title}</strong>
                        {item.body}
                      </div>
                    </li>
                  )
                })}
              </Classified>
            </Block>
          ) : null}

          {isOn(config, "credentials") && d.credentials.length ? (
            <Block id="credentials" data-spot="credentials">
              <Kicker>{t.registration}</Kicker>
              <H2>{b.recordTitle}</H2>
              {d.credentials.map((c) => (
                <Notice key={c.number}>
                  {c.label} — {c.name} ARN No {c.number}
                </Notice>
              ))}
            </Block>
          ) : null}

          {isOn(config, "how") ? (
            <Block id="how" data-spot="how">
              <Kicker>{t.howNav}</Kicker>
              <H2>{b.howTitle}</H2>
              <Classified>
                {b.how.map((step, i) => (
                  <li key={step.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{step.title}</strong>
                      {step.body}
                    </div>
                  </li>
                ))}
              </Classified>
            </Block>
          ) : null}

          {isOn(config, "calculators") ? (
            <Block id="calculators" data-spot="calculators">
              <Kicker>{t.planning}</Kicker>
              <H2>{b.calcTitle}</H2>
              <p style={{ marginTop: 0, maxWidth: "38rem" }}>{b.calcLead}</p>
              {visibleToolIds(config).includes("sip") ? <Calculator tool="sip" config={config} t={t} preview={ctx.preview} compact /> : null}
              <p style={{ marginTop: "1rem" }}>
                <a href="/calculators">{t.allTools}</a>
              </p>
            </Block>
          ) : null}

          {isOn(config, "testimonials") && config.testimonials.length ? (
            <Block id="testimonials" data-spot="testimonials">
              <Kicker>{t.quotesNav}</Kicker>
              <H2>{b.quotesTitle}</H2>
              {config.testimonials.map((q) => (
                <p key={q.name}>
                  “{q.quote}” — <strong>{q.name}</strong>, {q.city}
                </p>
              ))}
            </Block>
          ) : null}

          {isOn(config, "faq") && config.faq.length ? (
            <Block id="faq" data-spot="faq">
              <Kicker>{t.faqNav}</Kicker>
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

          {isOn(config, "contact") ? (
            <Block id="contact" data-spot="contact">
              <Kicker>{t.contact}</Kicker>
              <H2>{b.contactTitle}</H2>
              <p>
                {d.address}
                {d.city ? `${d.address ? ", " : ""}${d.city}` : null}
              </p>
              <LeadForm ctx={ctx} />
            </Block>
          ) : null}

          {isOn(config, "whatsapp_strip") ? (
            <a id="whatsapp" data-spot="whatsapp" href={wa} target="_blank" rel="noreferrer">
              <FaWhatsapp size={14} aria-hidden /> {t.wa} {d.name}
            </a>
          ) : null}
        </Sheet>
      )}
      <Sheet>
        <Colophon id="footer">
          <p>
            <a href="/">{t.home}</a> · <a href="/calculators">{t.calculators}</a> ·{" "}
            <a href="/disclosures">{t.disclosures}</a>
          </p>
          <p>{t.disclaimer(d.name)}</p>
        </Colophon>
      </Sheet>
    </Page>
  )
}
