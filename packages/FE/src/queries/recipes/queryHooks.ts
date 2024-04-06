import { useApiQuery, useSuspenseApiQuery } from "@/middleware/api";

import { getRecipeKeys, getRecipesKeys } from "./keys";
import { getRecipeOptions } from "./options";
import { getRecipe, getRecipes } from "./queries";

export const useGetRecipes = () => {
  const { key, queryKey } = getRecipesKeys();

  return useApiQuery(key, queryKey, () => getRecipes());
};

export const useGetRecipe = (id: string) => {
  const { key, queryKey } = getRecipeKeys(id);

  return useApiQuery(key, queryKey, () => getRecipe(id));
};

export const useSuspenseGetRecipe = (id: string) => {
  const queryOptions = getRecipeOptions(id);
  const { key } = getRecipeKeys(id);

  return useSuspenseApiQuery(key, queryOptions);
};
