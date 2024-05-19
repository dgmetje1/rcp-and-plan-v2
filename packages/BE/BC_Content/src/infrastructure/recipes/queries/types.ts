import { Languages } from "types/languages";

import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { RecipeDailyResponse } from "@dtos/responses/RecipeDailyResponse";
import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";

export interface IRecipeQueries {
  getData: (params: RecipesListQueryRequest, language: Languages) => Promise<RecipesListResponse>;
  getDataById: (id: string, language: Languages) => Promise<RecipeResponse>;
  /**
   * Gets the recipe of the day
   * @returns Recipe's of the day information
   */
  getDailyData: (language: Languages) => Promise<RecipeDailyResponse>;
}
