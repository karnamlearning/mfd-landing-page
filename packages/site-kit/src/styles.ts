import styled, { css } from "styled-components"
import type { TemplateId } from "@mfd/schema"

export const Root = styled.div<{ $heading: string; $body: string; $template: TemplateId; $embedded?: boolean }>`
  --heading: ${({ $heading }) => $heading};
  --body: ${({ $body }) => $body};
  font-family: var(--body), system-ui, sans-serif;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
  min-height: ${({ $embedded }) => ($embedded ? "auto" : "100vh")};
  font-size: ${({ $template }) => ($template === "local" ? "1.08rem" : "1rem")};

  h1,
  h2,
  h3 {
    font-family: var(--heading), Georgia, serif;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
`

export const Wrap = styled.div`
  width: min(1120px, calc(100% - 2.5rem));
  margin-inline: auto;
`

export const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${({ theme }) => theme.bg}f2;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.text}10;
`

export const HeaderInner = styled(Wrap)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0;
`

export const Brand = styled.a`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

export const BrandName = styled.span`
  font-family: var(--heading), Georgia, serif;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.03em;
`

export const Logo = styled.img`
  display: block;
  height: 36px;
  width: auto;
  max-width: 168px;
  object-fit: contain;
`

export const Tagline = styled.span`
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

export const Nav = styled.nav`
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

export const LangToggle = styled.div`
  display: flex;
  gap: 0.35rem;
  font-size: 0.78rem;
`

export const LangBtn = styled.button<{ $on: boolean }>`
  border: 0;
  background: ${({ $on, theme }) => ($on ? theme.primary : "transparent")};
  color: ${({ $on, theme }) => ($on ? theme.btnText : theme.muted)};
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  cursor: pointer;
`

export const WaBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  font-size: 0.85rem;
`

export const Hero = styled.section<{ $template: TemplateId }>`
  position: relative;
  display: grid;
  color: #fafaf9;

  ${({ $template, theme }) =>
    $template === "solo"
      ? css`
          min-height: auto;
          color: ${theme.text};
          background: ${theme.bg};
          align-items: center;
          width: min(1120px, calc(100% - 2.5rem));
          margin: 2.5rem auto 0;
          gap: 2.5rem;

          @media (min-width: 800px) {
            grid-template-columns: 0.85fr 1.15fr;
          }
        `
      : css`
          min-height: min(${$template === "local" ? "78vh, 680px" : "88vh, 760px"});
          align-items: end;
        `}
`

export const HeroImg = styled.img<{ $template: TemplateId }>`
  ${({ $template }) =>
    $template === "solo"
      ? css`
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 4px;
        `
      : css`
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        `}
`

export const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(12, 12, 12, 0.88) 0%,
    rgba(12, 12, 12, 0.35) 48%,
    rgba(12, 12, 12, 0.12) 100%
  );
`

export const HeroCopy = styled.div<{ $template: TemplateId }>`
  position: relative;
  ${({ $template }) =>
    $template === "solo"
      ? css`
          padding: 0;
          max-width: 36rem;
        `
      : css`
          padding: 5.5rem 0 4rem;
          max-width: 40rem;
          margin-left: max(1.25rem, calc((100% - 1120px) / 2));
          margin-right: auto;
          width: min(40rem, calc(100% - 2.5rem));
        `}
`

export const Eyebrow = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.8;
`

export const HeroTitle = styled.h1<{ $template: TemplateId }>`
  margin: 0 0 1rem;
  line-height: 1.12;
  font-size: ${({ $template }) =>
    $template === "local" ? "clamp(2.4rem, 5vw, 3.6rem)" : "clamp(2.1rem, 4.6vw, 3.35rem)"};
`

export const HeroLead = styled.p`
  margin: 0 0 1.6rem;
  font-size: 1.05rem;
  line-height: 1.55;
  max-width: 34rem;
  opacity: 0.92;
`

export const Section = styled.section`
  padding: ${({ theme }) => theme.space[6]} 0;
`

export const Kicker = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

export const H2 = styled.h2`
  margin: 0 0 1.5rem;
  font-size: clamp(1.7rem, 3vw, 2.25rem);
  line-height: 1.2;
`

export const AboutGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};

  @media (min-width: 800px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`

export const Bio = styled.p`
  margin: 0;
  font-size: 1.12rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.muted};
`

export const Portrait = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 4px;
`

export const CredGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const CredCard = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}12;
  border-radius: 4px;
`

export const CredMark = styled.div`
  width: 44px;
  height: 44px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
`

export const CredMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const CredLabel = styled.span`
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

export const ServiceGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const ServiceCard = styled.article`
  padding: 1.5rem 1.35rem 1.6rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.text}10;
`

export const IconWrap = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary}33;
  border-radius: 4px;
`

export const ServiceTitle = styled.h3`
  margin: 0 0 0.45rem;
  font-size: 1.15rem;
`

export const ServiceCopy = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.muted};
`

export const StatRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  text-align: center;

  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const StatValue = styled.p`
  margin: 0;
  font-family: var(--heading), Georgia, serif;
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  line-height: 1;
`

export const StatLabel = styled.p`
  margin: 0.6rem 0 0;
  color: ${({ theme }) => theme.muted};
  font-size: 0.9rem;
`

export const StepGrid = styled.ol`
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const Step = styled.li`
  padding: 1.35rem 1.25rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}10;
  border-radius: 4px;
`

export const StepN = styled.span`
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
  margin-bottom: 0.5rem;
`

export const CalcGrid = styled.div`
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

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.muted};
  margin-bottom: 1rem;
`

export const Input = styled.input`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.text}28;
  background: transparent;
  padding: 0.45rem 0;
  color: ${({ theme }) => theme.text};
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
`

export const PhoneField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  border-bottom: 1px solid ${({ theme }) => theme.text}28;
`

export const PhonePrefix = styled.span`
  font-size: 0.95rem;
  font-weight: 650;
  color: ${({ theme }) => theme.text};
  padding: 0.45rem 0;
  flex-shrink: 0;
`

export const PhoneInput = styled.input`
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  padding: 0.45rem 0;
  color: ${({ theme }) => theme.text};
  outline: none;
  font-family: inherit;
`

export const Area = styled.textarea`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.text}28;
  background: transparent;
  padding: 0.45rem 0;
  color: ${({ theme }) => theme.text};
  outline: none;
  min-height: 4.5rem;
  resize: vertical;
`

export const Result = styled.div`
  padding: ${({ theme }) => theme.space[3]};
  border-left: 2px solid ${({ theme }) => theme.accent};
`

export const ResultK = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

export const ResultN = styled.p`
  margin: 0;
  font-family: var(--heading), Georgia, serif;
  font-size: 2.4rem;
`

export const QuoteGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const Quote = styled.blockquote`
  margin: 0;
  padding: 1.35rem 1.3rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}10;
  border-radius: 4px;

  p {
    margin: 0 0 1rem;
    font-size: 1.05rem;
    line-height: 1.55;
  }

  footer {
    color: ${({ theme }) => theme.muted};
    font-size: 0.85rem;
  }
`

export const FaqList = styled.dl`
  margin: 0;
  display: grid;
  gap: 1.25rem;
`

export const FaqQ = styled.dt`
  font-family: var(--heading), Georgia, serif;
  font-size: 1.15rem;
  margin: 0 0 0.35rem;
`

export const FaqA = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.muted};
  line-height: 1.55;
`

export const ContactGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};

  @media (min-width: 800px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`

export const Form = styled.form`
  display: grid;
  gap: 0.2rem;
`

export const Submit = styled.button`
  margin-top: 0.5rem;
  justify-self: start;
  border: 0;
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
`

export const Foot = styled.footer`
  padding: ${({ theme }) => theme.space[5]} 0 ${({ theme }) => theme.space[8]};
  border-top: 1px solid ${({ theme }) => theme.text}12;
  color: ${({ theme }) => theme.muted};
  font-size: 0.88rem;
`

export const FootTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: ${({ theme }) => theme.space[4]};
`

export const Disclaimer = styled.p`
  margin: 0;
  max-width: 46rem;
  line-height: 1.55;
  font-size: 0.8rem;
`

export const Strip = styled.a`
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
