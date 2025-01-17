import { IngredientLanguageRequest } from "./IngredientLanguageRequest";

export type IngredientEditRequest = {
  id: string;
  isVisible: boolean;
  content: Record<string, IngredientLanguageRequest>;
};
