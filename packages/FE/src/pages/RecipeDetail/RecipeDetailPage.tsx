import { RecipeDetailRoute } from "@/config/routing";
import { useSuspenseGetRecipe } from "@/queries/recipes";

const RecipeDetailPage = () => {
  const { id } = RecipeDetailRoute.useParams();
  console.log(id);
  const { data: recipe } = useSuspenseGetRecipe(id);
  return recipe.title;
};

export default RecipeDetailPage;
