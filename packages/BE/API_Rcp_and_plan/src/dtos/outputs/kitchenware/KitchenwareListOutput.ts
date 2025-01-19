import { Languages } from "@global_types/languages";

export type KitchenwareListItemTranslatableContentOutput = {
  name: string;
  singularName: string;
};

export type KitchenwareListItemOutput = {
  id: string;
  content: Partial<Record<Languages, KitchenwareListItemTranslatableContentOutput>>;
};

export type KitchenwareListOutput = Array<KitchenwareListItemOutput>;
