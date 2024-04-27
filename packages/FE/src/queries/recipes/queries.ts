import { Api } from "@/lib/api";
import { DailyRecipe, Recipe, RecipeList } from "@/types/recipe";

import { RecipeListQueryFilters } from "./types";

export const getRecipes = ({ categoryId }: RecipeListQueryFilters) => {
  return new Api().get<RecipeList>("recipes", {
    params: {
      category: categoryId,
    },
  });
};
export const getRecipe = (id: string) => new Api().get<Recipe>(`recipes/${id}`);
export const getDailyRecipe = () => new Api().get<DailyRecipe>("recipes/daily");
