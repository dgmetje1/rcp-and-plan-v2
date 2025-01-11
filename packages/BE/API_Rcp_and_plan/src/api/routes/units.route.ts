import { Application, NextFunction, Request, Response, Router } from "express";
import { ExceptionErrorResponse, InvalidParameterErrorType } from "@rcp-and-plan/commons";
import { AxiosError } from "axios";
import Container, { Service } from "typedi";

import checkAuthentication from "@api/middleware/auth";
import { userMiddleware } from "@api/middleware/user";
import { ContentService } from "@api/services/content";
import { UnitCreateEntry } from "@dtos/entries/units/UnitCreateEntry";
import { UnitEditEntry } from "@dtos/entries/units/UnitEditEntry";
import { UnitsListOutput } from "@dtos/outputs";

/**
 * @openapi
 * tags:
 * - name: Units
 *   description: Use cases for units content
 * components:
 *   schemas:
 *     UnitContentEntry:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *         shortName:
 *           type: string
 *     UnitCreateEntry:
 *       type: object
 *       properties:
 *         isVisible:
 *           type: boolean
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/UnitContentEntry'
 *     UnitEditEntry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         isVisible:
 *           type: boolean
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/UnitContentEntry'
 *     UnitsListOutput:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UnitsListItemOutput'
 *     UnitsListItemContentOutput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *         shortName:
 *           type: string
 *     UnitsListItemOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         isVisible:
 *           type: boolean
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/UnitListItemContentOutput'
 */
@Service()
class UnitsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public setupRouter(app: Application) {
    app.use("/units", this.router);
    this.routes();
  }

  /**
   * Sets up the routes for the UnitsRouter class.
   *
   * This method configures the routes for the UnitsRouter class by assigning the appropriate request handlers to the corresponding HTTP methods and paths.
   *
   */
  private routes(): void {
    this.router.get("/", this.getUnits);
    this.router.post("/", checkAuthentication, userMiddleware, this.createUnit);
    this.router.put("/", checkAuthentication, userMiddleware, this.editUnit);
    this.router.delete("/:id", checkAuthentication, userMiddleware, this.deleteUnit);
  }

  /**
   * @openapi
   * /units:
   *   get:
   *     summary: Returns a list of units.
   *     tags: [Units]
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnitsListOutput'
   */
  private async getUnits(req: Request, res: Response<UnitsListOutput>) {
    const contentService = Container.get<ContentService>(ContentService);
    const response = await contentService.getUnits(req.headers);

    res.send(response.data);
  }

  /**
   * @openapi
   * /units:
   *   post:
   *     summary: Creates a new unit.
   *     tags: [Units]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UnitCreateEntry'
   *     responses:
   *       201:
   *         description: Unit created
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */

  private async createUnit(req: Request<unknown, unknown, UnitCreateEntry>, res: Response, next: NextFunction) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.createUnit(req.body, req.headers);

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
   * /units:
   *   put:
   *     summary: Edits a unit.
   *     tags: [Units]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UnitEditEntry'
   *     responses:
   *       204:
   *         description: Unit modified
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */

  private async editUnit(req: Request<unknown, unknown, UnitEditEntry>, res: Response, next: NextFunction) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.editUnit(req.body, req.headers);

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
   * /units/{id}:
   *   delete:
   *     summary: Deletes a unit.
   *     tags: [Units]
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
   *         description: Unit deleted
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */

  private async deleteUnit(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.deleteUnit(req.params.id, req.headers);

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

export default UnitsRouter;
