import { InvalidParameterError } from "@rcp-and-plan/commons";
import { Application, NextFunction, Request, Response, Router } from "express";
import Container, { Service } from "typedi";

import { IIngredientApplication } from "@application/commands/ingredients/IIngredientApplication";
import { IngredientApplication } from "@application/commands/ingredients/IngredientApplication";
import { IngredientCreateRequest, IngredientEditRequest, IngredientsListResponse } from "@dtos/index";
import { IIngredientQueries, IngredientQueries } from "@infrastructure/ingredients/queries";

/**
 * @openapi
 * tags:
 * - name: Ingredients
 *   description: Use cases for ingredients content
 * components:
 *   schemas:
 *     IngredientLanguageRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *     IngredientCreateRequest:
 *       type: object
 *       properties:
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/IngredientLanguageRequest'
 *     IngredientEditRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/IngredientLanguageRequest'
 *     IngredientsListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/IngredientsListItemResponse'
 *     IngredientsListItemContentResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *     IngredientsListItemResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/IngredientsListItemContentResponse'
 */
@Service()
class IngredientsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public setupRouter(app: Application) {
    app.use("/ingredients", this.router);
    this.routes();
  }

  /**
   * Sets up the routes for the UnitsRouter class.
   *
   * This method configures the routes for the UnitsRouter class by assigning the appropriate request handlers to the corresponding HTTP methods and paths.
   *
   */
  private routes(): void {
    this.router.get("/", this.getIngredients);
    this.router.post("/", this.createIngredient);
    this.router.put("/", this.editIngredient);
    this.router.delete("/:id", this.deleteIngredient);
  }

  /**
   * @openapi
   * /ingredients:
   *   get:
   *     summary: Returns a list of ingredients.
   *     tags: [Ingredients]
   *     parameters:
   *       - $ref: '#/components/parameters/Accept-Language'
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/IngredientsListResponse'
   */
  private async getIngredients(_req: Request<unknown, IngredientsListResponse>, res: Response) {
    const ingredientQueries = Container.get<IIngredientQueries>(IngredientQueries);
    const response = await ingredientQueries.getData();

    res.send(response);
  }

  /**
   * @openapi
   * /ingredients:
   *   post:
   *     summary: Creates a new ingredient.
   *     tags: [Ingredients]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/IngredientCreateRequest'
   *     responses:
   *       201:
   *         description: Ingredient created
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async createIngredient(
    req: Request<unknown, unknown, IngredientCreateRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const ingredientApplication = Container.get<IIngredientApplication>(IngredientApplication);

      await ingredientApplication.createIngredient(req.body);

      res.status(201).send();
    } catch (err) {
      if (err instanceof InvalidParameterError) {
        return res.status(400).send({ type: err.type, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /ingredients:
   *   put:
   *     summary: Edits an ingredient.
   *     tags: [Ingredients]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/IngredientEditRequest'
   *     responses:
   *       204:
   *         description: Ingredient modified
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async editIngredient(
    req: Request<unknown, unknown, IngredientEditRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const ingredientApplication = Container.get<IIngredientApplication>(IngredientApplication);

      await ingredientApplication.editIngredient(req.body);

      res.status(204).send();
    } catch (err) {
      if (err instanceof InvalidParameterError) {
        return res.status(400).send({ type: err.type, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /ingredients/{id}:
   *   delete:
   *     summary: Deletes an ingredient.
   *     tags: [Ingredients]
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the ingredient to delete.
   *     responses:
   *       204:
   *         description: Ingredient deleted
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async deleteIngredient(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const ingredientApplication = Container.get<IIngredientApplication>(IngredientApplication);

      await ingredientApplication.deleteIngredient(req.params.id);

      res.status(204).send();
    } catch (err) {
      if (err instanceof InvalidParameterError) {
        return res.status(400).send({ type: err.type, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }
}

export default IngredientsRouter;