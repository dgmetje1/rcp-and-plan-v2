import { Optional } from "sequelize";

import { Recipe } from "..";
import { RecipeStepContent } from "./Content";

export interface RecipeStepAttributes {
  id: string;
  recipe_id: string;
  number: number;
  media_1: string | null;
  media_2: string | null;
  media_3: string | null;
  recipe: Recipe;
  content: Array<RecipeStepContent>;
}

export interface RecipeStepCreationAttributes extends Optional<RecipeStepAttributes, "id"> {}
