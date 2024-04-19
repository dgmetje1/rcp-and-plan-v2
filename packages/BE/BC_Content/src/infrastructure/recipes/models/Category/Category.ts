import { DataTypes } from "sequelize";
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Recipe } from "../Recipe";
import { RecipeCategory } from "../RecipeCategory";
import { CategoryAttributes, CategoryCreationAttributes } from "./types";

@Table({ tableName: "categories" })
export class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  declare id: number;

  @Column(DataTypes.STRING)
  declare name: string;

  @Column(DataTypes.TEXT)
  declare description: string;

  @Column(DataTypes.STRING)
  declare language: string;

  @BelongsToMany(() => Recipe, () => RecipeCategory)
  declare recipes: Recipe[];
}
