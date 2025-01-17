import { SqlContext } from "@rcp-and-plan/commons";

import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { Languages } from "@global_types/languages";

export interface IIngredientRepository {
  /**
   * Returns an instance of the Database context
   */
  get unitOfWork(): SqlContext;

  /**
   * Requests an insertion for the new entity
   * @param entity Ingredient domain entity
   */
  create(entity: Ingredient): void;

  /**
   * Requests a modification for the entity
   * @param entity Ingredient domain entity
   * @param presentLanguageEntries List of language entries already present in the persistence
   */
  edit(entity: Ingredient, presentLanguageEntries: Languages[]): void;

  /**
   * Requests a deletion for the entity
   * @param entity Ingredient domain entity
   */
  delete(entity: Ingredient): void;
}
