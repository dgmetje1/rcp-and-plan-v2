import { AppBar, AppBarProps, styled } from "@mui/material";

const StyledHeaderAppBar = styled(AppBar)`
  background-color: white;
`;

const defaultProps: Partial<AppBarProps> = {
  position: "sticky",
};

const StyledHeader = (props: AppBarProps) => <StyledHeaderAppBar {...defaultProps} {...props} />;

export default StyledHeader;
