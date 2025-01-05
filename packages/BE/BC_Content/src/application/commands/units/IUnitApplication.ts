import { UnitCreateRequest } from "@dtos/index";

export interface IUnitApplication {
  /**
   * Creates a new unit with the information of request
   * @param request Data to create a Unit
   */
  createUnit(request: UnitCreateRequest): Promise<void>;
}
