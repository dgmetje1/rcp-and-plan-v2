import { RecipeCreateRequest } from "@dtos/requests/RecipeCreateRequest";

export interface IRecipeApplication {
  /**
   * Creates a new recipe with the information contained in request
   * @param request Data to create a Recipe
   */
  createRecipe(request: RecipeCreateRequest): Promise<void>;
}
