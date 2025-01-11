import { EntityNotFoundError, TranslationsNotFoundError } from "@rcp-and-plan/commons";
import { Service } from "typedi";

import { Category as CategoryModel } from "@domain/models/category/Category";
import { RecipeDifficulties } from "@domain/models/recipe/helpers/RecipeDifficulties";
import { RecipeVisibilities } from "@domain/models/recipe/helpers/RecipeVisibilities";
import { Recipe as RecipeModel } from "@domain/models/recipe/Recipe";
import { RecipeStepResponse } from "@dtos/index";
import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { RecipeDailyResponse } from "@dtos/responses/RecipeDailyResponse";
import { RecipeResponse } from "@dtos/responses/RecipeResponse";
import { RecipesListResponse } from "@dtos/responses/RecipesListResponse";
import { DEFAULT_LANGUAGE, Languages } from "@global_types/languages";
import { Category, Recipe, RecipeIngredient } from "@infrastructure/models";
import { Ingredient } from "@infrastructure/models/Ingredient";
import { Kitchenware } from "@infrastructure/models/Kitchenware";
import { RecipePublication } from "@infrastructure/models/Recipe";
import { RecipeStep } from "@infrastructure/models/Recipe/Step";
import { RecipeStepContent } from "@infrastructure/models/Recipe/Step/Content";
import { Unit } from "@infrastructure/models/Unit";

import { getRecipeIngredients, getRecipeKitchenware, getRecipeSteps } from "./helpers/aggregateQueries";
import { processRecipesListParamsQuery } from "./helpers/params";
import { IRecipeQueries } from "./types";

@Service()
export class RecipeQueries implements IRecipeQueries {
  public async getEntity(id: string, shouldRetrieveRelatedEntities: boolean = true) {
    const result = await Recipe.findByPk(id, {
      include: [
        { model: Category, required: true },
        {
          model: Ingredient,
          attributes: ["id"],
        },
        {
          model: Kitchenware,
          attributes: ["id"],
        },
        { model: RecipePublication },
        {
          model: RecipeStep,
          order: ["number", "ASC"],
          include: [RecipeStepContent],
        },
      ],
    });
    if (!result) throw new EntityNotFoundError("Recipe not found", "Recipe", [{ id }]);

    const recipe = RecipeModel.get(
      result.dataValues.id,
      RecipeDifficulties.get(result.dataValues.difficulty),
      result.dataValues.time,
      result.dataValues.portions,
      RecipeVisibilities.get(result.dataValues.visibility),
      result.dataValues.author,
      result.dataValues.publication_date,
      result.dataValues.publications.reduce(
        (prev, { language, title, description }) => ({ ...prev, [language]: { title, description } }),
        {},
      ),
      result.categories.map(({ id, language, name, description }) =>
        CategoryModel.get(id, [{ language, name, description }]),
      ),
      await getRecipeIngredients(result.dataValues.ingredients, shouldRetrieveRelatedEntities),
      await getRecipeKitchenware(result.dataValues.kitchenware, shouldRetrieveRelatedEntities),
      getRecipeSteps(result.dataValues.steps),
    );

    return recipe;
  }

  public async getEntitiesContainingUnit(id: string) {
    const results = await RecipeIngredient.findAll({
      attributes: ["recipe_id", "ingredient_id"],
      where: { unit_id: id },
    });

    const processedResults = new Map<string, string[]>();

    for (const result of results) {
      const { recipe_id, ingredient_id } = result.dataValues;
      if (processedResults.has(recipe_id)) {
        const ingredientsList = processedResults.get(recipe_id)!;
        ingredientsList.push(ingredient_id);
      } else {
        processedResults.set(recipe_id, [ingredient_id]);
      }
    }

    return await Promise.all(
      [...processedResults.keys()].map(async id => ({
        recipe: await this.getEntity(id, false),
        ingredientIds: processedResults.get(id)!,
      })),
    );
  }

  /**
   *  @inheritdoc
   */
  public async getData(params: RecipesListQueryRequest, language: Languages): ReturnType<IRecipeQueries["getData"]> {
    try {
      const result = await Recipe.findAll({ ...processRecipesListParamsQuery(params, language) });

      if (!result.length && language !== DEFAULT_LANGUAGE)
        throw new TranslationsNotFoundError("Translations not found", language);

      const response = result.map<RecipesListResponse[number]>(recipe => ({
        id: recipe.dataValues.id,
        title: recipe.publications.at(0)?.title || "",
        thumbnailUrl: recipe.dataValues.thumbnail_url,
      }));

      return response;
    } catch (err) {
      if (err instanceof TranslationsNotFoundError) {
        return this.getData(params, DEFAULT_LANGUAGE);
      }
      throw err;
    }
  }

  /**
   *  @inheritdoc
   */
  async getDataById(id: string, language: Languages): Promise<RecipeResponse> {
    try {
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
            where: { language },
          },
          {
            model: RecipeStep,
            order: ["number", "ASC"],
          },
        ],
      });
      if (!result && language !== DEFAULT_LANGUAGE)
        throw new TranslationsNotFoundError("Translations not found", language);
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
                language,
              },
              rejectOnEmpty: true,
            });
            return {
              id: ingredient.dataValues.id,
              name: ingredient.dataValues.name,
              singularName: ingredient.dataValues.singular_name,
              quantity: ingredient.RecipeIngredient.dataValues.quantity,
              optional: ingredient.RecipeIngredient.dataValues.is_optional,
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
        steps: await this.getSteps(result, language),
      };

      return response;
    } catch (err) {
      if (err instanceof TranslationsNotFoundError) {
        return this.getDataById(id, DEFAULT_LANGUAGE);
      }
      throw err;
    }
  }

  /**
   *  @inheritdoc
   */
  async getDailyData(language: Languages): Promise<RecipeDailyResponse> {
    try {
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
            where: { language },
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
              optional: ingredient.RecipeIngredient.dataValues.is_optional,
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
    } catch (err) {
      if (err instanceof TranslationsNotFoundError) {
        return this.getDailyData(DEFAULT_LANGUAGE);
      }
      throw err;
    }
  }

  private async getSteps(recipe: Recipe, language: Languages): Promise<RecipeStepResponse[]> {
    const steps: RecipeStepResponse[] = [];
    for (const step of recipe.dataValues.steps) {
      const content = await RecipeStepContent.findOne({
        where: {
          id: step.id,
          language,
        },
      });
      if (content) {
        steps.push({
          id: step.dataValues.id,
          title: content.dataValues.title,
          body: content.dataValues.body,
          number: step.dataValues.number,
        });
      }
    }

    return steps;
  }
}
