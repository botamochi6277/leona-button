import { createTheme } from "@mui/material/styles";

// A custom theme for this app
// shishigami orange: #FC9A07
// https://coolors.co/fc9a07-67697c-c6878f-8dab7f-253d5b

const myPalette = {
  primary: {
    main: "#FC9A07",
  },
  secondary: {
    main: "#636fdd",
  },
  error: {
    main: "#c6878f",
  },
  warning: { main: "#FF8D5D" },
  info: { main: "#253d5b" },
  success: { main: "#8dab7f" },
};

const myTheme = createTheme({
  palette: {
    ...myPalette,
  },
  typography: {
    fontFamily: ['"M PLUS 1"', '"Helvetica"', "Arial", "sans-serif"].join(","),
  },
});

export { myTheme, myPalette };
