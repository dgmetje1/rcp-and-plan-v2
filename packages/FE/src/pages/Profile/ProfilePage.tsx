import { Box, Container } from "@mui/material";
import { useAuthContext } from "@/context/Auth";

import bannerImg from "@/assets/banner-profile.jpg";

const ProfilePage = () => {
  const { account } = useAuthContext();

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
      <Container maxWidth="lg">{account?.nickName}</Container>
    </Box>
  );
};

export default ProfilePage;
