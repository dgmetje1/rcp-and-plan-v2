import { Languages } from "types/languages";

import { Recipe } from "@domain/models/recipe/Recipe";
import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { RecipeDailyResponse } from "@dtos/responses/RecipeDailyResponse";
import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";

export interface IRecipeQueries {
  /**
   * Gets the Recipe identified by id
   * @param id Recipe identifier
   * @returns Recipe entity
   */
  getEntity: (id: string) => Promise<Recipe>;

  /**
   * Gets the Recipes that contains ingredients with the unit identified by id
   * @param id Recipe identifier
   * @returns Recipe entities
   */
  getEntitiesContainingUnit: (id: string) => Promise<Array<{ recipe: Recipe; ingredientIds: Array<string> }>>;

  /**
   * Gets the Recipes that contains the ingredient identified by id
   * @param id Recipe identifier
   * @returns Recipe entities
   */
  getEntitiesContainingIngredient: (id: string) => Promise<Array<Recipe>>;

  /**
   * Gets the recipes list matching the params specified
   * @param params Filters to get the recipes
   * @param language the culture to get the information on
   * @returns List of recipes
   */
  getData: (params: RecipesListQueryRequest, language: Languages) => Promise<RecipesListResponse>;

  /**
   * Gets the recipe information
   * @param id Recipe identifier
   * @param language the culture to get the information on
   * @returns Recipe information
   */
  getDataById: (id: string, language: Languages) => Promise<RecipeResponse>;

  /**
   * Gets the recipe of the day
   * @returns Recipe's of the day information
   */
  getDailyData: (language: Languages) => Promise<RecipeDailyResponse>;
}
