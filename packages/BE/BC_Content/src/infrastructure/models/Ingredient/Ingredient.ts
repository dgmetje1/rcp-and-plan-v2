import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Recipe } from "../Recipe";
import { RecipeIngredient } from "../RecipeIngredient";
import { IngredientAttributes, IngredientCreationAttributes } from "./types";

@Table({ tableName: "ingredients", paranoid: true })
export class Ingredient extends Model<IngredientAttributes, IngredientCreationAttributes> {
  @PrimaryKey
  @Column(DataTypes.STRING)
  declare id: string;

  @PrimaryKey
  @Column(DataTypes.STRING)
  declare language: string;

  @Column(DataTypes.STRING)
  declare name: string;

  @Column(DataTypes.STRING)
  declare singular_name: string;

  @BelongsToMany(() => Recipe, () => RecipeIngredient)
  declare recipes: Recipe[];
}
