import Container from "typedi";

import { IIngredientQueries, IngredientQueries } from "@infrastructure/ingredients/queries";
import { IKitchenwareQueries, KitchenwareQueries } from "@infrastructure/kitchenware/queries";
import { Recipe } from "@infrastructure/models";
import { IUnitQueries, UnitQueries } from "@infrastructure/units/queries";

export const getRecipeIngredients = (ingredients: Recipe["ingredients"]) => {
  const ingredientQueries = Container.get<IIngredientQueries>(IngredientQueries);
  const unitQueries = Container.get<IUnitQueries>(UnitQueries);
  return Promise.all(
    ingredients.map(async ({ RecipeIngredient: { ingredient_id, unit_id, is_optional, quantity } }) => {
      const ingredientModel = await ingredientQueries.getEntity(ingredient_id);
      const unitModel = await unitQueries.getEntity(unit_id);

      return { ingredient: ingredientModel, unit: unitModel, isOptional: is_optional, quantity };
    }),
  );
};

export const getRecipeKitchenware = (kitchenware: Recipe["kitchenware"]) => {
  const kitchenwareQueries = Container.get<IKitchenwareQueries>(KitchenwareQueries);
  return Promise.all(
    kitchenware.map(async ({ RecipeKitchenware: { tool_id, quantity } }) => {
      const kitchenwareModel = await kitchenwareQueries.getEntity(tool_id);

      return { kitchenware: kitchenwareModel, quantity };
    }),
  );
};
