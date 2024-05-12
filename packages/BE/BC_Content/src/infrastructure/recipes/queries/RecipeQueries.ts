import { EntityNotFoundError } from "@rcp-and-plan/commons";

import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { RecipeDailyResponse } from "@dtos/responses/RecipeDailyResponse";
import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";
import { Category, Recipe } from "@infrastructure/models";
import { RecipePublication } from "@infrastructure/models/Recipe";

import { Ingredient } from "../../models/Ingredient";
import { Kitchenware } from "../../models/Kitchenware";
import { RecipeStep } from "../../models/Recipe/Step";
import { Unit } from "../../models/Unit";
import { processRecipesListParamsQuery } from "./helpers/params";
import { IRecipeQueries } from "./types";

export class RecipeQueries implements IRecipeQueries {
  /**
   *  @inheritdoc
   */
  async getData(params: RecipesListQueryRequest) {
    const result = await Recipe.findAll({ ...processRecipesListParamsQuery(params) });

    const response = result.map<RecipesListResponse[number]>(recipe => ({
      id: recipe.dataValues.id,
      title: recipe.dataValues.publications[0].title,
      thumbnailUrl: recipe.dataValues.thumbnail_url,
    }));

    return response;
  }

  /**
   *  @inheritdoc
   */
  async getDataById(id: string) {
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
          model: RecipePublication,
          required: true,
        },
        {
          model: RecipeStep,
          order: ["number", "ASC"],
        },
      ],
    });
    if (!result) throw new EntityNotFoundError("Recipe not found", "Recipe", [{ id }]);

    const response: RecipeResponse = {
      id: result.dataValues.id,
      title: result.dataValues.publications[0].title,
      description: result.dataValues.publications[0].description,
      thumbnailUrl: result.dataValues.thumbnail_url,
      headerImg: result.dataValues.header_img,
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
      attributes: ["id", "thumbnail_url", "time", "author", "publication_date", "difficulty", "portions"],
      where: { visibility: 1 },
      include: [
        { model: Category, required: true },
        {
          model: Ingredient,
        },
        {
          model: RecipePublication,
          required: true,
        },
      ],
    });
    if (!result) throw new EntityNotFoundError("Daily recipe not found", "Recipe");

    const response: RecipeDailyResponse = {
      id: result.dataValues.id,
      title: result.dataValues.publications[0].title,
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
