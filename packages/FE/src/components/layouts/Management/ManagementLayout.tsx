import React, { useRef, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Outlet } from "@tanstack/react-router";

import Menu from "@/components/common/Menu";
import usePageTitle from "@/lib/hooks/usePageTitle";

import { StyledManagementLayout } from "./styled";

const ManagementLayout = React.memo(() => {
  const title = usePageTitle();
  const [open, setOpen] = useState(false);
  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuWidth = menuRef.current?.getBoundingClientRect().width ?? 0;

  return (
    <Box>
      <Menu
        defaultTab={1}
        drawerProps={{
          variant: "persistent",
          sx: {
            minWidth: 250,
          },
        }}
        open={open}
        ref={menuRef}
        toggleMenu={toggleMenu}
      />
      <StyledManagementLayout menuWidth={menuWidth} open={open}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", gap: 2 }}>
            <IconButton aria-label="menu" color="inherit" onClick={toggleMenu(!open)}>
              <MenuIcon />
            </IconButton>
            <Typography fontWeight={600} variant="h5">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Outlet />
        </Box>
      </StyledManagementLayout>
    </Box>
  );
});

export default ManagementLayout;
