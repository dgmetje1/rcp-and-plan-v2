import { createLazyFileRoute } from "@tanstack/react-router";

import PlansPage from "@/pages/Plans";

export const Route = createLazyFileRoute("/_mainLayout/plans")({
  component: PlansPage,
});
