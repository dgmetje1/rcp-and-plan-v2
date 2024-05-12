import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Recipe } from "../Recipe";
import { RecipeCategory } from "../RecipeCategory";
import { CategoryAttributes, CategoryCreationAttributes } from "./types";

@Table({ tableName: "categories" })
export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
  @PrimaryKey
  @Column(DataTypes.STRING)
  declare id: string;

  @PrimaryKey
  @Column(DataTypes.STRING)
  declare language: string;

  @Column(DataTypes.STRING)
  declare name: string;

  @Column(DataTypes.TEXT)
  declare description: string;

  @BelongsToMany(() => Recipe, () => RecipeCategory)
  declare recipes: Recipe[];
}
