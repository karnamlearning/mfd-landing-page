"use client"

import { createGlobalStyle, css } from "styled-components"

export const GlobalStyle = createGlobalStyle<{ $embedded?: boolean }>`
  *, *::before, *::after { box-sizing: border-box; }
  a { color: inherit; text-decoration: none; }
  button, input, select, textarea { font: inherit; }
  ${({ $embedded, theme }) =>
    $embedded
      ? css``
      : css`
          html,
          body {
            margin: 0;
            overflow-x: hidden;
            -webkit-text-size-adjust: 100%;
          }
          body {
            background: ${theme.bg};
            color: ${theme.text};
            -webkit-font-smoothing: antialiased;
          }
        `}
`
