import { IngredientLanguageEntry } from "./IngredientLanguageEntry";

export type IngredientEditEntry = {
  id: string;
  isVisible: boolean;
  content: Record<string, IngredientLanguageEntry>;
};
