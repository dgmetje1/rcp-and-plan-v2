import { Languages } from "@global_types/languages";

export type KitchenwareListItemTranslatableContentResponse = {
  name: string;
  singularName: string;
};

export type KitchenwareListItemResponse = {
  id: string;
  content: Partial<Record<Languages, KitchenwareListItemTranslatableContentResponse>>;
};

export type KitchenwareListResponse = Array<KitchenwareListItemResponse>;
