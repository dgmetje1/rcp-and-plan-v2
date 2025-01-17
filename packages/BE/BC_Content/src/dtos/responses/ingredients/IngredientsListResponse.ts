import { Languages } from "@global_types/languages";

export type IngredientsListItemTranslatableContentResponse = {
  name: string;
  singularName: string;
};

export type IngredientsListItemResponse = {
  id: string;
  content: Partial<Record<Languages, IngredientsListItemTranslatableContentResponse>>;
};

export type IngredientsListResponse = Array<IngredientsListItemResponse>;
