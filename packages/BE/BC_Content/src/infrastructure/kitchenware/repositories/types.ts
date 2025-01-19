import { SqlContext } from "@rcp-and-plan/commons";

import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";
import { Languages } from "@global_types/languages";

export interface IKitchenwareRepository {
  /**
   * Returns an instance of the Database context
   */
  get unitOfWork(): SqlContext;

  /**
   * Requests an insertion for the new entity
   * @param entity Kitchenware domain entity
   */
  create(entity: Kitchenware): void;

  /**
   * Requests a modification for the entity
   * @param entity Kitchenware domain entity
   * @param presentLanguageEntries List of language entries already present in the persistence
   */
  edit(entity: Kitchenware, presentLanguageEntries: Languages[]): void;

  /**
   * Requests a deletion for the entity
   * @param entity Kitchenware domain entity
   */
  delete(entity: Kitchenware): void;
}
