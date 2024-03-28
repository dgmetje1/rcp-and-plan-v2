import { Api } from "@/lib/api";
import { useApiQuery } from "@/middleware/api";

import { getRecipesKeys } from "./keys";

export const useGetRecipes = () => {
  const { key, queryKey } = getRecipesKeys();
  const getRecipes = async () => {
    return await new Api().get(
      "api/categories/recommendations/recipes?lang=ca",
    );
  };
  return useApiQuery(key, queryKey, getRecipes);
};
