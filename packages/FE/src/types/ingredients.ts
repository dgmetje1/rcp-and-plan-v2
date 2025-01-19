import { Language } from "./user";

export type Ingredient = {
  id: string;
  content: Partial<Record<Language, IngredientTranslatableContent>>;
};

export type IngredientTranslatableContent = { name: string; singularName: string };

export type IngredientsDTO = Ingredient[];

export type IngredientCreateDTO = Omit<Ingredient, "id">;

export type IngredientEditDTO = Ingredient;

export type IngredientMergeDTO = { targetId: Ingredient["id"]; ingredientIds: Array<Ingredient["id"]> };
