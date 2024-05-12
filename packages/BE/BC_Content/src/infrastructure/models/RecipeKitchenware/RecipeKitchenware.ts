import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Kitchenware } from "../Kitchenware";
import { Recipe } from "../Recipe";
import { RecipeKitchenwareAttributes } from "./types";

@Table({ tableName: "recipes_kitchenware", timestamps: false })
export class RecipeKitchenware extends Model<RecipeKitchenwareAttributes> {
  @ForeignKey(() => Recipe)
  @Column
  declare recipe_id: string;

  @ForeignKey(() => Kitchenware)
  @Column
  declare tool_id: string;

  @Column(DataType.FLOAT)
  declare quantity: number;
}
