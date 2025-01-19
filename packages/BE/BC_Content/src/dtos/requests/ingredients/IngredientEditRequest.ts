import { IngredientLanguageRequest } from "./IngredientLanguageRequest";

export type IngredientEditRequest = {
  id: string;
  content: Record<string, IngredientLanguageRequest>;
};
