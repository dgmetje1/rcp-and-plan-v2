import { DrawerProps } from "@mui/material";

export type MenuProps = {
  defaultTab: 0 | 1;
  drawerProps?: Omit<DrawerProps, "open">;
  toggleMenu: (newOpen: boolean) => () => void;
} & Pick<DrawerProps, "open">;
