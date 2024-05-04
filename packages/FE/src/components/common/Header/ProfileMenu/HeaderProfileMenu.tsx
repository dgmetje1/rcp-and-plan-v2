import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, Divider, Popover, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "@/context/Auth";

import config from "@/config";

const HeaderProfileMenu = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { account } = useAuthContext();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = React.useCallback(() => {
    handleClose();
    loginWithRedirect();
  }, [loginWithRedirect]);

  const handleLogout = React.useCallback(() => {
    handleClose();
    logout({ logoutParams: { returnTo: window.location.origin } });
  }, [logout]);

  const handleGoToProfile = React.useCallback(() => {
    handleClose();
    navigate({ to: "/profile" });
  }, [navigate]);

  const authenticatedProfileLinks = React.useMemo(
    () => (
      <>
        <Typography
          fontWeight={600}
          sx={{
            px: 2,
            pb: 1,
          }}
        >
          {`Logged as ${user?.nickname}`}
        </Typography>
        <Divider />
        <MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </>
    ),
    [handleGoToProfile, handleLogout, user?.nickname],
  );

  const anonymousProfileLinks = React.useMemo(
    () => <MenuItem onClick={handleLogin}>Log in</MenuItem>,
    [handleLogin],
  );

  return (
    <>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        aria-label="account of current user"
        color="inherit"
        onClick={handleMenu}
      >
        {isAuthenticated && account?.profilePicture ? (
          <Avatar
            alt={`${account?.nickName} profile picture`}
            src={`${config.cdnUrl}/${account.profilePicture}`}
          />
        ) : (
          <AccountCircle fontSize="large" />
        )}
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id="menu-appbar"
        onClose={handleClose}
        open={Boolean(anchorEl)}
        slotProps={{ paper: { sx: { py: 1, minWidth: 150 } } }}
      >
        {isAuthenticated ? authenticatedProfileLinks : anonymousProfileLinks}
      </Popover>
    </>
  );
};

export default HeaderProfileMenu;
