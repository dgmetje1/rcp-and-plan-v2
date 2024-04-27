import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesDailyResponse } from "@dtos/responses/RecipesDailyResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";

export interface IRecipeQueries {
  getData: (params: RecipesListQueryRequest) => Promise<RecipesListResponse>;
  getDataById: (id: number) => Promise<RecipeResponse>;
  /**
   * Gets the recipe of the day
   * @returns Recipe's of the day information
   */
  getDailyData: () => Promise<RecipesDailyResponse>;
}
