import { useAuth0 } from "@auth0/auth0-react";
import { RouterProvider } from "@tanstack/react-router";

import withAuth from "@/components/hoc/Auth";
import getRouter from "@/config/routing";
import { queryClient } from "@/lib/core/queryClient";

const router = getRouter(queryClient);
const App = () => {
  const authContext = useAuth0();
  return <RouterProvider context={{ authContext }} router={router} />;
};

export default withAuth(App);
