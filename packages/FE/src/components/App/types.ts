import { Auth0ContextInterface } from "@auth0/auth0-react";
import { AuthContextValues } from "@/context/Auth/types";

export type AuthRouterContextValues = Pick<
  AuthContextValues,
  "accessToken" | "isAccessTokenLoading"
> &
  Pick<Auth0ContextInterface, "isAuthenticated"> & {
    isAuthenticatedLoading: Auth0ContextInterface["isLoading"];
  };
