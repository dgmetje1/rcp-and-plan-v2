export interface RecipeIngredientAttributes {
  recipe_id: string;
  ingredient_id: string;
  unit_id: string;
  quantity: number;
  is_optional: boolean;
}
