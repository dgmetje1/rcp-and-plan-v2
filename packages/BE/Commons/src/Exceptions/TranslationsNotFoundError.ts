import { Exception } from "./Exception";

export const TranslationsNotFoundErrorType = "translations-not-found";

export class TranslationsNotFoundError extends Exception {
  language: string;
  params: Array<object>;
  constructor(message: string, language: string, params: Array<object> = []) {
    super(message, TranslationsNotFoundErrorType);
    this.language = language;
    this.params = params;
  }
}
