import { useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { RouterProvider } from "@tanstack/react-router";
import { useAuthContext } from "@/context/Auth";

import withAuth from "@/components/hoc/Auth";
import getRouter from "@/config/routing";
import { queryClient } from "@/lib/core/queryClient";

const router = getRouter(queryClient);
const App = () => {
  const { isAuthenticated, isLoading: isAuthenticatedLoading } = useAuth0();
  const { accessToken, isAccessTokenLoading } = useAuthContext();

  const authContext = useMemo(
    () => ({
      isAuthenticated,
      isAuthenticatedLoading,
      isAccessTokenLoading,
      accessToken,
    }),
    [
      accessToken,
      isAccessTokenLoading,
      isAuthenticated,
      isAuthenticatedLoading,
    ],
  );

  return <RouterProvider context={{ authContext }} router={router} />;
};

export default withAuth(App);
