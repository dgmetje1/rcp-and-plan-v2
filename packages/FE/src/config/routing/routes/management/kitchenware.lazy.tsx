import { createLazyFileRoute } from "@tanstack/react-router";

import ManagementKitchenwarePage from "@/pages/Management/pages/Kitchenware";

export const Route = createLazyFileRoute("/management/kitchenware")({
  component: ManagementKitchenwarePage,
});
