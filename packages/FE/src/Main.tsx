import { FC } from "react";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "@/components/App";
import config from "@/config";
import getRouter from "@/config/routing";
import themeOptions from "@/config/theme";
import { queryClient } from "@/lib/core/queryClient";

const theme = createTheme(themeOptions);

const auth0configProps: Auth0ProviderOptions = {
  clientId: config.auth0ClientId,
  domain: config.auth0Domain,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: config.auth0ApiAudience,
  },
};

const router = getRouter(queryClient);

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Main: FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        "*": { boxSizing: "border-box" },
        body: {
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          height: "100dvh",
        },
        "#root": {
          height: "100%",
        },
        a: {
          color: "inherit",
          textDecoration: "inherit",
        },
        "::-webkit-scrollbar": {
          width: "0.5em",
          height: "0.5em",
          display: "none",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    />
    <Auth0Provider {...auth0configProps}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Auth0Provider>
  </ThemeProvider>
);

export default Main;
