import { Avatar, Box, Button, Typography } from "@mui/material";

import config from "@/config";
import { useSuspenseGetUser } from "@/queries/users";

const ProfilePageAccountDetails = () => {
  const { data: user } = useSuspenseGetUser();
  return (
    <Box alignItems="center" component="section" display="flex" gap={3} mb={2} py={3}>
      <Avatar src={`${config.cdnUrl}/${user.profilePicture}`} sx={{ height: 96, width: 96 }} />
      <Box display="flex" flexDirection="column" rowGap={1}>
        <Typography component="h1" fontWeight={700} variant="h4">
          {user.nickName}
        </Typography>
        <Button size="small" variant="outlined">
          Follow
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePageAccountDetails;
