import { UnitCreateRequest, UnitEditRequest } from "@dtos/index";

export interface IUnitApplication {
  /**
   * Creates a new unit with the information of request
   * @param request Data to create a Unit
   */
  createUnit(request: UnitCreateRequest): Promise<void>;
  /**
   * Edits unit's information
   * @param request Data to edit a Unit
   */
  editUnit(request: UnitEditRequest): Promise<void>;
}
