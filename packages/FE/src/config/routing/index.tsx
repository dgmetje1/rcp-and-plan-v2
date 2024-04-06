import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const getRouter = (queryClient: QueryClient) =>
  createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
  });

export default getRouter;

export { Route as HomePageRoute } from "./routes/_mainLayout/index.lazy";
export { Route as RecipeDetailRoute } from "./routes/_mainLayout/recipe.$id.lazy";
