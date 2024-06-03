import { UniqueEntityID } from "DDD/UniqueEntityID";

export class DomainEvent<T = object> {
  constructor(
    public dateTimeOccurred: Date,
    public entityId: UniqueEntityID,
    public data: T,
  ) {}
}
