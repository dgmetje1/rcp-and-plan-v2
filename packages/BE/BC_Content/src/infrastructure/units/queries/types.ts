import { Unit } from "@domain/models/unit/Unit";

export interface IUnitQueries {
  /**
   * Gets the entity identified by id
   * @param id Entity identifier
   */
  getEntity(id: string): Promise<Unit>;
}
