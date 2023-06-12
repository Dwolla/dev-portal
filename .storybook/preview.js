import { ThemeProvider } from "@mui/material/styles";
import theme from "../app/theme.ts";

// Wrap all stories in ThemeProvider and Material-UI theme
const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  layout: "centered",
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#ffffff",
      },
      {
        name: "dark",
        value: "#2d2d47",
      },
    ],
  },
};
