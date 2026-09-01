"use client"

import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; }
  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  button, input, select, textarea { font: inherit; }
`
