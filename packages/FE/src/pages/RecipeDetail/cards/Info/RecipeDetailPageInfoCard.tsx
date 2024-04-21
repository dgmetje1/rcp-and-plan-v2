import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import { RecipeDetailRoute } from "@/config/routing";
import { printTime } from "@/lib/parsers/time";
import { useSuspenseGetRecipe } from "@/queries/recipes";
import { RecipeDifficulty } from "@/types/recipe";

import RecipeDetailPageCard from "../RecipeDetailPageCard";

const RecipeDetailPageInfoCard = () => {
  const { id } = RecipeDetailRoute.useParams();
  const { data: recipe } = useSuspenseGetRecipe(id);

  return (
    <RecipeDetailPageCard>
      <Typography fontWeight={600} variant="h5">
        Recipe information
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {recipe.categories.map(category => (
          <Chip key={category.id} label={category.name} />
        ))}
      </Box>
      <Box alignItems="center" display="inline-flex" gap={1}>
        <Typography color="grey.800" fontWeight={600} variant="subtitle1">
          Difficulty:
        </Typography>
        <Typography variant="body1">
          {RecipeDifficulty[recipe.difficulty].toLocaleLowerCase()}
        </Typography>
      </Box>
      <Box alignItems="center" display="inline-flex" gap={1}>
        <Typography color="grey.800" fontWeight={600} variant="subtitle1">
          Time:
        </Typography>
        <Typography variant="body1">{printTime(recipe.time)}</Typography>
      </Box>
      <Box alignItems="center" display="inline-flex" gap={1}>
        <Typography color="grey.800" fontWeight={600} variant="subtitle1">
          Portions:
        </Typography>
        <Typography variant="body1">{recipe.portions}</Typography>
      </Box>
    </RecipeDetailPageCard>
  );
};

export default RecipeDetailPageInfoCard;
