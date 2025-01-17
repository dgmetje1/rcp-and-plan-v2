import { createLazyFileRoute } from "@tanstack/react-router";

import ManagementIngredientsPage from "@/pages/Management/pages/Ingredients";

export const Route = createLazyFileRoute("/management/ingredients")({
  component: ManagementIngredientsPage,
});
