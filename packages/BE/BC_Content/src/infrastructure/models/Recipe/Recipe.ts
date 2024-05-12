import { DataTypes } from "sequelize";
import { BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Category } from "../Category";
import { Ingredient } from "../Ingredient";
import { Kitchenware } from "../Kitchenware";
import { RecipeCategory } from "../RecipeCategory";
import { RecipeIngredient } from "../RecipeIngredient";
import { RecipeKitchenware } from "../RecipeKitchenware";
import { RecipePublication } from "./Publication";
import { RecipeStep } from "./Step";
import { RecipeAttributes, RecipeCreationAttributes } from "./types";

@Table({ tableName: "recipes" })
export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> {
  @PrimaryKey
  @Column(DataTypes.STRING)
  declare id: string;

  @Column(DataTypes.STRING)
  declare thumbnail_url: string;

  @Column(DataTypes.STRING)
  declare header_img: string;

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

  @HasMany(() => RecipePublication)
  declare publications: Array<RecipePublication>;

  @BelongsToMany(() => Category, () => RecipeCategory)
  declare categories: Category[];

  @BelongsToMany(() => Ingredient, () => RecipeIngredient)
  declare ingredients: Array<Ingredient & { RecipeIngredient: RecipeIngredient }>;

  @BelongsToMany(() => Kitchenware, () => RecipeKitchenware)
  declare kitchenware: Array<Kitchenware & { RecipeKitchenware: RecipeKitchenware }>;

  @HasMany(() => RecipeStep)
  declare steps: Array<RecipeStep>;
}
