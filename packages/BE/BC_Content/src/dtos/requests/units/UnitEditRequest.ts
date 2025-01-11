import { UnitLanguageRequest } from "./UnitLanguageRequest";

export type UnitEditRequest = {
  id: string;
  isVisible: boolean;
  content: Record<string, UnitLanguageRequest>;
};
