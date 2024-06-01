import { SqlBuilder } from "@rcp-and-plan/commons";

import { Category } from "./Category";
import { Ingredient } from "./Ingredient";
import { Kitchenware } from "./Kitchenware";
import { Recipe, RecipePublication, RecipeStep, RecipeStepContent } from "./Recipe";
import { RecipeCategory } from "./RecipeCategory";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeKitchenware } from "./RecipeKitchenware";
import { Unit } from "./Unit";

export const setupModels = async () => {
  const { db: sequelize } = new SqlBuilder(process.env.CONNECTION_STRING_CONTENT!);

  sequelize.addModels([
    RecipeCategory,
    RecipePublication,
    RecipeStepContent,
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
    Kitchenware.sync(),
    Ingredient.sync(),
    Unit.sync(),
    Category.sync(),
    RecipeCategory.sync(),
    RecipeStepContent.sync(),
    RecipeStep.sync(),
    RecipePublication.sync(),
    RecipeIngredient.sync(),
    RecipeKitchenware.sync(),
  ]);
};
