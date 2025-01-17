import { EntityNotFoundError } from "@rcp-and-plan/commons";
import { Service } from "typedi";

import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { IngredientsListResponse } from "@dtos/index";
import { Ingredient as IngredientDB } from "@infrastructure/models";

import { IIngredientQueries } from "./types";

@Service()
export class IngredientQueries implements IIngredientQueries {
  /**
   * @inheritdoc
   */
  public async getEntity(id: string) {
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

  public async getData() {
    const ingredients = await IngredientDB.findAll();

    return ingredients.reduce<IngredientsListResponse>((prev, value) => {
      const translatableContent = {
        name: value.name,
        singularName: value.singular_name,
      };
      const ingredientIndex = prev.findIndex(x => x.id === value.id);
      if (ingredientIndex === -1)
        return [
          ...prev,
          {
            id: value.id,
            content: {
              [value.language]: translatableContent,
            },
          },
        ];

      const ingredient = prev[ingredientIndex];
      return [
        ...prev.slice(0, ingredientIndex),
        { ...ingredient, content: { ...ingredient.content, [value.language]: translatableContent } },
        ...prev.slice(ingredientIndex + 1),
      ];
    }, []);
  }
}
