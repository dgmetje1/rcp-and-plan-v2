import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Ingredient } from "../Ingredient/Ingredient";
import { Recipe } from "../Recipe";
import { Unit } from "../Unit";
import { RecipeIngredientAttributes, RecipeIngredientCreationAttributes } from "./types";

@Table({ tableName: "recipes_ingredients", timestamps: false })
export class RecipeIngredient extends Model<RecipeIngredientAttributes, RecipeIngredientCreationAttributes> {
  @ForeignKey(() => Recipe)
  @Column
  declare recipe_id: string;

  @BelongsTo(() => Recipe)
  declare recipe: Recipe;

  @ForeignKey(() => Ingredient)
  @Column
  declare ingredient_id: string;

  @BelongsTo(() => Ingredient)
  declare ingredient: Ingredient;

  @ForeignKey(() => Unit)
  @Column
  declare unit_id: string;

  @BelongsTo(() => Unit)
  declare unit: Unit;

  @Column(DataType.FLOAT)
  declare quantity: number;

  @Column
  declare is_optional: boolean;
}
