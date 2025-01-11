import { UnitLanguageEntry } from "./UnitLanguageEntry";

export type UnitCreateEntry = {
  isVisible: boolean;
  content: Record<string, UnitLanguageEntry>;
};
