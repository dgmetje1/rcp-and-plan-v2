import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

let singletonRouter: ReturnType<typeof createRouter> | null = null;

const getRouter = (queryClient: QueryClient) => {
  if (singletonRouter) return singletonRouter;

  singletonRouter = createRouter({
    routeTree,
    context: { queryClient, authContext: undefined! },
    defaultPreload: "intent",
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
  });

  return singletonRouter;
};

export default getRouter;

export { Route as HomePageRoute } from "./routes/_mainLayout/index.lazy";
export { Route as PlansRoute } from "./routes/_mainLayout/plans.lazy";
export { Route as ProfileRoute } from "./routes/_mainLayout/profile";
export { Route as RecipeDetailRoute } from "./routes/_mainLayout/recipe.$id";
export { Route as HomeManagementPageRoute } from "./routes/management/index.lazy";
