import { Languages } from "@global_types/languages";

export type UnitsListItemTranslatableContentResponse = {
  name: string;
  singularName: string;
  shortName: string;
};

export type UnitsListItemResponse = {
  id: string;
  isVisible: boolean;
  content: Partial<Record<Languages, UnitsListItemTranslatableContentResponse>>;
};

export type UnitsListResponse = Array<UnitsListItemResponse>;
