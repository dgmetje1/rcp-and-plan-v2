import { Auth0ContextInterface } from "@auth0/auth0-react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

import RootComponent from "@/components/routes/RootComponent";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  authContext: Auth0ContextInterface;
}>()({
  component: RootComponent,
});
