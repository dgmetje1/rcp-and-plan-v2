import React from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Box, IconButton } from "@mui/material";
import { debounce } from "@/lib/imports/lodash";

import { useHomePageContext } from "../../Context";
import StyledHomePageBannerSearcherTextField from "./styled";

const HomePageBannerSearcher = () => {
  const { setSearch } = useHomePageContext();

  const debouncedChangeHandler = React.useMemo(
    () => debounce(event => setSearch(event.target.value), 100),
    [setSearch],
  );

  return (
    <Box position="relative">
      <StyledHomePageBannerSearcherTextField
        fullWidth
        name="search"
        onChange={debouncedChangeHandler}
        placeholder="Search for recipes, categories or users"
        variant="standard"
      />
      <IconButton
        size="small"
        sx={{ position: "absolute", right: 0 }}
        type="submit"
      >
        <SearchOutlined color="primary" sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};

export default HomePageBannerSearcher;
