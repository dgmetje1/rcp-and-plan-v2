import React from "react";
import { Box } from "@mui/material";

import HomePageBanner from "./Banner";
import HomePageContent from "./Content";
import HomePageContext from "./Context";

const HomePage = () => {
  const [search, setSearch] = React.useState("");

  const contextValues = React.useMemo(() => ({ search, setSearch }), [search]);

  return (
    <HomePageContext.Provider value={contextValues}>
      <Box bgcolor="#F8F6E3" minHeight="100vh">
        <HomePageBanner />
        <HomePageContent />
      </Box>
    </HomePageContext.Provider>
  );
};

export default HomePage;
