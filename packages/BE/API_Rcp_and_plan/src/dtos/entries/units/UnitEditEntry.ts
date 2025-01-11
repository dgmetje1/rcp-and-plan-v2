import { UnitLanguageEntry } from "./UnitLanguageEntry";

export type UnitEditEntry = {
  id: string;
  isVisible: boolean;
  content: Record<string, UnitLanguageEntry>;
};
