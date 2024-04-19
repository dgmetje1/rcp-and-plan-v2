import { Column, ForeignKey, Model, Table } from "sequelize-typescript";

import { Category } from "../Category";
import { Recipe } from "../Recipe";
import { RecipeCategoryAttributes } from "./types";

@Table({ tableName: "recipes_categories", timestamps: false })
export class RecipeCategory extends Model<RecipeCategoryAttributes> {
  @ForeignKey(() => Recipe)
  @Column
  declare recipeId: number;
  @ForeignKey(() => Category)
  @Column
  declare categoryId: number;
}
