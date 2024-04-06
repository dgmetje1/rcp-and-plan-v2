import { queryOptions } from "@tanstack/react-query";

import { getRecipeKeys } from "./keys";
import { getRecipe } from "./queries";

export const getRecipeOptions = (id: string) => {
  const { queryKey } = getRecipeKeys(id);
  return queryOptions({
    queryKey,
    queryFn: () => getRecipe(id),
  });
};
