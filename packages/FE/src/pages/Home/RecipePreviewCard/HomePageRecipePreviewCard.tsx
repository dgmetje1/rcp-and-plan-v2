import React from "react";
import { faker } from "@faker-js/faker";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";

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
  const recipeContent = React.useMemo(() => {
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
          <img src={`${config.cdnUrl}/${recipe.thumbnailUrl}`} width="100%" />
        </Grid>
        <Grid display="flex" flexDirection="column" gap={2} item xs={8}>
          <Typography fontWeight={600} variant="h5">
            {recipe.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid display="flex" flexDirection="column" gap={2} item xs>
              <Box display="flex" gap={1}>
                {recipe.categories?.map(category => (
                  <Chip label={category.name} />
                ))}
              </Box>
              <Box display="flex" flexDirection="column" rowGap={2}>
                {CARD_FIELDS.map(field => (
                  <Typography>
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
                {Array(6)
                  .fill("")
                  .map(() => (
                    <Box component="li">
                      <Typography>
                        {faker.number.int({ min: 1, max: 400 })} of{" "}
                        {faker.lorem.word()}
                      </Typography>
                    </Box>
                  ))}
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
