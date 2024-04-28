import {
  Application,
  NextFunction,
  Router,
  type Request,
  type Response,
} from "express";

import Container from "@api/DI";
import { ContentService } from "@api/services/content";
import { RecipesListQueryEntry } from "@dtos/entries/RecipeListQueryEntry";
import { EntityNotFoundError } from "common/EntityNotFoundError";

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
  private async getRecipes(
    req: Request<unknown, unknown, unknown, RecipesListQueryEntry>,
    res: Response,
  ) {
    const { container } = await Container.getInstance();

    const contentService = container.get<ContentService>("ContentService");
    const response = await contentService.getRecipes(req.query);
    res.send(response.data);
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

    const contentService = container.get<ContentService>("ContentService");
    const response = await contentService.getDailyRecipe();
    res.send(response.data);
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
   *       400:
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async getRecipeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { container } = await Container.getInstance();

      const recipesQueries = container.get<ContentService>("ContentService");
      const response = await recipesQueries.getRecipeById(+req.params.id);
      res.send(response.data);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        res
          .status(404)
          .send({ exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }
}

export default RecipesRouter;
