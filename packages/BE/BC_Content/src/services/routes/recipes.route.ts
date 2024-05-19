import { EntityNotFoundError } from "@rcp-and-plan/commons";
import { Application, NextFunction, type Request, type Response, Router } from "express";

import { IRecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import { RecipesListQueryRequest } from "@dtos/requests/RecipesListQueryRequest";
import { DEFAULT_LANGUAGE, Languages } from "@global_types/languages";
import Container from "@services/DI";

/**
 * @openapi
 * tags:
 * - name: Recipes
 *   description: Use cases for recipes content
 * components:
 *  schemas:
 *   RecipesListResponse:
 *      type: array
 *      items:
 *         $ref: '#/components/schemas/RecipeListResponse'
 *   RecipeListResponse:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       thumbnailUrl:
 *         type: string
 *   RecipeResponse:
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
 *   RecipeDailyResponse:
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
 *            $ref: '#/components/schemas/RecipeCategoryResponse'
 *       ingredients:
 *         type: array
 *         items:
 *            $ref: '#/components/schemas/RecipeIngredientResponse'
 *   RecipeCategoryResponse:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *   RecipeIngredientResponse:
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
 *              type: string
 *            name:
 *              type: string
 *            shortName:
 *              type: string
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
   *         type: integer
   *         required: false
   *         description: Numeric ID of the category to get.
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecipesListResponse'
   */
  private async getRecipes(req: Request<unknown, unknown, unknown, RecipesListQueryRequest>, res: Response) {
    const { container } = await Container.getInstance();

    const recipesQueries = container.get<IRecipeQueries>("RecipeQueries");
    const response = await recipesQueries.getData(
      req.query,
      (req.headers["accept-language"] as Languages) ?? DEFAULT_LANGUAGE,
    );
    res.send(response);
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
   *               $ref: '#/components/schemas/RecipeDailyResponse'
   *       404:
   *         description: Recipe not found
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async getDailyRecipe(req: Request, res: Response, next: NextFunction) {
    const { container } = await Container.getInstance();

    try {
      const recipesQueries = container.get<IRecipeQueries>("RecipeQueries");
      const response = await recipesQueries.getDailyData(
        (req.headers["accept-language"] as Languages) ?? DEFAULT_LANGUAGE,
      );

      res.send(response);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send({ exceptionMessage: err.message, params: err.params });
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
   *               $ref: '#/components/schemas/RecipeResponse'
   *       404:
   *         description: Recipe not found
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async getRecipeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { container } = await Container.getInstance();

      const recipesQueries = container.get<IRecipeQueries>("RecipeQueries");
      const response = await recipesQueries.getDataById(
        req.params.id,
        (req.headers["accept-language"] as Languages) ?? DEFAULT_LANGUAGE,
      );
      res.send(response);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send({ exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }
}

export default RecipesRouter;
