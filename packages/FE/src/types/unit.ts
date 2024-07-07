import { Language } from "./user";

export type Unit = {
  id: string;
  content: Record<Language, UnitTranslatableContent>;
  isVisible: boolean;
};

export type UnitTranslatableContent = { name: string; singularName: string; shortName: string };

export type UnitsDTO = Array<Unit>;
