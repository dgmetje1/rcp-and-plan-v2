import { Box, Container, Grid, Typography } from "@mui/material";

import IngredientsList from "@/components/common/IngredientsList";
import RichTextContent from "@/components/common/RichTextContent";
import config from "@/config";
import { RecipeDetailRoute } from "@/config/routing";
import { useSuspenseGetRecipe } from "@/queries/recipes";

import RecipeDetailPageAuthorCard from "./cards/Author";
import RecipeDetailPageInfoCard from "./cards/Info";

const RecipeDetailPage = () => {
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
        <Typography component="div" variant="body1">
          <RichTextContent content={recipe.description} />
        </Typography>
        <Box display="flex" flexDirection="column">
          <IngredientsList
            items={recipe.ingredients}
            title={<Typography variant="h4">Ingredients</Typography>}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default RecipeDetailPage;
