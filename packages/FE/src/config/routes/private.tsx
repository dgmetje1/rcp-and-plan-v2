import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import withRouterDevTools from "@/components/hoc/withRouterDevTools";
import MainLayout from "@/components/layouts/Main";
import Home from "@/pages/Home";

const MainLayoutWithDevTools = withRouterDevTools(MainLayout);

const rootRoute = createRootRoute({
  component: MainLayoutWithDevTools,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({ routeTree });

export default router;
