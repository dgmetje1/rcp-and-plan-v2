export type KitchenwareCreateRequest = Record<string, KitchenwareLanguageCreateRequest>;

export type KitchenwareLanguageCreateRequest = {
  name: string;
  singularName: string;
};
