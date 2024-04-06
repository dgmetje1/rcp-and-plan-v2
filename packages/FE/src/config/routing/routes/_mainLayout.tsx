import { createFileRoute } from "@tanstack/react-router";

import MainLayout from "@/components/layouts/Main/MainLayout";

export const Route = createFileRoute("/_mainLayout")({
  component: MainLayout,
});
