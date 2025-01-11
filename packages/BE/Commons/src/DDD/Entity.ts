import { UniqueEntityID } from "./UniqueEntityID";

const isEntity = (v: unknown): v is Entity => {
  return v instanceof Entity;
};

export abstract class Entity {
  public static readonly entityName: string = this.constructor.name;
  protected readonly _id: UniqueEntityID;

  constructor(id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
  }

  public equals(object?: Entity): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
