import { Optional } from "sequelize";

import { Recipe } from "../Recipe";

export interface CategoryAttributes {
  id: string;
  name: string;
  description: string;
  language: string;
  recipes: Recipe[];
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> {}
