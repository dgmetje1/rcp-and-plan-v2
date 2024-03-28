export const API_ACTION_BASE = "recipes";

export const getRecipesKeys = () => {
  const queryKey = [API_ACTION_BASE, "getRecipes"];
  const key = queryKey.join("/");

  return { key, queryKey };
};
