import { Optional } from "sequelize";

import { Recipe } from "../Recipe";

export interface IngredientAttributes {
  id: number;
  name: string;
  singular_name: string;
  language: string;
  recipes: Recipe[];
}

export interface IngredientCreationAttributes
  extends Optional<IngredientAttributes, "id"> {}
