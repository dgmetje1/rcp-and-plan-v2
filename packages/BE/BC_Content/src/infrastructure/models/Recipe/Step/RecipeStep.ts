import { DataTypes } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Recipe } from "..";
import { RecipeStepAttributes, RecipeStepCreationAttributes } from "./types";

@Table({ tableName: "recipes_steps" })
export class RecipeStep extends Model<RecipeStepAttributes, RecipeStepCreationAttributes> {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => Recipe)
  @PrimaryKey
  @Column
  declare recipe_id: string;

  @Column(DataType.INTEGER)
  declare number: number;

  @Column
  declare title: string;

  @Column
  declare body: string;

  @Column(DataTypes.STRING)
  declare media_1: string | null;

  @Column(DataTypes.STRING)
  declare media_2: string | null;

  @Column(DataTypes.STRING)
  declare media_3: string | null;

  @BelongsTo(() => Recipe, "recipe_id")
  declare recipe: Recipe;
}
