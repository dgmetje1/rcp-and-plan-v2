import { createFileRoute } from "@tanstack/react-router";

import ManagementLayout from "@/components/layouts/Management/ManagementLayout";
import i18n from "@/i18n";

export const Route = createFileRoute("/management")({
  component: ManagementLayout,
  beforeLoad: () => ({ getTitle: () => i18n.t("pages.management.index.title") }),
});
