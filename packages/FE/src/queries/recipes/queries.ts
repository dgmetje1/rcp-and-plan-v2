import { Api } from "@/lib/api";
import { DailyRecipe, Recipe, RecipeList } from "@/types/recipe";

export const getRecipes = () => new Api().get<RecipeList>("recipes");
export const getRecipe = (id: string) => new Api().get<Recipe>(`recipes/${id}`);
export const getDailyRecipe = () => new Api().get<DailyRecipe>("recipes/daily");
