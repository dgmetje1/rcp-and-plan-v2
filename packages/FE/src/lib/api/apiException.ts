export class ApiException extends Error {
  public errorCode: string;
  constructor(code: string, message: string) {
    super(message);
    this.errorCode = code;
  }
}
