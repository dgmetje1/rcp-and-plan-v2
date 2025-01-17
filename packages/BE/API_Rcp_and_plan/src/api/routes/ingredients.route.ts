import { Application, NextFunction, Request, Response, Router } from "express";
import { ExceptionErrorResponse, InvalidParameterErrorType } from "@rcp-and-plan/commons";
import { AxiosError } from "axios";
import Container, { Service } from "typedi";

import checkAuthentication from "@api/middleware/auth";
import { userMiddleware } from "@api/middleware/user";
import { ContentService } from "@api/services/content";
import { IngredientCreateEntry } from "@dtos/entries/ingredients/IngredientCreateEntry";
import { IngredientEditEntry } from "@dtos/entries/ingredients/IngredientEditEntry";
import { IngredientsListOutput } from "@dtos/outputs";

/**
 * @openapi
 * tags:
 * - name: Ingredients
 *   description: Use cases for ingredients content
 * components:
 *   schemas:
 *     IngredientContentEntry:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *     IngredientCreateEntry:
 *       type: object
 *       properties:
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/IngredientContentEntry'
 *     IngredientEditEntry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/IngredientContentEntry'
 *     IngredientsListOutput:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/IngredientsListItemOutput'
 *     IngredientsListItemContentOutput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *     IngredientsListItemOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/IngredientListItemContentOutput'
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
   * Sets up the routes for the IngredientsRouter class.
   *
   * This method configures the routes for the IngredientsRouter class by assigning the appropriate request handlers to the corresponding HTTP methods and paths.
   *
   */
  private routes(): void {
    this.router.get("/", this.getIngredients);
    this.router.post("/", checkAuthentication, userMiddleware, this.createIngredient);
    this.router.put("/", checkAuthentication, userMiddleware, this.editIngredient);
    this.router.delete("/:id", checkAuthentication, userMiddleware, this.deleteIngredient);
  }

  /**
   * @openapi
   * /ingredients:
   *   get:
   *     summary: Returns a list of ingredients.
   *     tags: [Ingredients]
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/IngredientsListOutput'
   */
  private async getIngredients(req: Request, res: Response<IngredientsListOutput>) {
    const contentService = Container.get<ContentService>(ContentService);
    const response = await contentService.getIngredients(req.headers);

    res.send(response.data);
  }

  /**
   * @openapi
   * /ingredients:
   *   post:
   *     summary: Creates a new ingredient.
   *     tags: [Ingredients]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/IngredientCreateEntry'
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
    req: Request<unknown, unknown, IngredientCreateEntry>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.createIngredient(req.body, req.headers);

      res.status(201).send();
    } catch (err) {
      const errorData = (err as AxiosError<ExceptionErrorResponse | object>)?.response?.data;
      if (errorData && "type" in errorData && errorData.type === InvalidParameterErrorType) {
        const typedErrorData = errorData as ExceptionErrorResponse;
        return res.status(400).send({
          type: InvalidParameterErrorType,
          exceptionMessage: typedErrorData.exceptionMessage,
          params: typedErrorData.params,
        });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /ingredients:
   *   put:
   *     summary: Edits a ingredient.
   *     tags: [Ingredients]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/IngredientEditEntry'
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

  private async editIngredient(req: Request<unknown, unknown, IngredientEditEntry>, res: Response, next: NextFunction) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.editIngredient(req.body, req.headers);

      res.status(204).send();
    } catch (err) {
      const errorData = (err as AxiosError<ExceptionErrorResponse | object>)?.response?.data;
      if (errorData && "type" in errorData && errorData.type === InvalidParameterErrorType) {
        const typedErrorData = errorData as ExceptionErrorResponse;
        return res.status(400).send({
          type: InvalidParameterErrorType,
          exceptionMessage: typedErrorData.exceptionMessage,
          params: typedErrorData.params,
        });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /ingredients/{id}:
   *   delete:
   *     summary: Deletes a ingredient.
   *     tags: [Ingredients]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the recipe to get.
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
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.deleteIngredient(req.params.id, req.headers);

      res.status(204).send();
    } catch (err) {
      const errorData = (err as AxiosError<ExceptionErrorResponse | object>)?.response?.data;
      if (errorData && "type" in errorData && errorData.type === InvalidParameterErrorType) {
        const typedErrorData = errorData as ExceptionErrorResponse;
        return res.status(400).send({
          type: InvalidParameterErrorType,
          exceptionMessage: typedErrorData.exceptionMessage,
          params: typedErrorData.params,
        });
      }
      next(err);
    }
  }
}

export default IngredientsRouter;
