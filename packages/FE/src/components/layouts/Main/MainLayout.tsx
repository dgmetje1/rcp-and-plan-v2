import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "@tanstack/react-router";

import Header from "@/components/common/Header";

const MainLayout = React.memo(() => {
  return (
    <Box>
      <Header />
      <Box component="main" flexDirection="column">
        <Outlet />
      </Box>
    </Box>
  );
});

export default MainLayout;
