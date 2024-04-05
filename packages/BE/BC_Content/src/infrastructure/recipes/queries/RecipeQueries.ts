import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";
import { Recipe } from "@infrastructure/recipes/models";

import { IRecipeQueries } from "./types";

export class RecipeQueries implements IRecipeQueries {
  async getData() {
    const result: RecipesListResponse = await Recipe.findAll({
      attributes: ["id", "title", "thumbnail_url"],
    });
    return result;
  }
}
