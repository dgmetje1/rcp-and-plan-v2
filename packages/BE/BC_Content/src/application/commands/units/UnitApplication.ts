import Container, { Service } from "typedi";

import { IUnitQueries, UnitQueries } from "@application/queries/units/IUnitsQueries";
import { IUnitRepository, UnitRepository } from "@domain/models/unit/IUnitRepository";
import { Unit } from "@domain/models/unit/Unit";
import { UnitCreateRequest, UnitEditRequest } from "@dtos/index";

import { IUnitApplication } from "./IUnitApplication";

@Service({ transient: true })
export class UnitApplication implements IUnitApplication {
  /** @inheritdoc */
  public async createUnit(request: UnitCreateRequest): Promise<void> {
    const unit = Unit.create(
      request.isVisible,
      Object.entries(request.content).map(([language, value]) => ({ language, ...value })),
    );
    const repository = Container.get<IUnitRepository>(UnitRepository);

    repository.create(unit);

    await repository.unitOfWork.saveChangesAsync();
  }

  /** @inheritdoc  */
  public async editUnit(request: UnitEditRequest): Promise<void> {
    const unitQueries = Container.get<IUnitQueries>(UnitQueries);
    const unit = await unitQueries.getEntity(request.id);

    unit.edit(
      request.isVisible,
      Object.entries(request.content).map(([language, value]) => ({ language, ...value })),
    );

    const repository = Container.get<IUnitRepository>(UnitRepository);

    repository.edit(unit);

    await repository.unitOfWork.saveChangesAsync();
  }

  /** @inheritdoc */
  public async deleteUnit(id: string): Promise<void> {
    const unitQueries = Container.get<IUnitQueries>(UnitQueries);
    const unit = await unitQueries.getEntity(id);

    unit.delete();

    const repository = Container.get<IUnitRepository>(UnitRepository);

    repository.delete(unit);

    await repository.unitOfWork.saveChangesAsync();
  }
}
