import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import React from "react";

const withRouterDevTools = (Component: React.FC) =>
  React.memo(props => (
    <>
      <Component {...props} />
      <TanStackRouterDevtools />
    </>
  ));

export default withRouterDevTools;
