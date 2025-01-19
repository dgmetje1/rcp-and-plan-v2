import { DomainEvent, UniqueEntityID } from "@rcp-and-plan/commons";

import { Kitchenware } from "../Kitchenware";

export class KitchenwareMergedDomainEvent extends DomainEvent<Kitchenware> {
  private _otherKitchenware: Kitchenware;

  public get otherKitchenware() {
    return this._otherKitchenware;
  }

  constructor(kitchenwareId: UniqueEntityID, targetKitchenware: Kitchenware, otherKitchenware: Kitchenware) {
    super(new Date(), kitchenwareId, targetKitchenware);
    this._otherKitchenware = otherKitchenware;
  }
}
