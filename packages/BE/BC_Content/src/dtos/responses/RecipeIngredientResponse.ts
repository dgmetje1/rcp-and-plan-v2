export type RecipeIngredientResponse = {
  id: string;
  name: string;
  singularName: string;
  quantity: number;
  optional: boolean;
  units: RecipeIngredientUnitResponse;
};

export type RecipeIngredientUnitResponse = {
  id: string;
  name: string;
  shortName: string;
};
