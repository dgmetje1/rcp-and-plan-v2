import { Entity } from "./Entity";
import { DomainEvent } from "./events/DomainEvent";
import { UniqueEntityID } from "./UniqueEntityID";

export abstract class AggregateRoot extends Entity {
  private _domainEvents: DomainEvent<unknown>[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  get domainEvents(): DomainEvent<unknown>[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent<unknown>): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
