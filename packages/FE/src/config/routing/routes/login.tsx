import { createFileRoute } from "@tanstack/react-router";

import LoginPage from "@/pages/auth/Login";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
