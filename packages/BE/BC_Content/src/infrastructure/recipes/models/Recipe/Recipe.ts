import { DataTypes } from "sequelize";
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Category } from "../Category";
import { Ingredient } from "../Ingredient";
import { RecipeCategory } from "../RecipeCategory";
import { RecipeIngredient } from "../RecipeIngredient";
import { RecipeAttributes, RecipeCreationAttributes } from "./types";

@Table({ tableName: "recipes" })
export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  declare id: number;

  @Column(DataTypes.STRING)
  declare title: string;

  @Column(DataTypes.TEXT)
  declare description: string;

  @Column(DataTypes.STRING)
  declare thumbnail_url: string;

  @Column(DataTypes.STRING)
  declare header_img: string;

  @Column(DataTypes.STRING)
  declare unique_id: string;

  @Column(DataTypes.STRING(3))
  declare language: string;

  @Column(DataTypes.INTEGER)
  declare difficulty: number;

  @Column(DataTypes.INTEGER)
  declare time: number;

  @Column(DataTypes.INTEGER)
  declare portions: number;

  @Column(DataTypes.TINYINT)
  declare visibility: number;

  @Column(DataTypes.STRING)
  declare author: string;

  @Column(DataTypes.DATE)
  declare publication_date: Date;

  @BelongsToMany(() => Category, () => RecipeCategory)
  declare categories: Category[];

  @BelongsToMany(() => Ingredient, () => RecipeIngredient)
  declare ingredients: Array<
    Ingredient & { RecipeIngredient: RecipeIngredient }
  >;
}
