import { IngredientLanguageRequest } from "./IngredientLanguageRequest";

export type IngredientCreateRequest = {
  content: Record<string, IngredientLanguageRequest>;
};
