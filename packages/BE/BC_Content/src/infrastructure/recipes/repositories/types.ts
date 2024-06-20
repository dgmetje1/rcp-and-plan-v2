import { SqlContext } from "@rcp-and-plan/commons";

import { RecipeIngredient } from "@domain/models/recipe/aggregates/RecipeIngredient";
import { RecipeKitchenware } from "@domain/models/recipe/aggregates/RecipeKitchenware";
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
   * @param ingredient Ingredient aggregate
   */
  addIngredient(entity: Recipe, ingredient: RecipeIngredient): void;

  /**
   * Requests an insertion for the a new ingredient entry to the recipe entity
   * @param entity Recipe domain entity
   * @param kitchenware Ingredient aggregate

   */
  addKitchenware(entity: Recipe, kitchenware: RecipeKitchenware): void;
}
