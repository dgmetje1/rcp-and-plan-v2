import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

import { AuthRouterContextValues } from "@/components/App";
import RootComponent from "@/components/routes/RootComponent";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  authContext: AuthRouterContextValues;
  getTitle: () => string;
}>()({
  component: RootComponent,
});
