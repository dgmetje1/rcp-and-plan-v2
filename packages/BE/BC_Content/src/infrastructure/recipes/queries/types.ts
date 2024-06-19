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
  getData: (params: RecipesListQueryRequest, language: Languages) => Promise<RecipesListResponse>;
  getDataById: (id: string, language: Languages) => Promise<RecipeResponse>;
  /**
   * Gets the recipe of the day
   * @returns Recipe's of the day information
   */
  getDailyData: (language: Languages) => Promise<RecipeDailyResponse>;
}
