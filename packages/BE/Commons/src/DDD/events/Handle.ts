import { DomainEvent } from "./DomainEvent";
import { EventDispatcher } from "./EventDispatcher";
import { IHandle } from "./IHandle";

export abstract class Handle implements IHandle {
  abstract initialize(): void;

  subscribe<T extends object>(eventName: string, callback: (event: DomainEvent<T>) => void): void {
    EventDispatcher.getInstance().subscribe(eventName, callback);
  }
}
