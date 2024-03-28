import { Toolbar } from "@mui/material";
import StyledHeader from "./styled";
import HeaderBurgerMenu from "./BurgerMenu";
import HeaderProfileMenu from "./ProfileMenu";
import logo from "@/assets/Logo.svg";
import { Link } from "@tanstack/react-router";

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
        <img src={logo} alt="logo Rcp & Plan" height={56} />
      </Link>
      <HeaderProfileMenu />
    </Toolbar>
  </StyledHeader>
);

export default Header;
