import { Unit } from "@domain/models/unit/Unit";
import { UnitsListResponse } from "@dtos/index";

export interface IUnitQueries {
  /**
   * Gets the entity identified by id
   * @param id Entity identifier
   */
  getEntity(id: string): Promise<Unit>;
  /**
   * Gets the list of all units
   */
  getData(): Promise<UnitsListResponse>;
}
