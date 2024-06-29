/* eslint-disable max-lines */
import { Application, NextFunction, type Request, type Response, Router } from "express";
import { EntityNotFoundError, EntityNotFoundErrorType, ExceptionErrorResponse } from "@rcp-and-plan/commons";
import { AxiosError } from "axios";
import Container, { Service } from "typedi";

import authMiddleware from "@api/middleware/auth";
import { userMiddleware } from "@api/middleware/user";
import { ContentService } from "@api/services/content";
import { RecipeCreateEntry } from "@dtos/entries/RecipeCreateEntry";
import { RecipeCreateStepsEntry } from "@dtos/entries/RecipeCreateStepEntry";
import { RecipeIngredientEntry } from "@dtos/entries/RecipeIngredientEntry";
import { RecipeKitchenwareEntry } from "@dtos/entries/RecipeKitchenwareEntry";
import { RecipesListQueryEntry } from "@dtos/entries/RecipeListQueryEntry";
import { RecipeDailyOutput } from "@dtos/outputs/RecipeDailyOutput";
import { RecipeOutput } from "@dtos/outputs/RecipeOutput";
import { RecipesListOutput } from "@dtos/outputs/RecipesListOutput";

/**
 * @openapi
 * tags:
 * - name: Recipes
 *   description: Use cases for recipes content
 * components:
 *  schemas:
 *   RecipeCreatePublicationEntry:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *   RecipeCreateStepPublicationEntry:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        body:
 *          type: string
 *   RecipeCreateStepEntry:
 *      type: object
 *      properties:
 *        number:
 *          type: integer
 *          minimum: 0
 *        content:
 *          type: object
 *          additionalProperties:
 *            $ref: '#/components/schemas/RecipeCreateStepPublicationEntry'
 *   RecipeIngredientEntry:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        unitId:
 *          type: string
 *        quantity:
 *          type: number
 *        isOptional:
 *          type: boolean
 *   RecipeKitchenwareEntry:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        quantity:
 *          type: integer
 *   RecipeCreateEntry:
 *      type: object
 *      properties:
 *        difficulty:
 *          type: integer
 *        time:
 *          type: integer
 *        portions:
 *          type: integer
 *        visibility:
 *          type: integer
 *        publications:
 *          type: object
 *          additionalProperties:
 *            $ref: '#/components/schemas/RecipeCreatePublicationEntry'
 *          example:
 *            en:
 *              title: string
 *              description: string
 *            es:
 *              title: string
 *              description: string
 *        categories:
 *          type: array
 *          items:
 *            type: string
 *        ingredients:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/RecipeIngredientEntry'
 *        kitchenware:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/RecipeKitchenwareEntry'
 *        steps:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/RecipeCreateStepEntry'
 *   RecipesListOutput:
 *      type: array
 *      items:
 *         $ref: '#/components/schemas/RecipeListOutput'
 *   RecipeListOutput:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       thumbnailUrl:
 *         type: string
 *   RecipeOutput:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       thumbnailUrl:
 *         type: string
 *       headerImg:
 *         type: string
 *       uniqueId:
 *         type: string
 *       language:
 *         type: string
 *       difficulty:
 *         type: integer
 *       time:
 *         type: integer
 *       portions:
 *         type: integer
 *       visibility:
 *         type: integer
 *       author:
 *         type: string
 *       publicationDate:
 *         type: string
 *         format: date-time
 *       categories:
 *         type: array
 *         items:
 *            $ref: '#/components/schemas/RecipeCategoryOutput'
 *       ingredients:
 *         type: array
 *         items:
 *            $ref: '#/components/schemas/RecipeIngredientOutput'
 *       kitchenware:
 *         type: array
 *         items:
 *            $ref: '#/components/schemas/RecipeKitchenwareOutput'
 *       steps:
 *         type: array
 *         items:
 *            $ref: '#/components/schemas/RecipeStepsOutput'
 *   RecipeDailyOutput:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       thumbnailUrl:
 *         type: string
 *       time:
 *         type: integer
 *       author:
 *         type: string
 *       publicationDate:
 *         type: string
 *         format: date-time
 *       difficulty:
 *         type: integer
 *       portions:
 *         type: integer
 *       categories:
 *         type: array
 *         items:
 *            $ref: '#/components/schemas/RecipeCategoryOutput'
 *       ingredients:
 *         type: array
 *         items:
 *            $ref: '#/components/schemas/RecipeIngredientOutput'
 *   RecipeCategoryOutput:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *   RecipeKitchenwareOutput:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       singularName:
 *         type: string
 *       quantity:
 *         type: integer
 *   RecipeStepsOutput:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       body:
 *         type: string
 *       number:
 *         type: integer
 *   RecipeIngredientOutput:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       singularName:
 *         type: string
 *       quantity:
 *         type: integer
 *       optional:
 *         type: boolean
 *       unit:
 *         type: object
 *         properties:
 *            id:
 *              type: integer
 *            name:
 *              type: string
 *            shortName:
 *              type: string
 *
 */
@Service()
class RecipesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public setupRouter(app: Application) {
    app.use("/recipes", this.router);
    this.routes();
  }

  /**
   * Sets up the routes for the RecipesRouter class.
   *
   * This method configures the routes for the RecipesRouter class by assigning the appropriate request handlers to the corresponding HTTP methods and paths.
   *
   */
  private routes(): void {
    this.router.get("/", this.getRecipes);
    this.router.get("/daily", this.getDailyRecipe);
    this.router.get("/:id", this.getRecipeById);
    this.router.post("/", authMiddleware, userMiddleware, this.createRecipe);
    this.router.put("/:id/ingredients", this.addRecipeIngredients);
    this.router.put("/:id/kitchenware", this.addRecipeKitchenware);
    this.router.put("/:id/steps", this.addRecipeSteps);
  }

  /**
   * @openapi
   * /recipes:
   *   get:
   *     summary: Returns a list of recipes.
   *     tags: [Recipes]
   *     parameters:
   *       - $ref: '#/components/parameters/Accept-Language'
   *       - in: query
   *         name: category
   *         type: string
   *         required: false
   *         description: ID of the category to get.
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecipesListOutput'
   */
  private async getRecipes(
    req: Request<unknown, unknown, unknown, RecipesListQueryEntry>,
    res: Response<RecipesListOutput>,
  ) {
    const contentService = Container.get<ContentService>(ContentService);
    const response = await contentService.getRecipes(req.query, req.headers);
    res.send(response.data);
  }

  /**
   * @openapi
   * /recipes/daily:
   *   get:
   *     summary: Returns a daily highlighted recipe.
   *     tags: [Recipes]
   *     parameters:
   *       - $ref: '#/components/parameters/Accept-Language'
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecipeDailyOutput'
   */
  private async getDailyRecipe(
    req: Request,
    res: Response<RecipeDailyOutput | ExceptionErrorResponse>,
    next: NextFunction,
  ) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      const response = await contentService.getDailyRecipe();
      res.send(response.data);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return res
          .status(404)
          .send({ type: EntityNotFoundErrorType, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /recipes/{id}:
   *   get:
   *     summary: Returns a recipe detail.
   *     tags: [Recipes]
   *     parameters:
   *       - $ref: '#/components/parameters/Accept-Language'
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the recipe to get.
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecipeOutput'
   *       400:
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async getRecipeById(req: Request, res: Response<RecipeOutput | ExceptionErrorResponse>, next: NextFunction) {
    try {
      const recipesQueries = Container.get<ContentService>(ContentService);
      const response = await recipesQueries.getRecipeById(req.params.id);
      res.send(response.data);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return res
          .status(404)
          .send({ type: EntityNotFoundErrorType, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /recipes:
   *   post:
   *     summary: Creates a recipe.
   *     tags: [Recipes]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RecipeCreateEntry'
   *     responses:
   *       201:
   *         description: Recipe created
   *         content:
   *          text/plain:
   *            schema:
   *            type: string
   *            example: string
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async createRecipe(req: Request<unknown, unknown, RecipeCreateEntry>, res: Response, next: NextFunction) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      const response = await contentService.createRecipe({ ...req.body, author: req.context.user.id });

      const { data: recipeId } = response;
      res.status(201).send(recipeId);
    } catch (err) {
      const errorData = (err as AxiosError<ExceptionErrorResponse | object>)?.response?.data;
      if (errorData && "type" in errorData && errorData.type === EntityNotFoundErrorType) {
        const typedErrorData = errorData as ExceptionErrorResponse;
        return res.status(404).send({
          type: EntityNotFoundErrorType,
          exceptionMessage: typedErrorData.exceptionMessage,
          params: typedErrorData.params,
        });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /recipes/{id}/ingredients:
   *   put:
   *     summary: Adds ingredients to a recipe.
   *     tags: [Recipes]
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the recipe to get.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/RecipeIngredientEntry'
   *     responses:
   *       204:
   *         description: Recipe ingredients added
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async addRecipeIngredients(
    req: Request<{ id: string }, unknown, RecipeIngredientEntry>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.addRecipeIngredients(req.params.id, req.body);
      res.status(204).send();
    } catch (err) {
      const errorData = (err as AxiosError<ExceptionErrorResponse | object>)?.response?.data;
      if (errorData && "type" in errorData && errorData.type === EntityNotFoundErrorType) {
        const typedErrorData = errorData as ExceptionErrorResponse;
        return res.status(404).send({
          type: EntityNotFoundErrorType,
          exceptionMessage: typedErrorData.exceptionMessage,
          params: typedErrorData.params,
        });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /recipes/{id}/kitchenware:
   *   put:
   *     summary: Adds kitchenware to a recipe.
   *     tags: [Recipes]
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the recipe to get.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/RecipeKitchenwareEntry'
   *     responses:
   *       204:
   *         description: Recipe kitchenware added
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async addRecipeKitchenware(
    req: Request<{ id: string }, unknown, RecipeKitchenwareEntry>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.addRecipeKitchenware(req.params.id, req.body);
      res.status(204).send();
    } catch (err) {
      const errorData = (err as AxiosError<ExceptionErrorResponse | object>)?.response?.data;
      if (errorData && "type" in errorData && errorData.type === EntityNotFoundErrorType) {
        const typedErrorData = errorData as ExceptionErrorResponse;
        return res.status(404).send({
          type: EntityNotFoundErrorType,
          exceptionMessage: typedErrorData.exceptionMessage,
          params: typedErrorData.params,
        });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /recipes/{id}/steps:
   *   put:
   *     summary: Adds steps to a recipe.
   *     tags: [Recipes]
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the recipe to get.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               $ref: '#/components/schemas/RecipeCreateStepEntry'
   *     responses:
   *       204:
   *         description: Recipe steps added
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async addRecipeSteps(
    req: Request<{ id: string }, unknown, RecipeCreateStepsEntry>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.addRecipeSteps(req.params.id, req.body);
      res.status(204).send();
    } catch (err) {
      const errorData = (err as AxiosError<ExceptionErrorResponse | object>)?.response?.data;
      if (errorData && "type" in errorData && errorData.type === EntityNotFoundErrorType) {
        const typedErrorData = errorData as ExceptionErrorResponse;
        return res.status(404).send({
          type: EntityNotFoundErrorType,
          exceptionMessage: typedErrorData.exceptionMessage,
          params: typedErrorData.params,
        });
      }
      next(err);
    }
  }
}

export default RecipesRouter;
