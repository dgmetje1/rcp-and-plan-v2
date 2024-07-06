import { EggOutlined, PeopleOutline, RestaurantOutlined, ScaleOutlined } from "@mui/icons-material";
import { Box, Container, Paper, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const SECTIONS = [
  {
    title: "pages.management.index.sections.units",
    icon: <ScaleOutlined />,
    link: "/management/units",
  },
  {
    title: "pages.management.index.sections.ingredients",
    icon: <EggOutlined />,
    link: "/management/ingredients",
  },
  {
    title: "pages.management.index.sections.kitchenware",
    icon: <RestaurantOutlined />,
    link: "/management/kitchenware",
  },
  {
    title: "pages.management.index.sections.users",
    icon: <PeopleOutline />,
    link: "/management/users",
  },
];

const ManagementPage = () => {
  const { t } = useTranslation();

  return (
    <Box p={5}>
      <Container maxWidth="lg" sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }}>
        {SECTIONS.map(({ title, icon, link }) => (
          <Paper
            elevation={2}
            sx={{
              a: { alignItems: "center", display: "flex", gap: 2, px: 4, py: 3 },
              "a:hover": { color: "primary.dark" },
            }}
          >
            <Link to={link}>
              {icon}
              <Typography fontWeight="bold" variant="h6">
                {t(title)}
              </Typography>
            </Link>
          </Paper>
        ))}
      </Container>
    </Box>
  );
};

export default ManagementPage;
