import React from "react";
import { AccountCircle } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const HeaderProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        aria-label="account of current user"
        color="inherit"
        onClick={handleMenu}
      >
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="menu-appbar"
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderProfileMenu;
