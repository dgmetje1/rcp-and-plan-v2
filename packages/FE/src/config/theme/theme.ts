import { ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#c5e0bc",
    },
    secondary: {
      main: "#93c683",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 420,
      md: 678,
      lg: 1280,
      xl: 1920,
    },
  },
};

export default themeOptions;
