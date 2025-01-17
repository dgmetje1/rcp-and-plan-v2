import { createLazyFileRoute } from "@tanstack/react-router";

import ManagementUnitsPage from "@/pages/Management/pages/Units";

export const Route = createLazyFileRoute("/management/units")({
  component: ManagementUnitsPage,
});
