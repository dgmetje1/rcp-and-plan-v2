import { Box } from "@mui/material";

import { useTabsContext } from "../Context";
import { TabContentProps } from "./types";

const TabContent = ({ children, contentIndex, display, ...rest }: TabContentProps) => {
  const { index } = useTabsContext();

  const hidden = index !== contentIndex;

  return (
    <Box hidden={hidden} p={2} role="tabpanel" {...rest} display={hidden ? "none" : display}>
      {index === contentIndex && children}
    </Box>
  );
};

export default TabContent;
