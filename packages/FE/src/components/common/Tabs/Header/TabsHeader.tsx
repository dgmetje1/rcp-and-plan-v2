import { Tabs as MuiTabs } from "@mui/material";

import { useTabsContext } from "../Context";
import { TabsHeaderProps } from "./types";

const TabsHeader = ({ children, ...rest }: TabsHeaderProps) => {
  const { index, onTabChange } = useTabsContext();

  return (
    <MuiTabs
      onChange={(_event, newTab) => onTabChange(newTab)}
      value={index}
      {...rest}
    >
      {children}
    </MuiTabs>
  );
};
export default TabsHeader;
