"use client"

import { useMemo, useState, type FormEvent } from "react"
import styled, { ThemeProvider } from "styled-components"
import {
  FiPieChart,
  FiRepeat,
  FiShield,
  FiTarget,
} from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa6"
import { samplePracticeConfig } from "@mfd/schema"
import { fontPairs, getTheme, type FontId, type ThemeId } from "@mfd/tokens"
import { GlobalStyle } from "./GlobalStyle"
import { LookDock } from "./LookDock"

const Root = styled.div<{ $heading: string; $body: string }>`
  --heading: ${({ $heading }) => $heading};
  --body: ${({ $body }) => $body};
  font-family: var(--body), system-ui, sans-serif;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
  min-height: 100vh;

  h1,
  h2,
  h3 {
    font-family: var(--heading), Georgia, serif;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
`

const Wrap = styled.div`
  width: min(1120px, calc(100% - 2.5rem));
  margin-inline: auto;
`

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${({ theme }) => theme.bg}f2;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.text}10;
`

const HeaderInner = styled(Wrap)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0;
`

const Brand = styled.a`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const BrandName = styled.span`
  font-family: var(--heading), Georgia, serif;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.03em;
`

const Tagline = styled.span`
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

const Nav = styled.nav`
  display: none;
  gap: 1.4rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.muted};

  @media (min-width: 860px) {
    display: flex;
  }

  a:hover {
    color: ${({ theme }) => theme.text};
  }
`

const WaBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  font-size: 0.85rem;
`

const Hero = styled.section`
  position: relative;
  min-height: min(88vh, 760px);
  display: grid;
  align-items: end;
  color: #fafaf9;
`

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(12, 12, 12, 0.88) 0%, rgba(12, 12, 12, 0.35) 48%, rgba(12, 12, 12, 0.12) 100%);
`

const HeroCopy = styled(Wrap)`
  position: relative;
  padding: 5.5rem 0 4rem;
  max-width: 40rem;
  margin-left: max(1.25rem, calc((100% - 1120px) / 2));
  margin-right: auto;
  width: min(40rem, calc(100% - 2.5rem));
`

const Eyebrow = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.8;
`

const HeroTitle = styled.h1`
  margin: 0 0 1rem;
  font-size: clamp(2.1rem, 4.6vw, 3.35rem);
  line-height: 1.12;
`

const HeroLead = styled.p`
  margin: 0 0 1.6rem;
  font-size: 1.05rem;
  line-height: 1.55;
  max-width: 34rem;
  opacity: 0.92;
`

const Section = styled.section`
  padding: ${({ theme }) => theme.space[6]} 0;
`

const Kicker = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

const H2 = styled.h2`
  margin: 0 0 1.5rem;
  font-size: clamp(1.7rem, 3vw, 2.25rem);
  line-height: 1.2;
`

const AboutGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};

  @media (min-width: 800px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`

const Bio = styled.p`
  margin: 0;
  font-size: 1.12rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.muted};
`

const Portrait = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 4px;
`

const CredGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`

const CredCard = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}12;
  border-radius: 4px;
`

const CredMark = styled.div`
  width: 44px;
  height: 44px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
`

const CredMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const CredLabel = styled.span`
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

const ServiceGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ServiceCard = styled.article`
  padding: 1.5rem 1.35rem 1.6rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.text}10;
`

const IconWrap = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary}33;
  border-radius: 4px;
`

const ServiceTitle = styled.h3`
  margin: 0 0 0.45rem;
  font-size: 1.15rem;
`

const ServiceCopy = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.muted};
`

const StatRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  text-align: center;

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StatValue = styled.p`
  margin: 0;
  font-family: var(--heading), Georgia, serif;
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  line-height: 1;
`

const StatLabel = styled.p`
  margin: 0.6rem 0 0;
  color: ${({ theme }) => theme.muted};
  font-size: 0.9rem;
`

const CalcGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}10;
  border-radius: 4px;
  padding: ${({ theme }) => theme.space[4]};

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.muted};
  margin-bottom: 1rem;
`

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.text}28;
  background: transparent;
  padding: 0.45rem 0;
  color: ${({ theme }) => theme.text};
  outline: none;
`

const Area = styled.textarea`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.text}28;
  background: transparent;
  padding: 0.45rem 0;
  color: ${({ theme }) => theme.text};
  outline: none;
  min-height: 4.5rem;
  resize: vertical;
`

const Result = styled.div`
  padding: ${({ theme }) => theme.space[3]};
  border-left: 2px solid ${({ theme }) => theme.accent};
`

const ResultK = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

const ResultN = styled.p`
  margin: 0;
  font-family: var(--heading), Georgia, serif;
  font-size: 2.4rem;
`

const ContactGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};

  @media (min-width: 800px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`

const Form = styled.form`
  display: grid;
  gap: 0.2rem;
`

const Submit = styled.button`
  margin-top: 0.5rem;
  justify-self: start;
  border: 0;
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
`

const Foot = styled.footer`
  padding: ${({ theme }) => theme.space[5]} 0 ${({ theme }) => theme.space[8]};
  border-top: 1px solid ${({ theme }) => theme.text}12;
  color: ${({ theme }) => theme.muted};
  font-size: 0.88rem;
`

const FootTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: ${({ theme }) => theme.space[4]};
`

const Disclaimer = styled.p`
  margin: 0;
  max-width: 46rem;
  line-height: 1.55;
  font-size: 0.8rem;
`

const Strip = styled.a`
  position: sticky;
  bottom: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  font-size: 0.92rem;

  @media (min-width: 860px) {
    display: none;
  }
`

const SERVICES = [
  {
    id: "mutual_funds",
    title: "Mutual funds",
    copy: "Equity, debt, and hybrid schemes mapped to how long you can stay invested — not to a slogan.",
    Icon: FiPieChart,
  },
  {
    id: "sip",
    title: "SIP",
    copy: "A monthly amount you can actually keep. We set it up, review it, and change it when life changes.",
    Icon: FiRepeat,
  },
  {
    id: "goals",
    title: "Goal-based investing",
    copy: "Education, a home, retirement. Categories that fit the goal — scheme choice stays a conversation.",
    Icon: FiTarget,
  },
] as const

function waHref(raw: string) {
  const digits = raw.replace(/\D/g, "")
  const n = digits.length === 10 ? `91${digits}` : digits
  return `https://wa.me/${n}`
}

function inr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n)
}

function sipFuture(monthly: number, years: number, annualPct: number) {
  const r = annualPct / 100 / 12
  const n = years * 12
  if (r === 0) return monthly * n
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

export function PracticePage() {
  const config = samplePracticeConfig
  const { details } = config
  const [themeId, setThemeId] = useState<ThemeId>("forest")
  const [fontId, setFontId] = useState<FontId>("formal")
  const [monthly, setMonthly] = useState(10000)
  const [years, setYears] = useState(15)
  const [ret, setRet] = useState(12)
  const theme = getTheme(themeId)
  const font = fontPairs[fontId]
  const wa = waHref(details.whatsapp)
  const projected = useMemo(() => sipFuture(monthly, years, ret), [monthly, years, ret])

  function onContact(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <ThemeProvider theme={theme}>
      <Root $heading={font.headingVar} $body={font.bodyVar}>
        <GlobalStyle />
        <HeaderBar>
          <HeaderInner>
            <Brand href="#top">
              <BrandName>{details.name}</BrandName>
              <Tagline>AMFI Registered Mutual Fund Distributor</Tagline>
            </Brand>
            <Nav>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#calculators">Calculators</a>
              <a href="#contact">Contact</a>
            </Nav>
            <WaBtn href={wa} target="_blank" rel="noreferrer">
              <FaWhatsapp size={16} aria-hidden />
              WhatsApp
            </WaBtn>
          </HeaderInner>
        </HeaderBar>

        <Hero id="top">
          <HeroImg src={details.heroImageUrl} alt="" />
          <HeroShade />
          <HeroCopy>
            <Eyebrow>{details.city}</Eyebrow>
            <HeroTitle>{details.heroHeadline}</HeroTitle>
            <HeroLead>{details.pitch}</HeroLead>
            <WaBtn href={wa} target="_blank" rel="noreferrer">
              <FaWhatsapp size={16} aria-hidden />
              Talk to {details.name.split(" ")[0]}
            </WaBtn>
          </HeroCopy>
        </Hero>

        <Section id="about">
          <Wrap>
            <AboutGrid>
              <div>
                <Kicker>About</Kicker>
                <H2>A practice in {details.city}, not a product pitch.</H2>
                <Bio>{details.bio}</Bio>
              </div>
              {details.photoUrl ? <Portrait src={details.photoUrl} alt={details.name} /> : null}
            </AboutGrid>
          </Wrap>
        </Section>

        <Section id="credentials">
          <Wrap>
            <Kicker>Registration</Kicker>
            <H2>On the record.</H2>
            <CredGrid>
              {details.credentials.map((c) => (
                <CredCard key={c.number}>
                  <CredMark>
                    <FiShield size={20} aria-hidden />
                  </CredMark>
                  <CredMeta>
                    <CredLabel>{c.label}</CredLabel>
                    <strong>
                      {c.name} · {c.number}
                    </strong>
                  </CredMeta>
                </CredCard>
              ))}
            </CredGrid>
          </Wrap>
        </Section>

        <Section id="services">
          <Wrap>
            <Kicker>Services</Kicker>
            <H2>What we sit down to do.</H2>
            <ServiceGrid>
              {SERVICES.map(({ id, title, copy, Icon }) => (
                <ServiceCard key={id}>
                  <IconWrap>
                    <Icon size={18} aria-hidden />
                  </IconWrap>
                  <ServiceTitle>{title}</ServiceTitle>
                  <ServiceCopy>{copy}</ServiceCopy>
                </ServiceCard>
              ))}
            </ServiceGrid>
          </Wrap>
        </Section>

        <Section id="stats">
          <Wrap>
            <StatRow>
              {details.stats.map((s) => (
                <div key={s.label}>
                  <StatValue>{s.value}</StatValue>
                  <StatLabel>{s.label}</StatLabel>
                </div>
              ))}
            </StatRow>
          </Wrap>
        </Section>

        <Section id="calculators">
          <Wrap>
            <Kicker>Planning</Kicker>
            <H2>A SIP, on paper.</H2>
            <CalcGrid>
              <div>
                <Field>
                  Monthly amount (₹)
                  <Input
                    type="number"
                    min={500}
                    value={monthly}
                    onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                  />
                </Field>
                <Field>
                  Years
                  <Input
                    type="number"
                    min={1}
                    max={40}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value) || 1)}
                  />
                </Field>
                <Field>
                  Expected return (% p.a.)
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={ret}
                    onChange={(e) => setRet(Number(e.target.value) || 1)}
                  />
                </Field>
              </div>
              <Result>
                <ResultK>Illustrative value</ResultK>
                <ResultN>{inr(projected)}</ResultN>
                <ServiceCopy>
                  Layout only — not live fund data. Mutual fund investments are subject to market
                  risks.
                </ServiceCopy>
              </Result>
            </CalcGrid>
          </Wrap>
        </Section>

        <Section id="contact">
          <Wrap>
            <ContactGrid>
              <div>
                <Kicker>Contact</Kicker>
                <H2>Write, or just WhatsApp.</H2>
                <Bio>
                  {details.address}
                  <br />
                  {details.city}
                  <br />
                  {details.hours}
                  <br />
                  <a href={`mailto:${details.email}`}>{details.email}</a>
                </Bio>
              </div>
              <Form onSubmit={onContact}>
                <Field>
                  Name
                  <Input name="name" required autoComplete="name" />
                </Field>
                <Field>
                  Mobile
                  <Input name="mobile" required inputMode="tel" autoComplete="tel" />
                </Field>
                <Field>
                  City
                  <Input name="city" autoComplete="address-level2" />
                </Field>
                <Field>
                  Message
                  <Area name="message" rows={3} />
                </Field>
                <Submit type="submit">Send</Submit>
              </Form>
            </ContactGrid>
          </Wrap>
        </Section>

        <Foot>
          <Wrap>
            <FootTop>
              <div>
                <BrandName>{details.name}</BrandName>
                <p>
                  {details.address}, {details.city}
                </p>
              </div>
              <a href="/disclosures">Commission disclosures</a>
            </FootTop>
            <Disclaimer>
              Mutual fund investments are subject to market risks, read all scheme related documents
              carefully. {details.name} is an AMFI-registered mutual fund distributor. This website
              does not offer financial planning or guaranteed returns.
            </Disclaimer>
          </Wrap>
        </Foot>

        <Strip href={wa} target="_blank" rel="noreferrer">
          <FaWhatsapp size={18} aria-hidden />
          WhatsApp {details.name}
        </Strip>

        <LookDock themeId={themeId} fontId={fontId} onTheme={setThemeId} onFont={setFontId} />
      </Root>
    </ThemeProvider>
  )
}
