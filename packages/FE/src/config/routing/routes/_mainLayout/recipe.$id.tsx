import { createFileRoute } from "@tanstack/react-router";

import Loader from "@/components/common/Loader";
import RecipeDetail from "@/pages/RecipeDetail";
import { getRecipeOptions } from "@/queries/recipes/options";

export const Route = createFileRoute("/_mainLayout/recipe/$id")({
  loader: ({ context: { queryClient }, params: { id } }) => {
    return queryClient.ensureQueryData(getRecipeOptions(id));
  },
  component: RecipeDetail,
  pendingComponent: Loader,
  pendingMs: 1000,
});
