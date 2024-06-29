import { Container, Service } from "typedi";

import { CategoryQueries, ICategoryQueries } from "@application/queries/categories/ICategoryQueries";
import { IIngredientQueries, IngredientQueries } from "@application/queries/ingredients/IIngredientQueries";
import { IKitchenwareQueries, KitchenwareQueries } from "@application/queries/kitchenware/IKitchenwareQueries";
import { IRecipeQueries, RecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import { IUnitQueries, UnitQueries } from "@application/queries/units/IUnitsQueries";
import { Category } from "@domain/models/category/Category";
import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";
import { RecipeDifficulties } from "@domain/models/recipe/helpers/RecipeDifficulties";
import { RecipeVisibilities } from "@domain/models/recipe/helpers/RecipeVisibilities";
import { IRecipeRepository, RecipeRepository } from "@domain/models/recipe/IRecipeRepository";
import { Recipe } from "@domain/models/recipe/Recipe";
import { Unit } from "@domain/models/unit/Unit";
import { RecipeCreateRequest } from "@dtos/requests/RecipeCreateRequest";
import { RecipeCreateStepsRequest } from "@dtos/requests/RecipeCreateStepRequest";
import { RecipeIngredientsRequest } from "@dtos/requests/RecipeIngredientRequest";
import { RecipeKitchenwareRequest } from "@dtos/requests/RecipeKitchenwareRequest";

import { IRecipeApplication } from "./IRecipeApplication";

@Service({ transient: true })
export class RecipeApplication implements IRecipeApplication {
  /**
   * @inheritdoc
   */
  public async createRecipe(request: RecipeCreateRequest): Promise<string> {
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
      recipe.addIngredient(ingredient, unit, quantity, isOptional),
    );

    const kitchenware = await this.getKitchenware(request.kitchenware);
    kitchenware.forEach(({ kitchenware, quantity }) => recipe.addKitchenware(kitchenware, quantity));

    request.steps.forEach(({ number, content }) => recipe.addStep(number, content));

    const repository = Container.get<IRecipeRepository>(RecipeRepository);

    repository.create(recipe);

    await repository.unitOfWork.saveChangesAsync();

    return recipe.id.toString();
  }

  /**
   * @inheritdoc
   */
  public async addRecipeIngredients(recipeId: string, request: RecipeIngredientsRequest) {
    const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
    const recipe = await recipeQueries.getEntity(recipeId);

    const ingredients = await this.getIngredients(request);
    const repository = Container.get<IRecipeRepository>(RecipeRepository);
    ingredients.forEach(({ ingredient, unit, quantity, isOptional }) => {
      const recipeIngredient = recipe.setIngredient(ingredient, unit, quantity, isOptional);
      repository.addIngredient(recipe, recipeIngredient);
    });

    await repository.unitOfWork.saveChangesAsync();
  }

  /**
   * @inheritdoc
   */
  public async addRecipeKitchenware(recipeId: string, request: RecipeKitchenwareRequest) {
    const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
    const recipe = await recipeQueries.getEntity(recipeId);

    const kitchenware = await this.getKitchenware(request);
    const repository = Container.get<IRecipeRepository>(RecipeRepository);
    kitchenware.forEach(({ kitchenware, quantity }) => {
      const recipeKitchenware = recipe.setKitchenware(kitchenware, quantity);
      repository.addKitchenware(recipe, recipeKitchenware);
    });

    await repository.unitOfWork.saveChangesAsync();
  }

  /**
   * @inheritdoc
   */
  public async addRecipeSteps(recipeId: string, request: RecipeCreateStepsRequest) {
    const recipeQueries = Container.get<IRecipeQueries>(RecipeQueries);
    const recipe = await recipeQueries.getEntity(recipeId);

    const repository = Container.get<IRecipeRepository>(RecipeRepository);
    request.forEach(({ number, content }) => {
      const recipeStep = recipe.setStep(number, content);
      repository.addStep(recipe, recipeStep);
    });

    await repository.unitOfWork.saveChangesAsync();
  }

  private async getIngredients(ingredientsRequest: RecipeCreateRequest["ingredients"]) {
    const ingredientQueries = Container.get<IIngredientQueries>(IngredientQueries);
    const unitQueries = Container.get<IUnitQueries>(UnitQueries);

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
   * Retrieves kitchenware based on their IDs along with the specified quantity.
   *
   * @param kitchenwareRequest The list of kitchenware IDs and quantities to retrieve
   * @returns An array of objects containing the kitchenware instances and their respective quantities
   */
  private async getKitchenware(kitchenwareRequest: RecipeCreateRequest["kitchenware"]) {
    const kitchenwareQueries = Container.get<IKitchenwareQueries>(KitchenwareQueries);

    const kitchenware: Array<
      { kitchenware: Kitchenware } & Pick<RecipeCreateRequest["kitchenware"][number], "quantity">
    > = [];

    for (const { id, ...rest } of kitchenwareRequest) {
      kitchenware.push({
        kitchenware: await kitchenwareQueries.getEntity(id),
        ...rest,
      });
    }

    return kitchenware;
  }

  /**
   * Retrieves categories based on their IDs.
   *
   * @param categoriesIds The IDs of the categories to retrieve
   * @returns An array of Category instances corresponding to the provided IDs
   */
  private async getCategories(categoriesIds: RecipeCreateRequest["categories"]) {
    const categoryQueries = Container.get<ICategoryQueries>(CategoryQueries);

    const categories: Category[] = [];

    for (const categoryId of categoriesIds) {
      categories.push(await categoryQueries.getEntity(categoryId));
    }

    return categories;
  }
}
