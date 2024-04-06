import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";

export interface IRecipeQueries {
  getData: () => Promise<RecipesListResponse>;
  getDataById: (id: number) => Promise<RecipeResponse>;
}
