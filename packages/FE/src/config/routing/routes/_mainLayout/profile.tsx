import { createFileRoute, redirect } from "@tanstack/react-router";

import Loader from "@/components/common/Loader";
import ProfilePage from "@/pages/Profile/ProfilePage";
import { getUserOptions } from "@/queries/users";

export const Route = createFileRoute("/_mainLayout/profile")({
  beforeLoad: ({ context, location }) => {
    if (!context.authContext.isAuthenticated && !context.authContext.isAuthenticatedLoading) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(getUserOptions());
  },
  component: ProfilePage,
  pendingComponent: Loader,
  pendingMs: 1000,
});
