import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

const themeOptions: ThemeOptions = {
  typography: {
    body3: {
      fontSize: "0.8rem",
      lineHeight: "1.2rem",
    },
  },
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
