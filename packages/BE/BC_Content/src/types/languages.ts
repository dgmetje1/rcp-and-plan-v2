export enum AvailableLanguages {
  "en",
  "es",
  "fr",
  "ca",
}

export type Languages = keyof typeof AvailableLanguages;

export const DEFAULT_LANGUAGE = "en";
