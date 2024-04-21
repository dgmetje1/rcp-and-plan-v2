import Typography from "@mui/material/Typography";

import { RecipeDetailRoute } from "@/config/routing";
import { useSuspenseGetRecipe } from "@/queries/recipes";

import RecipeDetailPageCard from "../RecipeDetailPageCard";

const RecipeDetailPageAuthorCard = () => {
  const { id } = RecipeDetailRoute.useParams();
  const { data: recipe } = useSuspenseGetRecipe(id);

  return (
    <RecipeDetailPageCard>
      <Typography fontWeight={600} variant="h5">
        Author
      </Typography>
      <Typography variant="body1">{recipe.author}</Typography>
    </RecipeDetailPageCard>
  );
};
export default RecipeDetailPageAuthorCard;
