import { ICategoryQueries } from "@application/queries/categories/ICategoryQueries";
import { IIngredientQueries } from "@application/queries/ingredients/IIngredientQueries";
import { IUnitQueries } from "@application/queries/units/IUnitsQueries";
import { Category } from "@domain/models/category/Category";
import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { RecipeDifficulties } from "@domain/models/recipe/helpers/RecipeDifficulties";
import { RecipeVisibilities } from "@domain/models/recipe/helpers/RecipeVisibilities";
import { IRecipeRepository } from "@domain/models/recipe/IRecipeRepository";
import { Recipe } from "@domain/models/recipe/Recipe";
import { Unit } from "@domain/models/unit/Unit";
import { RecipeCreateRequest } from "@dtos/requests/RecipeCreateRequest";
import Container from "@services/DI";

import { IRecipeApplication } from "./IRecipeApplication";

export class RecipeApplication implements IRecipeApplication {
  /**
   * @inheritdoc
   */
  public async createRecipe(request: RecipeCreateRequest): Promise<void> {
    const { container } = await Container.getInstance();

    const categories = await this.getCategories(request.categories);

    const recipe = Recipe.create(
      RecipeDifficulties.get(request.difficulty),
      request.time,
      request.portions,
      RecipeVisibilities.get(request.visibility),
      request.author,
      request.publications,
      categories,
    );
    const ingredients = await this.getIngredients(request.ingredients);
    ingredients.forEach(({ ingredient, unit, quantity, isOptional }) =>
      recipe.setIngredient(ingredient, unit, quantity, isOptional),
    );

    const repository = container.get<IRecipeRepository>("RecipeRepository");

    repository.create(recipe);

    await repository.unitOfWork.saveChangesAsync();
  }
  private async getIngredients(ingredientsRequest: RecipeCreateRequest["ingredients"]) {
    const { container } = await Container.getInstance();

    const ingredientQueries = container.get<IIngredientQueries>("IngredientQueries");
    const unitQueries = container.get<IUnitQueries>("UnitQueries");

    const ingredients: Array<
      { ingredient: Ingredient; unit: Unit } & Pick<
        RecipeCreateRequest["ingredients"][number],
        "quantity" | "isOptional"
      >
    > = [];

    for (const { id, unitId, ...rest } of ingredientsRequest) {
      ingredients.push({
        ingredient: await ingredientQueries.getEntity(id),
        unit: await unitQueries.getEntity(unitId),
        ...rest,
      });
    }

    return ingredients;
  }

  /**
   * Retrieves categories based on their IDs.
   *
   * @param categoriesIds The IDs of the categories to retrieve
   * @returns An array of Category instances corresponding to the provided IDs
   */
  private async getCategories(categoriesIds: RecipeCreateRequest["categories"]) {
    const { container } = await Container.getInstance();

    const categoryQueries = container.get<ICategoryQueries>("CategoryQueries");

    const categories: Category[] = [];

    for (const categoryId of categoriesIds) {
      categories.push(await categoryQueries.getEntity(categoryId));
    }

    return categories;
  }
}
