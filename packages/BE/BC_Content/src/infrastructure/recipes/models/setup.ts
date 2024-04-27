import { SqlBuilder } from "@infrastructure/common/sqlBuilder";

import { Category } from "./Category";
import { Ingredient } from "./Ingredient";
import { Kitchenware } from "./Kitchenware";
import { Recipe } from "./Recipe";
import { RecipeCategory } from "./RecipeCategory";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeKitchenware } from "./RecipeKitchenware";
import { RecipeStep } from "./RecipeStep";
import { Unit } from "./Unit";

export const setupModels = async () => {
  const { db: sequelize } = new SqlBuilder(
    process.env.CONNECTION_STRING_CONTENT!,
  );

  sequelize.addModels([
    RecipeCategory,
    RecipeStep,
    Recipe,
    Category,
    RecipeIngredient,
    RecipeKitchenware,
    Kitchenware,
    Ingredient,
    Unit,
  ]);

  await Promise.all([
    Recipe.sync(),
    RecipeCategory.sync(),
    RecipeStep.sync(),
    RecipeIngredient.sync(),
    RecipeKitchenware.sync(),
    Kitchenware.sync(),
    Ingredient.sync(),
    Unit.sync(),
  ]);
};
