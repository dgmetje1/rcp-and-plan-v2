import { Token } from "typedi";

import { DomainEvent } from "./DomainEvent";

export const HandlerToken = new Token<IHandle>("handlers");

export interface IHandle {
  initialize(): void;

  subscribe<T extends object>(eventName: string, callback: (event: DomainEvent<T>) => void): void;
}
