import { createTheme, darken, lighten, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface Palette {
    darkGrey: Palette["primary"];
  }

  interface PaletteOptions {
    darkGrey?: PaletteOptions["primary"];
  }
  interface TypographyVariants {
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    grey: true;
    darkGrey: true;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

const { palette } = createTheme();
const createColor = (mainColor: string) => palette.augmentColor({ color: { main: mainColor } });

export const themeOptions: ThemeOptions = {
  typography: {
    body3: {
      fontSize: "0.8rem",
      lineHeight: "1.2rem",
    },
  },
  palette: {
    mode: "light",
    primary: {
      lighter: lighten("#c5e0bc", 0.7),
      main: "#c5e0bc",
      darker: darken("#c5e0bc", 0.6),
    },
    secondary: {
      main: "#93c683",
    },
    darkGrey: createColor("#303000"),
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

const theme = createTheme(themeOptions);

export default theme;
