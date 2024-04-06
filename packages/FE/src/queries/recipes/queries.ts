import { Api } from "@/lib/api";
import { Recipe, RecipeList } from "@/types/recipe";

export const getRecipes = () => new Api().get<RecipeList>("recipes");
export const getRecipe = (id: string) => new Api().get<Recipe>(`recipes/${id}`);
