import { Application, NextFunction, Request, Response, Router } from "express";
import { ExceptionErrorResponse, InvalidParameterErrorType } from "@rcp-and-plan/commons";
import { AxiosError } from "axios";
import Container, { Service } from "typedi";

import checkAuthentication from "@api/middleware/auth";
import { userMiddleware } from "@api/middleware/user";
import { ContentService } from "@api/services/content";
import { KitchenwareCreateEntry, KitchenwareEditEntry, KitchenwareMergeEntry } from "@dtos/entries";
import { KitchenwareListOutput } from "@dtos/outputs";

/**
 * @openapi
 * tags:
 * - name: Kitchenware
 *   description: Use cases for kitchenware content
 * components:
 *   schemas:
 *     KitchenwareContentEntry:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *     KitchenwareCreateEntry:
 *       type: object
 *       properties:
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/KitchenwareContentEntry'
 *     KitchenwareMergeEntry:
 *       type: object
 *       properties:
 *         targetId:
 *           type: string
 *         kitchenwareIds:
 *           type: array
 *           items:
 *             type: string
 *     KitchenwareEditEntry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/KitchenwareContentEntry'
 *     KitchenwareListOutput:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/KitchenwareListItemOutput'
 *     KitchenwareListItemContentOutput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *     KitchenwareListItemOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/KitchenwareListItemContentOutput'
 */
@Service()
class KitchenwareRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public setupRouter(app: Application) {
    app.use("/kitchenware", this.router);
    this.routes();
  }

  /**
   * Sets up the routes for the KitchenwareRouter class.
   *
   * This method configures the routes for the KitchenwareRouter class by assigning the appropriate request handlers to the corresponding HTTP methods and paths.
   *
   */
  private routes(): void {
    this.router.get("/", this.getKitchenware);
    this.router.post("/", checkAuthentication, userMiddleware, this.createKitchenware);
    this.router.put("/", checkAuthentication, userMiddleware, this.editKitchenware);
    this.router.delete("/:id", checkAuthentication, userMiddleware, this.deleteKitchenware);
    this.router.post("/merge", checkAuthentication, userMiddleware, this.mergeKitchenware);
  }

  /**
   * @openapi
   * /kitchenware:
   *   get:
   *     summary: Returns a list of kitchenware.
   *     tags: [Kitchenware]
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/KitchenwareListOutput'
   */
  private async getKitchenware(req: Request, res: Response<KitchenwareListOutput>) {
    const contentService = Container.get<ContentService>(ContentService);
    const response = await contentService.getKitchenware(req.headers);

    res.send(response.data);
  }

  /**
   * @openapi
   * /kitchenware:
   *   post:
   *     summary: Creates a new kitchenware.
   *     tags: [Kitchenware]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/KitchenwareCreateEntry'
   *     responses:
   *       201:
   *         description: Kitchenware created
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */

  private async createKitchenware(
    req: Request<unknown, unknown, KitchenwareCreateEntry>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.createKitchenware(req.body, req.headers);

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
   * /kitchenware:
   *   put:
   *     summary: Edits a kitchenware.
   *     tags: [Kitchenware]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/KitchenwareEditEntry'
   *     responses:
   *       204:
   *         description: Kitchenware modified
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */

  private async editKitchenware(
    req: Request<unknown, unknown, KitchenwareEditEntry>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.editKitchenware(req.body, req.headers);

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
   * /kitchenware/{id}:
   *   delete:
   *     summary: Deletes a kitchenware.
   *     tags: [Kitchenware]
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
   *         description: Kitchenware deleted
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */

  private async deleteKitchenware(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.deleteKitchenware(req.params.id, req.headers);

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
   * /kitchenware/merge:
   *   post:
   *     summary: Merges two or more kitchenware.
   *     tags: [Kitchenware]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/KitchenwareMergeEntry'
   *     responses:
   *       204:
   *         description: Kitchenware merged
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */

  private async mergeKitchenware(
    req: Request<unknown, unknown, KitchenwareMergeEntry>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const contentService = Container.get<ContentService>(ContentService);
      await contentService.mergeKitchenware(req.body, req.headers);

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

export default KitchenwareRouter;
