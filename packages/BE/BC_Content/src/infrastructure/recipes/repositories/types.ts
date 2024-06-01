import { SqlContext } from "@rcp-and-plan/commons";

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
}
