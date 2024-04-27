import { useTranslation } from "react-i18next";
import { Box, Container, Grid, Typography } from "@mui/material";

import List from "@/components/common/List";
import RichTextContent from "@/components/common/RichTextContent";
import config from "@/config";
import { RecipeDetailRoute } from "@/config/routing";
import { useSuspenseGetRecipe } from "@/queries/recipes";

import RecipeDetailPageAuthorCard from "./cards/Author";
import RecipeDetailPageInfoCard from "./cards/Info";
import RecipeDetailPageStepsSection from "./sections/Steps";

const RecipeDetailPage = () => {
  const { t } = useTranslation();
  const { id } = RecipeDetailRoute.useParams();
  const { data: recipe } = useSuspenseGetRecipe(id);

  return (
    <Box component="article" py={5} sx={{ bgcolor: "#fffcf6", flexGrow: 1 }}>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Box flexDirection="column">
          <Typography component="h1" fontWeight={700} variant="h3">
            {recipe.title}
          </Typography>
        </Box>
        <Grid container spacing={5}>
          <Grid
            item
            maxHeight={575}
            md={8}
            sx={{
              overflow: "hidden",
              img: { borderRadius: 2, objectFit: "cover" },
            }}
            xs={12}
          >
            <img
              height="100%"
              src={`${config.cdnUrl}/${recipe.headerImg}`}
              width="100%"
            />
          </Grid>
          <Grid
            item
            md={4}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            xs={12}
          >
            <RecipeDetailPageInfoCard />
            <RecipeDetailPageAuthorCard />
          </Grid>
        </Grid>
        <Typography component="section" variant="body1">
          <RichTextContent content={recipe.description} />
        </Typography>
        <Box component="section" display="flex">
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <List
              items={recipe.ingredients}
              renderItem={ingredient =>
                `${ingredient.quantity} ${ingredient.units.shortName} de ${ingredient.name.toLocaleLowerCase()}`
              }
              title={
                <Typography variant="h4">
                  {t("pages.recipe.ingredients_title")}
                </Typography>
              }
            />
          </Box>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <List
              items={recipe.kitchenware}
              renderItem={kitchenware =>
                `${kitchenware.quantity} ${kitchenware.name.toLocaleLowerCase()}`
              }
              title={
                <Typography variant="h4">
                  {t("pages.recipe.kitchenware_title")}
                </Typography>
              }
            />
          </Box>
        </Box>

        <RecipeDetailPageStepsSection />
      </Container>
    </Box>
  );
};

export default RecipeDetailPage;
