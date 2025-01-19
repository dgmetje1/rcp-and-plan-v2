import Container, { Service } from "typedi";

import { IIngredientQueries, IngredientQueries } from "@application/queries/ingredients/IIngredientQueries";
import { IIngredientRepository, IngredientRepository } from "@domain/models/ingredient/IIngredientRepository";
import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { IngredientCreateRequest, IngredientEditRequest, IngredientMergeRequest } from "@dtos/index";

import { IIngredientApplication } from "./IIngredientApplication";

@Service({ transient: true })
export class IngredientApplication implements IIngredientApplication {
  /** @inheritdoc */
  public async createIngredient(request: IngredientCreateRequest) {
    const ingredient = Ingredient.create(
      Object.entries(request.content).map(([language, value]) => ({ language, ...value })),
    );
    const repository = Container.get<IIngredientRepository>(IngredientRepository);
    repository.create(ingredient);

    await repository.unitOfWork.saveChangesAsync();
  }

  /** @inheritdoc  */
  public async editIngredient(request: IngredientEditRequest): Promise<void> {
    const ingredientQueries = Container.get<IIngredientQueries>(IngredientQueries);

    const ingredient = await ingredientQueries.getEntity(request.id);
    const currentLanguages = ingredient.edit(
      Object.entries(request.content).map(([language, value]) => ({ language, ...value })),
    );

    const repository = Container.get<IIngredientRepository>(IngredientRepository);
    repository.edit(ingredient, currentLanguages);

    await repository.unitOfWork.saveChangesAsync();
  }

  /** @inheritdoc */
  public async deleteIngredient(id: string): Promise<void> {
    const ingredientQueries = Container.get<IIngredientQueries>(IngredientQueries);

    const ingredient = await ingredientQueries.getEntity(id);
    ingredient.delete();

    const repository = Container.get<IIngredientRepository>(IngredientRepository);
    repository.delete(ingredient);

    await repository.unitOfWork.saveChangesAsync();
  }

  /** @inheritdoc */
  public async mergeIngredients(request: IngredientMergeRequest): Promise<void> {
    const ingredientQueries = Container.get<IIngredientQueries>(IngredientQueries);
    const targetIngredient = await ingredientQueries.getEntity(request.targetId);

    const otherIngredients = await Promise.all(
      request.ingredientIds.map(ingredientId => ingredientQueries.getEntity(ingredientId)),
    );

    const repository = Container.get<IIngredientRepository>(IngredientRepository);

    for (const otherIngredient of otherIngredients) {
      const currentLanguages = targetIngredient.merge(otherIngredient);
      repository.edit(targetIngredient, currentLanguages);
      repository.delete(otherIngredient);
    }

    await repository.unitOfWork.saveChangesAsync();
  }
}
