import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { createFileRoute } from "@tanstack/react-router";

import RecipeDetail from "@/pages/RecipeDetail";
import { getRecipeOptions } from "@/queries/recipes/options";

export const Route = createFileRoute("/_mainLayout/recipe/$id")({
  loader: ({ context: { queryClient }, params: { id } }) => {
    return queryClient.ensureQueryData(getRecipeOptions(id));
  },
  component: RecipeDetail,
  pendingComponent: () => (
    <Box
      alignItems="center"
      display="flex"
      flexGrow={1}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <CircularProgress size={64} />
    </Box>
  ),
  pendingMs: 1000,
});
