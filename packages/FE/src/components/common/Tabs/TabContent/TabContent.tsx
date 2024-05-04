import { Box } from "@mui/material";

import { useTabsContext } from "../Context";
import { TabContentProps } from "./types";

const TabContent = ({ children, contentIndex, ...rest }: TabContentProps) => {
  const { index } = useTabsContext();

  return (
    <Box hidden={index !== contentIndex} p={2} role="tabpanel" {...rest}>
      {children}
    </Box>
  );
};

export default TabContent;
