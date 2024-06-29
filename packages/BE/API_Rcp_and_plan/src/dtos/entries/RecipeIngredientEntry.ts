export type RecipeIngredientEntry = {
  id: string;
  unitId: string;
  quantity: number;
  isOptional: boolean;
};

export type RecipeIngredientsEntry = Array<RecipeIngredientEntry>;
