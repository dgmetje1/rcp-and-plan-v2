import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesDailyResponse } from "@dtos/responses/RecipesDailyResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";
import { Category, Recipe } from "@infrastructure/recipes/models";

import { IRecipeQueries } from "./types";

export class RecipeQueries implements IRecipeQueries {
  async getData() {
    const result = await Recipe.findAll({
      attributes: ["id", "title", "thumbnail_url"],
      where: { visibility: 1 },
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

  /**
   *  @inheritdoc
   */
  async getDailyData() {
    //TODO improve daily recipe selection
    const result = await Recipe.findOne({
      attributes: [
        "id",
        "title",
        "thumbnail_url",
        "time",
        "author",
        "publication_date",
        "difficulty",
        "portions",
      ],
      where: { visibility: 1 },
      include: [{ model: Category, required: true }],
    });
    if (!result) throw new Error("Recipe not found");

    const response: RecipesDailyResponse = {
      id: result.dataValues.id,
      title: result.dataValues.title,
      thumbnailUrl: result.dataValues.thumbnail_url,
      time: result.dataValues.time,
      author: result.dataValues.author,
      publicationDate: result.dataValues.publication_date,
      difficulty: result.dataValues.difficulty,
      portions: result.dataValues.portions,
      categories: result.dataValues.categories.map(category => ({
        id: category.dataValues.id,
        name: category.dataValues.name,
      })),
    };

    return response;
  }
}
