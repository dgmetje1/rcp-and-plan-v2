import { RecipeCreateRequest } from "@dtos/requests/RecipeCreateRequest";
import { RecipeIngredientsRequest } from "@dtos/requests/RecipeIngredientRequest";

export interface IRecipeApplication {
  /**
   * Creates a new recipe with the information contained in request
   * @param request Data to create a Recipe
   */
  createRecipe(request: RecipeCreateRequest): Promise<void>;

  /**
   * Adds the specified ingredients to the recipe
   * @param recipeId Recipe identifier
   * @param request Data to add ingredients
   */
  addRecipeIngredients(recipeId: string, request: RecipeIngredientsRequest): Promise<void>;
}
