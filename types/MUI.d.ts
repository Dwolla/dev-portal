import type { PaletteColor, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    white: PaletteColor;
  }

  interface PaletteOptions {
    white?: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}
