import { queryOptions } from "@tanstack/react-query";

import { getIngredientsKeys } from "./keys";
import { getIngredients } from "./queries";

export const getIngredientsOptions = () => {
  const { queryKey } = getIngredientsKeys();
  return queryOptions({
    queryKey,
    queryFn: () => getIngredients(),
  });
};
