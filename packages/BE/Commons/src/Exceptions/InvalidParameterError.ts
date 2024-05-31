import { Exception } from "./Exception";

export const InvalidParameterErrorType = "invalid-parameter";

export class InvalidParameterError extends Exception {
  entityName: string;
  params: Array<object>;
  constructor(message: string, entityName: string, params: Array<object> = []) {
    super(message, InvalidParameterErrorType);
    this.entityName = entityName;
    this.params = params;
  }
}
