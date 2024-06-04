import EventEmitter from "events";
import { DomainEvent } from "./DomainEvent";

export class EventDispatcher extends EventEmitter {
  static instance: EventDispatcher;

  static getInstance() {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher();
    }
    return EventDispatcher.instance;
  }

  public publish<T = unknown>(event: DomainEvent<T>) {
    this.emit(event.constructor.name, event);
  }

  subscribe<T = unknown>(event: string, callback: (event: DomainEvent<T>) => void) {
    this.on(event, callback);
  }

  private constructor() {
    // Prevent creating new instances using the 'new' keyword
    if (EventDispatcher.instance) {
      throw new Error("EventDispatcher class cannot be instantiated");
    }
    super();
  }
}
