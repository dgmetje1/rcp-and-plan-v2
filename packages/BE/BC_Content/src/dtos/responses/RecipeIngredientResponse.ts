export type RecipeIngredientResponse = {
  id: number;
  name: string;
  singularName: string;
  quantity: number;
  optional: boolean;
  units: RecipeIngredientUnitResponse;
};

export type RecipeIngredientUnitResponse = {
  id: number;
  name: string;
  shortName: string;
};
