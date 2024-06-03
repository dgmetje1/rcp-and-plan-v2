import { DomainEvent } from "./DomainEvent";
import { EventDispatcher } from "./EventDispatcher";

export abstract class IHandle {
  subscribe<T extends object>(eventName: string, callback: (event: DomainEvent<T>) => void): void {
    EventDispatcher.getInstance().then(eventDispatcher => {
      eventDispatcher.subscribe(eventName, callback);
    });
  }
}
