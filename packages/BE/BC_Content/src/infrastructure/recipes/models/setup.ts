import { SqlBuilder } from "@infrastructure/common/sqlBuilder";

import { Category } from "./Category";
import { Recipe } from "./Recipe";
import { RecipeCategory } from "./RecipeCategory";

export const setupModels = () => {
  const { db: sequelize } = new SqlBuilder(
    process.env.CONNECTION_STRING_CONTENT!,
  );

  sequelize.addModels([RecipeCategory, Recipe, Category]);
  RecipeCategory.sync();
  Category.sync();
};
