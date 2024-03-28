import { Box, Container } from "@mui/material";

import bannerImg from "@/assets/banner-home.jpg";

import HomePageBannerSearcher from "./Searcher";

const HomePageBanner = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxHeight="30vh"
      overflow="hidden"
      position="relative"
      sx={{ "> img": { filter: "brightness(70%)" } }}
    >
      <img
        alt="homepage banner containing some ingredients"
        height="100%"
        src={bannerImg}
        width="100%"
      />
      <Box position="absolute" top="33%" width="100%">
        <Container maxWidth="md">
          <HomePageBannerSearcher />
        </Container>
      </Box>
    </Box>
  );
};

export default HomePageBanner;
