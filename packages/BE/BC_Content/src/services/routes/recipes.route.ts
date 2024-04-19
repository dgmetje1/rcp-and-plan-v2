import { Application, type Request, type Response, Router } from "express";

import { IRecipeQueries } from "@application/queries/recipes/IRecipeQueries";
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
 *         type: integer
 *       title:
 *         type: string
 *       thumbnailUrl:
 *         type: string
 *   RecipeResponse:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
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
 *         type: integer
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
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecipesListResponse'
   */
  private async getRecipes(req: Request, res: Response) {
    const { container } = await Container.getInstance();

    const recipesQueries = container.get<IRecipeQueries>("RecipeQueries");
    const response = await recipesQueries.getData();
    res.send(response);
  }

  /**
   * @openapi
   * /recipes/daily:
   *   get:
   *     summary: Returns a daily highlighted recipe.
   *     tags: [Recipes]
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecipeDailyResponse'
   */
  private async getDailyRecipe(req: Request, res: Response) {
    const { container } = await Container.getInstance();

    const recipesQueries = container.get<IRecipeQueries>("RecipeQueries");
    const response = await recipesQueries.getDailyData();
    res.send(response);
  }
  /**
   * @openapi
   * /recipes/{id}:
   *   get:
   *     summary: Returns a recipe detail.
   *     tags: [Recipes]
   *     parameters:
   *       - in: path
   *         name: id
   *         type: integer
   *         required: true
   *         description: Numeric ID of the user to get.
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RecipeResponse'
   */
  private async getRecipeById(req: Request, res: Response) {
    const { container } = await Container.getInstance();

    const recipesQueries = container.get<IRecipeQueries>("RecipeQueries");
    const response = await recipesQueries.getDataById(+req.params.id);
    res.send(response);
  }
}

export default RecipesRouter;
