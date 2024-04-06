import { createLazyFileRoute } from "@tanstack/react-router";

import HomePage from "@/pages/Home";

export const Route = createLazyFileRoute("/_mainLayout/")({
  component: HomePage,
});
