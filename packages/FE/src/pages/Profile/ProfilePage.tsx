import { Box, Container } from "@mui/material";

import bannerImg from "@/assets/banner-profile.jpg";

import ProfilePageAccountDetails from "./AccountDetails";
import ProfilePageAccountTabs from "./AccountTabs";

const ProfilePage = () => {
  return (
    <Box
      flexDirection="column"
      sx={{ "> img": { maxHeight: "30vh", objectFit: "cover" } }}
    >
      <img
        alt="profile banner with some cooks in a kitchen"
        height="100%"
        src={bannerImg}
        width="100%"
      />
      <Container maxWidth="lg">
        <ProfilePageAccountDetails />
        <ProfilePageAccountTabs />
      </Container>
    </Box>
  );
};

export default ProfilePage;
