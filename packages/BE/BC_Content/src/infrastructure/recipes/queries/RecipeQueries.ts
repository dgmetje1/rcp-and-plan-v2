import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";
import { Recipe } from "@infrastructure/recipes/models";

import { IRecipeQueries } from "./types";

export class RecipeQueries implements IRecipeQueries {
  async getData() {
    const result = await Recipe.findAll({
      attributes: ["id", "title", "thumbnail_url"],
    });

    const response = result.map<RecipesListResponse[number]>(recipe => ({
      id: recipe.dataValues.id,
      title: recipe.dataValues.title,
      thumbnailUrl: recipe.dataValues.thumbnail_url,
    }));

    return response;
  }

  async getDataById(id: number) {
    const result = await Recipe.findByPk(id);
    if (!result) throw new Error("Recipe not found");

    const response: RecipeResponse = {
      id: result.dataValues.id,
      title: result.dataValues.title,
      description: result.dataValues.description,
      thumbnailUrl: result.dataValues.thumbnail_url,
      headerImg: result.dataValues.header_img,
      uniqueId: result.dataValues.unique_id,
      language: result.dataValues.language,
      difficulty: result.dataValues.difficulty,
      time: result.dataValues.time,
      portions: result.dataValues.portions,
      visibility: result.dataValues.visibility,
      author: result.dataValues.author,
      publicationDate: result.dataValues.publication_date,
    };

    return response;
  }
}
