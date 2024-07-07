import { createLazyFileRoute } from "@tanstack/react-router";

import ManagementUnitsPage from "@/pages/ManagementUnits/ManagementUnitsPage";

export const Route = createLazyFileRoute("/management/units")({
  component: ManagementUnitsPage,
});
