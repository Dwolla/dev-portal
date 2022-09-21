import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { PURPLE_PRIMARY, ORANGE_PRIMARY } from "./components/colors";
import { ROBOTO } from "./components/typography";

export default createTheme({
  palette: {
    primary: {
      main: PURPLE_PRIMARY,
    },
    secondary: {
      main: ORANGE_PRIMARY,
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    button: {
      fontFamily: ROBOTO,
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0.4px",
      textTransform: "capitalize",
    },
  },
});
