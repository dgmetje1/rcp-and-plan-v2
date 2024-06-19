import { Optional } from "sequelize";

import { Ingredient } from "../Ingredient";
import { Recipe } from "../Recipe/Recipe";
import { Unit } from "../Unit";

export interface RecipeIngredientAttributes {
  recipe_id: string;
  recipe: Recipe;
  ingredient_id: string;
  ingredient: Ingredient;
  unit_id: string;
  unit: Unit;
  quantity: number;
  is_optional: boolean;
}

export interface RecipeIngredientCreationAttributes
  extends Optional<RecipeIngredientAttributes, "ingredient" | "recipe" | "unit"> {}
