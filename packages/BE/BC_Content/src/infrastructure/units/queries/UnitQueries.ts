import { EntityNotFoundError } from "@rcp-and-plan/commons";
import { Service } from "typedi";

import { Unit } from "@domain/models/unit/Unit";
import { UnitsListResponse } from "@dtos/index";
import { Unit as UnitDB } from "@infrastructure/models";

import { IUnitQueries } from "./types";

@Service()
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

  /**
   * @inheritdoc
   */
  async getData(): Promise<UnitsListResponse> {
    const units = await UnitDB.findAll();

    return units.reduce<UnitsListResponse>((prev, value) => {
      const translatableContent = {
        name: value.name,
        singularName: value.singular_name,
        shortName: value.short_name,
      };
      const unitIndex = prev.findIndex(x => x.id === value.id);
      if (unitIndex === -1)
        return [
          ...prev,
          {
            id: value.id,
            isVisible: value.is_visible,
            content: {
              [value.language]: translatableContent,
            },
          },
        ];

      const unit = prev[unitIndex];
      return [
        ...prev.slice(0, unitIndex),
        { ...unit, content: { ...unit.content, [value.language]: translatableContent } },
        ...prev.slice(unitIndex + 1),
      ];
    }, []);
  }
}
