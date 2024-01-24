import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  ORANGE_PRIMARY,
  PURPLE_075,
  PURPLE_087,
  PURPLE_PRIMARY,
  WHITE_PRIMARY,
} from "./components/colors";
import { POPPINS, ROBOTO } from "./components/typography";

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
    white: {
      main: WHITE_PRIMARY,
    },
  },
  typography: {
    button: {
      fontFamily: ROBOTO,
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: "26px",
      letterSpacing: "0.46px",
      textTransform: "capitalize",
    },
    h2: {
      fontFamily: POPPINS,
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "32px",
      lineHeight: "123.5%",
      letterSpacing: "0.25px",
      color: PURPLE_087,
    },
    body1: {
      fontFamily: ROBOTO,
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "175%",
      letterSpacing: "0.15px",
      color: PURPLE_075,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});
