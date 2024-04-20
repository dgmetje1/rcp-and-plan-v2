import { useMemo } from "react";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

import config from "@/config";
import { printTime } from "@/lib/parsers/time";
import { useGetDailyRecipe } from "@/queries/recipes";
import { DailyRecipe, RecipeDifficulty } from "@/types/recipe";

const CARD_FIELDS: {
  key: keyof DailyRecipe;
  getValue: (recipe: DailyRecipe) => string;
}[] = [
  {
    key: "time",
    getValue: (recipe: DailyRecipe) => printTime(recipe.time),
  },
  {
    key: "difficulty",
    getValue: (recipe: DailyRecipe) =>
      RecipeDifficulty[recipe["difficulty"]].toLocaleLowerCase(),
  },
  {
    key: "portions",
    getValue: (recipe: DailyRecipe) => recipe["portions"].toString(),
  },
];

const HomePageRecipePreviewCard = () => {
  const { data: recipe, isLoading } = useGetDailyRecipe();
  const recipeContent = useMemo(() => {
    if (isLoading || !recipe) return null;

    return (
      <Grid columnSpacing={4} container spacing={2}>
        <Grid item xs={12}>
          <Typography color="#444" fontWeight="600" variant="h4">
            Recipe of the day
          </Typography>
        </Grid>
        <Grid
          item
          sx={{ img: { borderRadius: 2, boxShadow: "2px 1px 3px #aaa" } }}
          xs={4}
        >
          <Link params={{ id: recipe.id.toString() }} to="/recipe/$id">
            <img src={`${config.cdnUrl}/${recipe.thumbnailUrl}`} width="100%" />
          </Link>
        </Grid>
        <Grid display="flex" flexDirection="column" gap={2} item xs={8}>
          <Link params={{ id: recipe.id.toString() }} to="/recipe/$id">
            <Typography fontWeight={600} variant="h5">
              {recipe.title}
            </Typography>
          </Link>
          <Grid container spacing={2}>
            <Grid display="flex" flexDirection="column" gap={2} item xs>
              <Box display="flex" gap={1}>
                {recipe.categories?.map(category => (
                  <Chip label={category.name} />
                ))}
              </Box>
              <Box display="flex" flexDirection="column" rowGap={2}>
                {CARD_FIELDS.map(field => (
                  <Typography key={field.key}>
                    <strong>{field.key}: </strong>
                    {field.getValue(recipe)}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs>
              <Typography fontWeight={600} variant="subtitle1">
                Ingredients
              </Typography>
              <Box component="ul" display="flex" flexDirection="column">
                {recipe.ingredients.slice(0, 5).map(ingredient => (
                  <Box component="li" key={ingredient.id}>
                    <Typography>
                      {`${ingredient.quantity} ${ingredient.units.shortName} de ${ingredient.name.toLocaleLowerCase()}`}
                    </Typography>
                  </Box>
                ))}
                {recipe.ingredients.length > 5 && (
                  <Box component="li">
                    <Typography fontWeight={600}>...</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }, [isLoading, recipe]);

  return (
    <Paper component="section" sx={{ p: 5, bgcolor: "#f0efef" }}>
      {recipeContent}
    </Paper>
  );
};

export default HomePageRecipePreviewCard;
