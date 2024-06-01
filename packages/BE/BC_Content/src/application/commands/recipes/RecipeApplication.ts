import { ICategoryQueries } from "@application/queries/categories/ICategoryQueries";
import { Category } from "@domain/models/category/Category";
import { RecipeDifficulties } from "@domain/models/recipe/helpers/RecipeDifficulties";
import { RecipeVisibilities } from "@domain/models/recipe/helpers/RecipeVisibilities";
import { IRecipeRepository } from "@domain/models/recipe/IRecipeRepository";
import { Recipe } from "@domain/models/recipe/Recipe";
import { RecipeCreateRequest } from "@dtos/requests/RecipeCreateRequest";
import Container from "@services/DI";

import { IRecipeApplication } from "./IRecipeApplication";

export class RecipeApplication implements IRecipeApplication {
  /**
   * @inheritdoc
   */
  public async createRecipe(request: RecipeCreateRequest): Promise<void> {
    const { container } = await Container.getInstance();

    const categoryQueries = container.get<ICategoryQueries>("CategoryQueries");

    const categories: Category[] = [];

    for (const categoryId of request.categories) {
      categories.push(await categoryQueries.getEntity(categoryId));
    }

    const recipe = Recipe.create(
      RecipeDifficulties.get(request.difficulty),
      request.time,
      request.portions,
      RecipeVisibilities.get(request.visibility),
      request.author,
      request.publications,
      categories,
    );

    const repository = container.get<IRecipeRepository>("RecipeRepository");

    repository.create(recipe);

    await repository.unitOfWork.saveChangesAsync();
  }
}
