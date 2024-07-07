import { Languages } from "@global_types/languages";

export type UnitsListItemTranslatableContentOutput = {
  name: string;
  singularName: string;
  shortName: string;
};

export type UnitsListItemOutput = {
  id: string;
  isVisible: boolean;
  content: Partial<Record<Languages, UnitsListItemTranslatableContentOutput>>;
};

export type UnitsListOutput = Array<UnitsListItemOutput>;
