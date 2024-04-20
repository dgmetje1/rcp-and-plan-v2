export type Ingredient = {
  id: number;
  name: string;
  singularName: string;
  quantity: number;
  optional: boolean;
  units: IngredientUnits;
};

export type IngredientUnits = {
  id: number;
  name: string;
  shortName: string;
};
