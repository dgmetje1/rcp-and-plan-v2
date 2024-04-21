import { useState } from "react";
import { Menu } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

const HeaderBurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <IconButton
        aria-label="menu"
        color="inherit"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <Menu />
      </IconButton>
      <Drawer anchor="left" onClose={toggleDrawer(false)} open={open}>
        <Box
          onClick={toggleDrawer(false)}
          role="presentation"
          sx={{ width: 250 }}
        ></Box>
      </Drawer>
    </>
  );
};

export default HeaderBurgerMenu;
