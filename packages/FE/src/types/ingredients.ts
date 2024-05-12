export type Ingredient = {
  id: string;
  name: string;
  singularName: string;
  quantity: number;
  optional: boolean;
  units: IngredientUnits;
};

export type IngredientUnits = {
  id: string;
  name: string;
  shortName: string;
};
