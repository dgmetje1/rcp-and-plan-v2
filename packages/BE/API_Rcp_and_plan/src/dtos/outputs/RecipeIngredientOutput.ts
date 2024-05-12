export type RecipeIngredientOutput = {
  id: string;
  name: string;
  singularName: string;
  quantity: number;
  optional: boolean;
  units: RecipeIngredientUnitOutput;
};

export type RecipeIngredientUnitOutput = {
  id: string;
  name: string;
  shortName: string;
};
