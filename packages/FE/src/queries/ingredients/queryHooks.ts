import { useSuspenseApiQuery } from "@/middleware/api";

import { getIngredientsKeys } from "./keys";
import { getIngredientsOptions } from "./options";

export const useSuspenseGetIngredients = () => {
  const { key } = getIngredientsKeys();

  return useSuspenseApiQuery(key, getIngredientsOptions());
};
