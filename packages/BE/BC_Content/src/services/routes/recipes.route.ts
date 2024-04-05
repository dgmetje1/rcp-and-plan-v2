import { IRecipeQueries } from "@application/queries/recipes/IRecipeQueries";
import Container from "@services/DI";
import { Application, type Request, type Response, Router } from "express";

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
 *       recipe_id:
 *         type: integer
 *       title:
 *         type: string
 *       thumbnail_url:
 *         type: string
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
    //#swagger.tags = ["Recipes"]

    const { container } = await Container.getInstance();

    const recipesQueries = container.get<IRecipeQueries>("RecipeQueries");
    const exampleData = await recipesQueries.getData();
    res.send(exampleData);
  }
}

export default RecipesRouter;
