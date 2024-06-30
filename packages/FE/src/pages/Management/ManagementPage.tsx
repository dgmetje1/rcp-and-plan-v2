import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

const ManagementPage = () => {
  const { t } = useTranslation();
  return (
    <Box display="flex" mx={3}>
      <Typography component="h1" fontWeight={700} variant="h3">
        {t("pages.management.index.title")}
      </Typography>
    </Box>
  );
};

export default ManagementPage;
