import { SqlContext } from "@rcp-and-plan/commons";

import { RecipeIngredient } from "@domain/models/recipe/aggregates/RecipeIngredient";
import { Recipe } from "@domain/models/recipe/Recipe";

export interface IRecipeRepository {
  /**
   * Returns an instance of the Database context
   */
  get unitOfWork(): SqlContext;

  /**
   * Requests an insertion for the new entity
   * @param entity Recipe domain entity
   */
  create(entity: Recipe): void;

  /**
   * Requests an insertion for the a new ingredient entry to the recipe entity
   * @param entity Recipe domain entity
   */
  addIngredient(entity: Recipe, ingredient: RecipeIngredient): void;
}
