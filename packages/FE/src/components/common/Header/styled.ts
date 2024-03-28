import { AppBar, styled } from "@mui/material";

const StyledHeader = styled(AppBar)`
  background-color: white;
`;

StyledHeader.defaultProps = {
  position: "sticky",
};

export default StyledHeader;
