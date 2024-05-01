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
import { RecipeKitchenware } from "../RecipeKitchenware";
import { KitchenwareAttributes, KitchenwareCreationAttributes } from "./types";

@Table({ tableName: "kitchenware" })
export class Kitchenware extends Model<
  KitchenwareAttributes,
  KitchenwareCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  declare id: number;

  @Column(DataTypes.STRING)
  declare name: string;

  @Column(DataTypes.STRING)
  declare singular_name: string;

  @Column(DataTypes.STRING)
  declare language: string;

  @BelongsToMany(() => Recipe, () => RecipeKitchenware)
  declare recipes: Recipe[];
}
