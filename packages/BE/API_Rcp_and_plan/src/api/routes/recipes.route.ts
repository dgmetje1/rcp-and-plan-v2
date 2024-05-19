import { Application, NextFunction, type Request, type Response, Router } from "express";
import { EntityNotFoundError, EntityNotFoundErrorType, ExceptionErrorResponse } from "@rcp-and-plan/commons";

import Container from "@api/DI";
import { ContentService } from "@api/services/content";
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
    const { container } = await Container.getInstance();

    const contentService = container.get<ContentService>("ContentService");
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
    const { container } = await Container.getInstance();

    try {
      const contentService = container.get<ContentService>("ContentService");
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
      const { container } = await Container.getInstance();

      const recipesQueries = container.get<ContentService>("ContentService");
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
}

export default RecipesRouter;
