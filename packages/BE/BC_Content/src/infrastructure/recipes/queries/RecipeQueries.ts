import { IRecipeQueries } from "./types";
import { Recipe } from "../models/Recipe";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";

export class RecipeQueries implements IRecipeQueries {
  async getData() {
    const result: RecipesListResponse = await Recipe.findAll({
      attributes: ["recipe_id", "title", "thumbnail_url"],
    });
    return result;
  }
}
