import { IngredientCreateRequest, IngredientEditRequest } from "@dtos/index";

export interface IIngredientApplication {
  /**
   * Creates a new ingredient with the information of request
   * @param request Data to create a Ingredient
   */
  createIngredient(request: IngredientCreateRequest): Promise<void>;

  /**
   * Edits ingredient's information
   * @param request Data to edit a Ingredient
   */
  editIngredient(request: IngredientEditRequest): Promise<void>;

  /**
   * Removes the ingredient
   * @param id Ingredient identifier
   */
  deleteIngredient(id: string): Promise<void>;
}
