import { EntityNotFoundError } from "@rcp-and-plan/commons";

import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { Ingredient as IngredientDB } from "@infrastructure/models";

import { IIngredientQueries } from "./types";

export class IngredientQueries implements IIngredientQueries {
  /**
   * @inheritdoc
   */
  async getEntity(id: string): Promise<Ingredient> {
    const ingredients = await IngredientDB.findAll({ where: { id } });
    if (!ingredients.length) throw new EntityNotFoundError("Ingredient not found", "Ingredient", [{ id }]);

    return Ingredient.get(
      ingredients[0]!.id,
      ingredients.map(({ language, name, singular_name }) => ({
        language,
        name,
        singularName: singular_name,
      })),
    );
  }
}
