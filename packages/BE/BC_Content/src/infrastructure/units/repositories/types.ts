import { SqlContext } from "@rcp-and-plan/commons";

import { Unit } from "@domain/models/unit/Unit";

export interface IUnitRepository {
  /**
   * Returns an instance of the Database context
   */
  get unitOfWork(): SqlContext;

  /**
   * Requests an insertion for the new entity
   * @param entity Unit domain entity
   */
  create(entity: Unit): void;

  /**
   * Requests a modification for the entity
   * @param entity Unit domain entity
   */
  edit(entity: Unit): void;

  /**
   * Requests a deletion for the entity
   * @param entity Unit domain entity
   */
  delete(entity: Unit): void;
}
