import { Toolbar } from "@mui/material";
import { Link } from "@tanstack/react-router";

import logo from "@/assets/Logo.svg";

import HeaderBurgerMenu from "./BurgerMenu";
import HeaderProfileMenu from "./ProfileMenu";
import StyledHeader from "./styled";

const Header = () => (
  <StyledHeader>
    <Toolbar
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        a: { display: "flex", alignItems: "center" },
      }}
    >
      <HeaderBurgerMenu />
      <Link to="/">
        <img alt="logo Rcp & Plan" height={56} src={logo} />
      </Link>
      <HeaderProfileMenu />
    </Toolbar>
  </StyledHeader>
);

export default Header;
