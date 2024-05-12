import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Recipe } from "../Recipe";
import { RecipePublicationAttributes } from "./types";

@Table({ tableName: "recipes_publications" })
export class RecipePublication extends Model<RecipePublicationAttributes> {
  @PrimaryKey
  @ForeignKey(() => Recipe)
  @Column(DataTypes.STRING)
  declare id: string;

  @PrimaryKey
  @Column(DataTypes.STRING(3))
  declare language: string;

  @Column(DataTypes.STRING)
  declare title: string;

  @Column(DataTypes.TEXT)
  declare description: string;

  @BelongsTo(() => Recipe, "id")
  declare recipe: Recipe;
}
