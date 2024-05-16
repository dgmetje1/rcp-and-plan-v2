import { Exception } from "./Exception";

export const EntityNotFoundErrorType = "entity-not-found";

export class EntityNotFoundError extends Exception {
  entityName: string;
  params: Array<object>;
  constructor(message: string, entityName: string, params: Array<object> = []) {
    super(message, EntityNotFoundErrorType);
    this.entityName = entityName;
    this.params = params;
  }
}
