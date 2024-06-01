export type IngredientCreateRequest = Record<string, IngredientLanguageCreateRequest>;

export type IngredientLanguageCreateRequest = {
  name: string;
  singularName: string;
};
