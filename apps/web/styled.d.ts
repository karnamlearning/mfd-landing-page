import "styled-components"
import type { Theme } from "@mfd/tokens"

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
