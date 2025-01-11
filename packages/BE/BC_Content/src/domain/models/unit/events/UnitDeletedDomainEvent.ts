import { DomainEvent, UniqueEntityID } from "@rcp-and-plan/commons";

import { Unit } from "../Unit";

export class UnitDeletedDomainEvent extends DomainEvent<Unit> {
  constructor(unitId: UniqueEntityID, unit: Unit) {
    super(new Date(), unitId, unit);
  }
}
