import { RecipeListQueryFilters } from "./types";

export const API_ACTION_BASE = "recipes";

export const getRecipesKeys = (filters: RecipeListQueryFilters = {}) => {
  const baseQueryKey = [API_ACTION_BASE, "getRecipes"];
  const key = baseQueryKey.join("/");

  const queryKey = [...baseQueryKey];
  if (filters.categoryId) queryKey.push(filters.categoryId.toString());

  return { key, queryKey };
};
export const getDailyRecipeKeys = () => {
  const queryKey = [API_ACTION_BASE, "getDailyRecipe"];
  const key = queryKey.join("/");

  return { key, queryKey };
};
export const getRecipeKeys = (id: string) => {
  const baseQueryKey = [API_ACTION_BASE, "getRecipe"];
  const key = baseQueryKey.join("/");
  const queryKey = [...baseQueryKey, id];

  return { key, queryKey };
};
