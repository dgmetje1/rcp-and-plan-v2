import Container, { Service } from "typedi";

import { IUnitRepository, UnitRepository } from "@domain/models/unit/IUnitRepository";
import { Unit } from "@domain/models/unit/Unit";
import { UnitCreateRequest } from "@dtos/index";

import { IUnitApplication } from "./IUnitApplication";

@Service({ transient: true })
export class UnitApplication implements IUnitApplication {
  /**
   * @inheritdoc
   */
  public async createUnit(request: UnitCreateRequest): Promise<void> {
    const unit = Unit.create(
      request.isVisible,
      Object.entries(request.content).map(([language, value]) => ({ language, ...value })),
    );
    const repository = Container.get<IUnitRepository>(UnitRepository);

    repository.create(unit);

    await repository.unitOfWork.saveChangesAsync();
  }
}
