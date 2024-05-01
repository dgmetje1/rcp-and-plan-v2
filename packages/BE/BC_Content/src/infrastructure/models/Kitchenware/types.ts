import { Optional } from "sequelize";

import { Recipe } from "../Recipe";

export interface KitchenwareAttributes {
  id: number;
  name: string;
  singular_name: string;
  language: string;
  recipes: Recipe[];
}

export interface KitchenwareCreationAttributes
  extends Optional<KitchenwareAttributes, "id"> {}
