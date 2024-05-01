import { Optional } from "sequelize";

import { Recipe } from "../Recipe";

export interface RecipeStepAttributes {
  recipe_id: number;
  id: number;
  number: number;
  title: string;
  body: string;
  media_1: string | null;
  media_2: string | null;
  media_3: string | null;
  recipe: Recipe;
}

export interface RecipeStepCreationAttributes
  extends Optional<RecipeStepAttributes, "id"> {}
