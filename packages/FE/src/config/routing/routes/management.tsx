import { createFileRoute } from "@tanstack/react-router";

import ManagementLayout from "@/components/layouts/Management/ManagementLayout";

export const Route = createFileRoute("/management")({
  component: ManagementLayout,
});
