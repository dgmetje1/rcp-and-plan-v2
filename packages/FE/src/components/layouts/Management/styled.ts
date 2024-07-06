import { styled } from "@mui/material";

export const StyledManagementLayout = styled("main", {
  shouldForwardProp: (prop: string) => !["open", "menuWidth"].includes(prop),
})<{
  open?: boolean;
  menuWidth: number;
}>(({ theme, open, menuWidth }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  backgroundColor: theme.palette.primary.lighter,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  minHeight: "100dvh",
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${menuWidth}px`,
    maxWidth: `calc(100% - ${menuWidth}px)`,
  }),
}));
