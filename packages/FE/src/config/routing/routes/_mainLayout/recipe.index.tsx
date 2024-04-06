import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout/recipe/")({
  component: () => <div>Hello /_mainLayout/recipe/!</div>,
});
