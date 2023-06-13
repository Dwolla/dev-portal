import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { ORANGE_PRIMARY, PURPLE_PRIMARY } from "./components/colors";
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
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: "26px",
      letterSpacing: "0.46px",
      textTransform: "capitalize",
    },
  },
});
