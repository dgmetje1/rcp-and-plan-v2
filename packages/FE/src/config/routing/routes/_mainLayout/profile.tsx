import { createFileRoute, redirect } from "@tanstack/react-router";

import ProfilePage from "@/pages/Profile/ProfilePage";

export const Route = createFileRoute("/_mainLayout/profile")({
  beforeLoad: ({ context, location }) => {
    if (
      !context.authContext.isAuthenticated &&
      !context.authContext.isLoading
    ) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProfilePage,
});
