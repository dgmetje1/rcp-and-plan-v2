import { EntityNotFoundError } from "@rcp-and-plan/commons";

import { Unit } from "@domain/models/unit/Unit";
import { Unit as UnitDB } from "@infrastructure/models";

import { IUnitQueries } from "./types";

export class UnitQueries implements IUnitQueries {
  /**
   * @inheritdoc
   */
  async getEntity(id: string): Promise<Unit> {
    const units = await UnitDB.findAll({ where: { id } });
    if (!units.length) throw new EntityNotFoundError("Unit not found", "Unit", [{ id }]);

    return Unit.get(
      units[0]!.id,
      units.map(({ language, name, singular_name, short_name }) => ({
        language,
        name,
        singularName: singular_name,
        shortName: short_name,
      })),
    );
  }
}
