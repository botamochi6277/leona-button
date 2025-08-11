import { createTheme } from "@mui/material/styles";

// A custom theme for this app
// shishigami orange: #FC9A07

const myPalette = {
  primary: {
    main: "#FC9A07",
  },
  secondary: {
    main: "#0769fc",
  },
  error: {
    main: "#fc1f07",
  },
  warning: { main: "#e3fc07" },
  info: { main: "#69fc07" },
  success: { main: "#07fc9a" },
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
