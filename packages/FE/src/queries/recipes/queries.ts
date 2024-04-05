import { Api } from "@/lib/api";
import { useApiQuery } from "@/middleware/api";
import { RecipeList } from "@/types/recipe";

import { getRecipesKeys } from "./keys";

export const useGetRecipes = () => {
  const { key, queryKey } = getRecipesKeys();
  const getRecipes = async () => {
    return await new Api().get<RecipeList>("recipes");
  };
  return useApiQuery(key, queryKey, getRecipes);
};
