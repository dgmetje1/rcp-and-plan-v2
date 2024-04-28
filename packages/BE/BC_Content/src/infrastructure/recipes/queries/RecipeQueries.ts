import { EntityNotFoundError } from "common/EntityNotFoundError";
import { WhereOptions } from "sequelize";

import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { RecipeDailyResponse } from "@dtos/responses/RecipeDailyResponse";
import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";
import { Category, Recipe } from "@infrastructure/recipes/models";

import { CategoryAttributes } from "../models/Category/types";
import { Ingredient } from "../models/Ingredient";
import { Kitchenware } from "../models/Kitchenware";
import { RecipeAttributes } from "../models/Recipe/types";
import { RecipeStep } from "../models/RecipeStep";
import { Unit } from "../models/Unit";
import { IRecipeQueries } from "./types";

export class RecipeQueries implements IRecipeQueries {
  async getData(params: RecipesListQueryRequest) {
    const where: WhereOptions<RecipeAttributes> = { visibility: 1 };
    const subQueryWhere: WhereOptions<CategoryAttributes> = params.category
      ? {
          id: params.category,
        }
      : {};
    const result = await Recipe.findAll({
      attributes: ["id", "title", "thumbnail_url"],
      where,
      include: [{ model: Category, required: true, where: subQueryWhere }],
    });

    const response = result.map<RecipesListResponse[number]>(recipe => ({
      id: recipe.dataValues.id,
      title: recipe.dataValues.title,
      thumbnailUrl: recipe.dataValues.thumbnail_url,
    }));

    return response;
  }

  async getDataById(id: number) {
    const result = await Recipe.findByPk(id, {
      include: [
        { model: Category, required: true },
        {
          model: Ingredient,
        },
        {
          model: Kitchenware,
        },
        {
          model: RecipeStep,
          order: ["number", "ASC"],
        },
      ],
    });
    if (!result)
      throw new EntityNotFoundError("Recipe not found", "Recipe", [{ id }]);

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
      categories: result.dataValues.categories.map(category => ({
        id: category.dataValues.id,
        name: category.dataValues.name,
      })),
      ingredients: await Promise.all(
        result.dataValues.ingredients.map(async ingredient => {
          const unit = await Unit.findOne({
            where: {
              id: ingredient.RecipeIngredient.unit_id,
              language: "ca",
            },
            rejectOnEmpty: true,
          });
          return {
            id: ingredient.dataValues.id,
            name: ingredient.dataValues.name,
            singularName: ingredient.dataValues.singular_name,
            quantity: ingredient.RecipeIngredient.dataValues.quantity,
            optional: ingredient.RecipeIngredient.dataValues.optional,
            units: {
              id: unit.dataValues.id,
              name: unit.dataValues.name,
              shortName: unit.dataValues.short_name,
            },
          };
        }),
      ),
      kitchenware: result.dataValues.kitchenware.map(tool => ({
        id: tool.dataValues.id,
        name: tool.dataValues.name,
        singularName: tool.dataValues.singular_name,
        quantity: tool.RecipeKitchenware.dataValues.quantity,
      })),
      steps: result.dataValues.steps.map(step => ({
        id: step.dataValues.id,
        title: step.dataValues.title,
        body: step.dataValues.body,
        number: step.dataValues.number,
      })),
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
      include: [
        { model: Category, required: true },
        {
          model: Ingredient,
          required: true,
        },
      ],
    });
    if (!result) throw new Error("Recipe not found");

    const response: RecipeDailyResponse = {
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
      ingredients: await Promise.all(
        result.dataValues.ingredients.map(async ingredient => {
          const unit = await Unit.findOne({
            where: {
              id: ingredient.RecipeIngredient.unit_id,
              language: "ca",
            },
            rejectOnEmpty: true,
          });
          return {
            id: ingredient.dataValues.id,
            name: ingredient.dataValues.name,
            singularName: ingredient.dataValues.singular_name,
            quantity: ingredient.RecipeIngredient.dataValues.quantity,
            optional: ingredient.RecipeIngredient.dataValues.optional,
            units: {
              id: unit.dataValues.id,
              name: unit.dataValues.name,
              shortName: unit.dataValues.short_name,
            },
          };
        }),
      ),
    };

    return response;
  }
}
