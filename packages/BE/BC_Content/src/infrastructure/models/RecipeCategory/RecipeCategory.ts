import { Column, ForeignKey, Model, Table } from "sequelize-typescript";

import { Category } from "../Category";
import { Recipe } from "../Recipe";
import { RecipeCategoryAttributes } from "./types";

@Table({ tableName: "recipes_categories", timestamps: false })
export class RecipeCategory extends Model<RecipeCategoryAttributes> {
  @ForeignKey(() => Recipe)
  @Column
  declare recipe_id: string;
  @ForeignKey(() => Category)
  @Column
  declare category_id: string;
}
