import { UnitLanguageRequest } from "./UnitLanguageRequest";

export type UnitCreateRequest = {
  isVisible: boolean;
  content: Record<string, UnitLanguageRequest>;
};
