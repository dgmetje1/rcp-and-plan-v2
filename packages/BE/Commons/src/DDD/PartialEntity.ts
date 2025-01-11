import { Entity } from "./Entity";
import { UniqueEntityID } from "./UniqueEntityID";

export class PartialEntity extends Entity {
  constructor(id: string | number) {
    super(new UniqueEntityID(id));
  }

  public get id() {
    return this._id.toString();
  }
}
