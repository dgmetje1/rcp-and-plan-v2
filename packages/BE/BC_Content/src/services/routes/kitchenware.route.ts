import { InvalidParameterError } from "@rcp-and-plan/commons";
import { Application, NextFunction, Request, Response, Router } from "express";
import Container, { Service } from "typedi";

import { IKitchenwareApplication } from "@application/commands/kitchenware/IKitchenwareApplication";
import { KitchenwareApplication } from "@application/commands/kitchenware/KitchenwareApplication";
import { IKitchenwareQueries, KitchenwareQueries } from "@application/queries/kitchenware/IKitchenwareQueries";
import {
  KitchenwareCreateRequest,
  KitchenwareEditRequest,
  KitchenwareListResponse,
  KitchenwareMergeRequest,
} from "@dtos/index";

/**
 * @openapi
 * tags:
 * - name: Kitchenware
 *   description: Use cases for kitchenware content
 * components:
 *   schemas:
 *     KitchenwareLanguageRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *     KitchenwareCreateRequest:
 *       type: object
 *       properties:
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/KitchenwareLanguageRequest'
 *     KitchenwareEditRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/KitchenwareLanguageRequest'
 *     KitchenwareMergeRequest:
 *       type: object
 *       properties:
 *         targetId:
 *           type: string
 *         toolIds:
 *           type: array
 *           items:
 *             type: string
 *     KitchenwareListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/KitchenwareListItemResponse'
 *     KitchenwareListItemContentResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *     KitchenwareListItemResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/KitchenwareListItemContentResponse'
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
   * Sets up the routes for the UnitsRouter class.
   *
   * This method configures the routes for the UnitsRouter class by assigning the appropriate request handlers to the corresponding HTTP methods and paths.
   *
   */
  private routes(): void {
    this.router.get("/", this.getKitchenware);
    this.router.post("/", this.createKitchenware);
    this.router.put("/", this.editKitchenware);
    this.router.delete("/:id", this.deleteKitchenware);
    this.router.post("/merge", this.mergeKitchenware);
  }

  /**
   * @openapi
   * /kitchenware:
   *   get:
   *     summary: Returns a list of kitchenwares.
   *     tags: [Kitchenware]
   *     parameters:
   *       - $ref: '#/components/parameters/Accept-Language'
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/KitchenwareListResponse'
   */
  private async getKitchenware(_req: Request<unknown, KitchenwareListResponse>, res: Response) {
    const kitchenwareQueries = Container.get<IKitchenwareQueries>(KitchenwareQueries);
    const response = await kitchenwareQueries.getData();

    res.send(response);
  }

  /**
   * @openapi
   * /kitchenware:
   *   post:
   *     summary: Creates a new tool.
   *     tags: [Kitchenware]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/KitchenwareCreateRequest'
   *     responses:
   *       201:
   *         description: Tool created
   *       400:
   *         description: Error in request fields
   *         content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Exception'
   */
  private async createKitchenware(
    req: Request<unknown, unknown, KitchenwareCreateRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const kitchenwareApplication = Container.get<IKitchenwareApplication>(KitchenwareApplication);

      await kitchenwareApplication.createKitchenware(req.body);

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
   * /kitchenware:
   *   put:
   *     summary: Edits a tool.
   *     tags: [Kitchenware]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/KitchenwareEditRequest'
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
  private async editKitchenware(
    req: Request<unknown, unknown, KitchenwareEditRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const kitchenwareApplication = Container.get<IKitchenwareApplication>(KitchenwareApplication);

      await kitchenwareApplication.editKitchenware(req.body);

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
   * /kitchenware/{id}:
   *   delete:
   *     summary: Deletes a tool.
   *     tags: [Kitchenware]
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the tool to delete.
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
      const kitchenwareApplication = Container.get<IKitchenwareApplication>(KitchenwareApplication);

      await kitchenwareApplication.deleteKitchenware(req.params.id);

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
   * /kitchenware/merge:
   *   post:
   *     summary: Merges multiple kitchenware into one.
   *     tags: [Kitchenware]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/KitchenwareMergeRequest'
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
    req: Request<unknown, unknown, KitchenwareMergeRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const kitchenwareApplication = Container.get<IKitchenwareApplication>(KitchenwareApplication);

      await kitchenwareApplication.mergeKitchenware(req.body);

      res.status(204).send();
    } catch (err) {
      if (err instanceof InvalidParameterError) {
        return res.status(400).send({ type: err.type, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }
}

export default KitchenwareRouter;
