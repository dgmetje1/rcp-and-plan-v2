import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

import { RecipeDetailRoute } from "@/config/routing";
import { printTime } from "@/lib/parsers/time";
import { useSuspenseGetRecipe } from "@/queries/recipes";
import { Recipe } from "@/types/recipe";

import RecipeDetailPageCard from "../RecipeDetailPageCard";

const CARD_FIELDS: {
  key: keyof Recipe;
  getValue: (recipe: Recipe, t: TFunction) => string;
}[] = [
  {
    key: "difficulty",
    getValue: (recipe, t) => t(`recipe.difficulty.${recipe.difficulty}`),
  },
  {
    key: "time",
    getValue: recipe => printTime(recipe.time),
  },
  {
    key: "portions",
    getValue: (recipe: Recipe) => recipe["portions"].toString(),
  },
];

const RecipeDetailPageInfoCard = () => {
  const { t } = useTranslation();
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
      {CARD_FIELDS.map(field => (
        <Box alignItems="center" display="inline-flex" gap={1}>
          <Typography color="grey.800" fontWeight={600} variant="subtitle1">
            {t(`recipe.fields.${field.key}`)}:
          </Typography>
          <Typography variant="body1">{field.getValue(recipe, t)}</Typography>
        </Box>
      ))}
    </RecipeDetailPageCard>
  );
};

export default RecipeDetailPageInfoCard;
