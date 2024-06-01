import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Ingredient } from "../Ingredient/Ingredient";
import { Recipe } from "../Recipe";
import { Unit } from "../Unit";
import { RecipeIngredientAttributes } from "./types";

@Table({ tableName: "recipes_ingredients", timestamps: false })
export class RecipeIngredient extends Model<RecipeIngredientAttributes> {
  @ForeignKey(() => Recipe)
  @Column
  declare recipe_id: string;

  @ForeignKey(() => Ingredient)
  @Column
  declare ingredient_id: string;

  @ForeignKey(() => Unit)
  @Column
  declare unit_id: string;

  @Column(DataType.FLOAT)
  declare quantity: number;

  @Column
  declare is_optional: boolean;
}
