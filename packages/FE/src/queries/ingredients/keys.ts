export const API_ACTION_BASE = "ingredients";

export const getIngredientsKeys = () => {
  const queryKey = [API_ACTION_BASE, "getIngredients"];
  const key = queryKey.join("/");

  return { key, queryKey };
};
