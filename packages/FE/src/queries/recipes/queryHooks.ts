import { useApiQuery, useSuspenseApiQuery } from "@/middleware/api";

import { getDailyRecipeKeys, getRecipeKeys, getRecipesKeys } from "./keys";
import { getRecipeOptions } from "./options";
import { getDailyRecipe, getRecipe, getRecipes } from "./queries";
import { RecipeListQueryFilters } from "./types";

export const useGetRecipes = (filters: RecipeListQueryFilters = {}) => {
  const { key, queryKey } = getRecipesKeys(filters);

  return useApiQuery(key, queryKey, () => getRecipes(filters));
};

export const useGetRecipe = (id: string) => {
  const { key, queryKey } = getRecipeKeys(id);

  return useApiQuery(key, queryKey, () => getRecipe(id));
};

export const useGetDailyRecipe = () => {
  const { key, queryKey } = getDailyRecipeKeys();

  return useApiQuery(key, queryKey, () => getDailyRecipe());
};

export const useSuspenseGetRecipe = (id: string) => {
  const queryOptions = getRecipeOptions(id);
  const { key } = getRecipeKeys(id);

  return useSuspenseApiQuery(key, queryOptions);
};
