import { createLazyFileRoute } from "@tanstack/react-router";

import ManagementPage from "@/pages/Management";

export const Route = createLazyFileRoute("/management/")({
  component: ManagementPage,
});
