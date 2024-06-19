export type RecipeIngredientRequest = {
  id: string;
  unitId: string;
  quantity: number;
  isOptional: boolean;
};

export type RecipeIngredientsRequest = Array<RecipeIngredientRequest>;
