export type RecipeIngredientOutput = {
  id: number;
  name: string;
  singularName: string;
  quantity: number;
  optional: boolean;
  units: RecipeIngredientUnitOutput;
};

export type RecipeIngredientUnitOutput = {
  id: number;
  name: string;
  shortName: string;
};
