import { Languages } from "@global_types/languages";

export type IngredientsListItemTranslatableContentOutput = {
  name: string;
  singularName: string;
};

export type IngredientsListItemOutput = {
  id: string;
  content: Partial<Record<Languages, IngredientsListItemTranslatableContentOutput>>;
};

export type IngredientsListOutput = Array<IngredientsListItemOutput>;
