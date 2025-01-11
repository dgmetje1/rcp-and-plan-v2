import { PartialEntity } from "@rcp-and-plan/commons";
import Container from "typedi";

import { IIngredientQueries, IngredientQueries } from "@infrastructure/ingredients/queries";
import { IKitchenwareQueries, KitchenwareQueries } from "@infrastructure/kitchenware/queries";
import { Recipe } from "@infrastructure/models";
import { IUnitQueries, UnitQueries } from "@infrastructure/units/queries";

export const getRecipeIngredients = (ingredients: Recipe["ingredients"], shouldRetrieveRelatedEntities: boolean) => {
  if (!shouldRetrieveRelatedEntities)
    return ingredients.map(({ RecipeIngredient: { ingredient_id, unit_id, is_optional, quantity } }) => ({
      ingredient: new PartialEntity(ingredient_id),
      unit: new PartialEntity(unit_id),
      isOptional: is_optional,
      quantity,
    }));

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

export const getRecipeKitchenware = (kitchenware: Recipe["kitchenware"], shouldRetrieveRelatedEntities: boolean) => {
  if (!shouldRetrieveRelatedEntities)
    return kitchenware.map(({ RecipeKitchenware: { tool_id, quantity } }) => ({
      kitchenware: new PartialEntity(tool_id),
      quantity,
    }));

  const kitchenwareQueries = Container.get<IKitchenwareQueries>(KitchenwareQueries);
  return Promise.all(
    kitchenware.map(async ({ RecipeKitchenware: { tool_id, quantity } }) => {
      const kitchenwareModel = await kitchenwareQueries.getEntity(tool_id);

      return { kitchenware: kitchenwareModel, quantity };
    }),
  );
};

export const getRecipeSteps = (steps: Recipe["steps"]) => {
  return steps.map(({ id, number, publications }) => ({
    id,
    number,
    content: publications.reduce((prev, { language, title, body }) => ({ ...prev, [language]: { title, body } }), {}),
  }));
};
