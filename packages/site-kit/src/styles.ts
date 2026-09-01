import styled, { css } from "styled-components"
import type { FamilyId, TemplateId } from "@mfd/schema"

export const Root = styled.div<{
  $heading: string
  $body: string
  $template: TemplateId
  $family: FamilyId
  $embedded?: boolean
}>`
  --heading: ${({ $heading }) => $heading};
  --body: ${({ $body }) => $body};
  font-family: var(--body), system-ui, sans-serif;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bg};
  min-height: ${({ $embedded }) => ($embedded ? "100%" : "100vh")};
  font-size: ${({ $template, $family }) =>
    $family === "folio" || $template === "local" ? "1.08rem" : $family === "counter" ? "0.97rem" : "1rem"};
  width: 100%;
  overflow-x: clip;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  container-type: inline-size;
  container-name: site;

  h1,
  h2,
  h3 {
    font-family: var(--heading), Georgia, serif;
    font-weight: ${({ $family }) => ($family === "counter" ? 600 : 500)};
    letter-spacing: ${({ $family }) => ($family === "folio" ? "-0.035em" : "-0.02em")};
  }

  ${({ $family, theme }) =>
    $family === "folio" &&
    css`
      header {
        background: ${theme.surface};
        border-bottom: 2px solid ${theme.text}18;
        backdrop-filter: none;
      }
      h2 {
        font-size: clamp(1.7rem, 4.8cqi, 2.7rem);
        letter-spacing: -0.04em;
      }
      #about article {
        background: transparent;
        border: 0;
        border-left: 2px solid ${theme.primary};
        border-radius: 0;
        padding: 0.15rem 0 0.15rem 1rem;
      }
      #about > div > div:last-of-type {
        grid-template-columns: 1fr;
        max-width: 42rem;
        gap: 1.1rem;
      }
      #how ol {
        grid-template-columns: 1fr;
        max-width: 40rem;
      }
      #how li {
        background: transparent;
        border: 0;
        border-bottom: 1px solid ${theme.text}12;
        border-radius: 0;
        padding: 1rem 0 1.15rem;
      }
      #testimonials blockquote {
        background: transparent;
        border: 0;
        border-top: 1px solid ${theme.text}18;
        border-radius: 0;
        padding: 1.25rem 0 0.5rem;
      }
    `}

  ${({ $family, theme }) =>
    $family === "counter" &&
    css`
      header {
        background: ${theme.primary};
        color: ${theme.btnText};
        border-bottom: 0;
        backdrop-filter: none;
      }
      header a,
      header button,
      header span {
        color: inherit;
      }
      header a[href*="wa.me"] {
        background: ${theme.btnText};
        color: ${theme.primary};
      }
      section {
        padding-top: 2.1rem;
        padding-bottom: 2.1rem;
      }
      #stats {
        background: ${theme.primary};
        color: ${theme.btnText};
      }
      #stats p {
        color: inherit;
      }
      #how ol {
        grid-template-columns: 1fr 1fr;
      }
      #how li,
      #services article,
      #testimonials blockquote {
        border-radius: 0;
      }
    `}
`

export const Wrap = styled.div`
  width: min(1120px, calc(100% - 2rem));
  margin-inline: auto;

  @container site (min-width: 700px) {
    width: min(1120px, calc(100% - 2.5rem));
  }
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
  gap: 0.65rem;
  padding: 0.7rem 0;

  @container site (min-width: 860px) {
    gap: 1rem;
    padding: 0.9rem 0;
  }
`

export const Brand = styled.a`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
`

export const BrandName = styled.span`
  font-family: var(--heading), Georgia, serif;
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @container site (min-width: 860px) {
    font-size: 1.15rem;
  }
`

export const Logo = styled.img`
  display: block;
  height: 30px;
  width: auto;
  max-width: 132px;
  object-fit: contain;

  @container site (min-width: 860px) {
    height: 36px;
    max-width: 168px;
  }
`

export const Tagline = styled.span`
  font-size: 0.58rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
  line-height: 1.35;
  max-width: 100%;

  @container site (min-width: 860px) {
    font-size: 0.68rem;
  }
`

export const MenuBtn = styled.button`
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.text}18;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  cursor: pointer;

  @container site (min-width: 860px) {
    display: none;
  }
`

export const MobileNav = styled.nav`
  display: grid;
  gap: 0.15rem;
  padding: 0.35rem 0 0.85rem;
  border-top: 1px solid ${({ theme }) => theme.text}10;

  a {
    display: block;
    padding: 0.55rem 0;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text};
  }

  @container site (min-width: 860px) {
    display: none;
  }
`

export const Nav = styled.nav`
  display: none;
  gap: 1.4rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.muted};

  @container site (min-width: 860px) {
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
  flex-shrink: 0;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  padding: 0.5rem 0.7rem;
  border-radius: 999px;
  font-size: 0.82rem;

  @container site (min-width: 860px) {
    padding: 0.55rem 0.95rem;
    font-size: 0.85rem;
  }
`

export const WaLabel = styled.span`
  display: none;

  @container site (min-width: 480px) {
    display: inline;
  }
`

export const Hero = styled.section<{ $template: TemplateId; $layout: "split" | "overlay" | "center" }>`
  position: relative;
  display: grid;
  color: #fafaf9;

  ${({ $layout, $template, theme }) =>
    $layout === "split"
      ? css`
          min-height: auto;
          color: ${theme.text};
          background: ${theme.bg};
          align-items: center;
          width: min(1120px, calc(100% - 2rem));
          margin: 1.5rem auto 0;
          gap: 1.5rem;

          @container site (min-width: 800px) {
            width: min(1120px, calc(100% - 2.5rem));
            margin: 2.5rem auto 0;
            gap: 2.75rem;
            grid-template-columns: 0.85fr 1.15fr;
          }
        `
      : $layout === "center"
        ? css`
            min-height: 22rem;
            align-items: center;
            justify-items: center;
            text-align: center;

            @container site (min-width: 800px) {
              min-height: min(76vh, 640px);
            }
          `
        : css`
            min-height: 22rem;
            align-items: end;

            @container site (min-width: 800px) {
              min-height: min(${$template === "local" ? "78vh, 680px" : "88vh, 760px"});
            }
          `}
`

export const HeroImg = styled.img<{ $layout: "split" | "overlay" | "center" }>`
  ${({ $layout }) =>
    $layout === "split"
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
          opacity: ${$layout === "center" ? 0.45 : 1};
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

export const HeroCopy = styled.div<{ $layout: "split" | "overlay" | "center" }>`
  position: relative;
  ${({ $layout }) =>
    $layout === "split"
      ? css`
          padding: 0;
          max-width: 36rem;
        `
      : $layout === "center"
        ? css`
            padding: 3.5rem 1.25rem;
            max-width: 38rem;
            margin: 0 auto;
            width: min(38rem, calc(100% - 2rem));
            justify-self: center;

            @container site (min-width: 800px) {
              padding: 5rem 0;
            }
          `
        : css`
          padding: 3.25rem 0 2.25rem;
          max-width: 40rem;
          margin-left: max(1rem, calc((100% - 1120px) / 2));
          margin-right: auto;
          width: min(40rem, calc(100% - 2rem));

          @container site (min-width: 800px) {
            padding: 5.5rem 0 4rem;
            width: min(40rem, calc(100% - 2.5rem));
            margin-left: max(1.25rem, calc((100% - 1120px) / 2));
          }
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
  overflow-wrap: anywhere;
  font-size: ${({ $template }) =>
    $template === "local" ? "clamp(1.55rem, 7.2cqi, 3.6rem)" : "clamp(1.45rem, 6.4cqi, 3.35rem)"};
`

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
`

export const GhostBtn = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  border: 1px solid currentColor;
  font-size: 0.88rem;
  opacity: 0.92;
`

export const HeroLead = styled.p`
  margin: 0 0 1.25rem;
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 34rem;
  opacity: 0.92;

  @container site (min-width: 700px) {
    margin: 0 0 1.6rem;
    font-size: 1.05rem;
    line-height: 1.55;
  }
`

export const Section = styled.section`
  padding: 2.75rem 0;

  @container site (min-width: 800px) {
    padding: ${({ theme }) => theme.space[6]} 0;
  }
`

export const Kicker = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.muted};
`

export const H2 = styled.h2`
  margin: 0 0 0.75rem;
  font-size: clamp(1.45rem, 4.2cqi, 2.25rem);
  line-height: 1.2;
`

export const SectionLead = styled.p`
  margin: 0 0 1.5rem;
  max-width: 38rem;
  font-size: 0.98rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.muted};
`

export const AboutGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};

  @container site (min-width: 800px) {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
  }
`

export const Bio = styled.p`
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.muted};

  @container site (min-width: 700px) {
    font-size: 1.12rem;
  }
`

export const MetaRow = styled.p`
  margin: 1.15rem 0 0;
  font-size: 0.88rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};
`

export const WhyGrid = styled.div`
  display: grid;
  gap: 0.85rem;
  margin-top: 0;

  @container site (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`

export const WhyCard = styled.article`
  padding: 1.15rem 1.1rem 1.25rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.text}10;
  border-radius: 4px;
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

  @container site (min-width: 700px) {
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

export const ServiceGrid = styled.div<{ $list?: boolean }>`
  display: grid;
  gap: 0.85rem;

  ${({ $list }) =>
    $list
      ? css`
          gap: 0;
        `
      : css`
          @container site (min-width: 520px) {
            grid-template-columns: 1fr 1fr;
          }

          @container site (min-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
        `}
`

export const ServiceCard = styled.article<{ $list?: boolean }>`
  padding: 1.25rem 1.15rem 1.35rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.text}10;

  @container site (min-width: 700px) {
    padding: 1.5rem 1.35rem 1.6rem;
  }

  ${({ $list, theme }) =>
    $list &&
    css`
      display: block;
      padding: 1rem 0 1.15rem;
      background: transparent;
      border: 0;
      border-bottom: 1px solid ${theme.text}12;
      border-radius: 0;

      @container site (min-width: 700px) {
        padding: 1.15rem 0 1.25rem;
      }
    `}
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
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  text-align: center;

  @container site (min-width: 700px) {
    gap: ${({ theme }) => theme.space[4]};
  }
`

export const StatValue = styled.p`
  margin: 0;
  font-family: var(--heading), Georgia, serif;
  font-size: clamp(1.7rem, 5.5cqi, 3.4rem);
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

  @container site (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @container site (min-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
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

  @container site (min-width: 800px) {
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
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
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
  font-size: 1rem;
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
  font-size: 1rem;
  width: 100%;
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
  font-size: clamp(1.7rem, 6vw, 2.4rem);
  word-break: break-word;
`

export const QuoteGrid = styled.div`
  display: grid;
  gap: 1rem;

  @container site (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @container site (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
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

export const FaqList = styled.div`
  margin: 0;
  display: grid;
  gap: 1.25rem;
`

export const FaqQ = styled.h3`
  font-family: var(--heading), Georgia, serif;
  font-size: 1.15rem;
  margin: 0 0 0.35rem;
`

export const FaqA = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.muted};
  line-height: 1.55;
`

export const ContactGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};

  @container site (min-width: 800px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`

export const ContactList = styled.div`
  margin-top: 1.1rem;
  display: grid;
  gap: 0.35rem;
  font-size: 0.95rem;
  line-height: 1.45;

  a {
    text-decoration: underline;
    text-underline-offset: 0.16em;
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

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

export const Foot = styled.footer`
  padding: 2.25rem 0 calc(5.5rem + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid ${({ theme }) => theme.text}12;
  color: ${({ theme }) => theme.muted};
  font-size: 0.88rem;

  @container site (min-width: 860px) {
    padding: ${({ theme }) => theme.space[5]} 0 ${({ theme }) => theme.space[8]};
  }
`

export const FootTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: ${({ theme }) => theme.space[4]};
`

export const FootNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.15rem;
  font-size: 0.88rem;

  a {
    text-decoration: underline;
    text-underline-offset: 0.16em;
  }
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
  padding: 0.75rem 0.75rem calc(0.75rem + env(safe-area-inset-bottom, 0px));
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};
  font-size: 0.88rem;

  @container site (min-width: 860px) {
    display: none;
  }
`

export const CalcBtn = styled.button`
  border: 0;
  cursor: pointer;
  margin-top: 0.4rem;
  border-radius: 10px;
  padding: 0.55rem 0.9rem;
  font-size: 0.88rem;
  font-weight: 600;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.btnText};

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

export const WaResult = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`

export const LeadBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`
