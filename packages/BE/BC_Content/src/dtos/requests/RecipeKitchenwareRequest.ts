export type RecipeToolRequest = {
  id: string;
  quantity: number;
};

export type RecipeKitchenwareRequest = Array<RecipeToolRequest>;
