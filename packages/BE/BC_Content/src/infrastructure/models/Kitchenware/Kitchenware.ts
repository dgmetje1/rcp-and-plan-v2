import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

import { Recipe } from "../Recipe";
import { RecipeKitchenware } from "../RecipeKitchenware";
import { KitchenwareAttributes, KitchenwareCreationAttributes } from "./types";

@Table({ tableName: "kitchenware", paranoid: true })
export class Kitchenware extends Model<KitchenwareAttributes, KitchenwareCreationAttributes> {
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

  @BelongsToMany(() => Recipe, () => RecipeKitchenware)
  declare recipes: Recipe[];
}
