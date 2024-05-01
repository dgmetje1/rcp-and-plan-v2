import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container } from "@mui/material";

import bannerImg from "@/assets/banner-profile.jpg";

const ProfilePage = () => {
  const { user } = useAuth0();
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
      <Container maxWidth="lg">{user?.nickname}</Container>
    </Box>
  );
};

export default ProfilePage;
