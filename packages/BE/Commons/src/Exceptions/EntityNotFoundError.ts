export class EntityNotFoundError extends Error {
  entityName: string;
  params: Array<object>;
  constructor(message: string, entityName: string, params: Array<object> = []) {
    super(message);
    this.entityName = entityName;
    this.params = params;
  }
}
