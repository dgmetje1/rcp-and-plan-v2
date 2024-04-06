export const API_ACTION_BASE = "recipes";

export const getRecipesKeys = () => {
  const queryKey = [API_ACTION_BASE, "getRecipes"];
  const key = queryKey.join("/");

  return { key, queryKey };
};
export const getRecipeKeys = (id: string) => {
  const baseQueryKey = [API_ACTION_BASE, "getRecipe"];
  const key = baseQueryKey.join("/");
  const queryKey = [...baseQueryKey, id];

  return { key, queryKey };
};
