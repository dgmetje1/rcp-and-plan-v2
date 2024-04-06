import CircularProgress from "@mui/material/CircularProgress";
import { createFileRoute } from "@tanstack/react-router";

import RecipeDetail from "@/pages/RecipeDetail";
import { getRecipeOptions } from "@/queries/recipes/options";

export const Route = createFileRoute("/_mainLayout/recipe/$id")({
  loader: ({ context: { queryClient }, params: { id } }) => {
    return queryClient.ensureQueryData(getRecipeOptions(id));
  },
  component: RecipeDetail,
  pendingComponent: () => <CircularProgress />,
  pendingMs: 1000,
});
