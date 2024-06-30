import React, { useRef, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Outlet } from "@tanstack/react-router";

import Menu from "@/components/common/Menu";

import { StyledManagementLayout } from "./styled";

const ManagementLayout = React.memo(() => {
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
        <Box display="flex" justifyContent="flex-start">
          <IconButton aria-label="menu" color="inherit" onClick={toggleMenu(!open)} sx={{ my: 1, mx: 2 }}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column">
          <Outlet />
        </Box>
      </StyledManagementLayout>
    </Box>
  );
});

export default ManagementLayout;
