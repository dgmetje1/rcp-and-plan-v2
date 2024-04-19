import { FC } from "react";
import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import config from "@/config";
import getRouter from "@/config/routing";
import themeOptions from "@/config/theme";

const theme = createTheme(themeOptions);

const auth0configProps: Auth0ProviderOptions = {
  clientId: config.auth0ClientId,
  domain: config.auth0Domain,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     },
//   },
// });

const queryClient = new QueryClient();
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
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth0Provider>
  </ThemeProvider>
);

export default Main;