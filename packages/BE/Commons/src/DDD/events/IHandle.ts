import { DomainEvent } from "./DomainEvent";
import { EventDispatcher } from "./EventDispatcher";

export class IHandle {
  subscribe<T extends object>(eventName: string, callback: (event: DomainEvent<T>) => void): void {
    EventDispatcher.getInstance().subscribe(eventName, callback);
  }
}
