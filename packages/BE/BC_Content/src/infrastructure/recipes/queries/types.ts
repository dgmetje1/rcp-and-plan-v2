import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";

export interface IRecipeQueries {
  getData: () => Promise<RecipesListResponse>;
}
