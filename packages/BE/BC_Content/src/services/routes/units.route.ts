import { InvalidParameterError } from "@rcp-and-plan/commons";
import { Application, NextFunction, Request, Response, Router } from "express";
import Container, { Service } from "typedi";

import { IUnitApplication } from "@application/commands/units/IUnitApplication";
import { UnitApplication } from "@application/commands/units/UnitApplication";
import { UnitCreateRequest, UnitEditRequest, UnitsListResponse } from "@dtos/index";
import { IUnitQueries, UnitQueries } from "@infrastructure/units/queries";

/**
 * @openapi
 * tags:
 * - name: Units
 *   description: Use cases for units content
 * components:
 *   schemas:
 *     UnitLanguageRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *         shortName:
 *           type: string
 *     UnitCreateRequest:
 *       type: object
 *       properties:
 *         isVisible:
 *           type: boolean
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/UnitLanguageRequest'
 *     UnitEditRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         isVisible:
 *           type: boolean
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/UnitLanguageRequest'
 *     UnitsListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UnitsListItemResponse'
 *     UnitsListItemContentResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singularName:
 *           type: string
 *         shortName:
 *           type: string
 *     UnitsListItemResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         isVisible:
 *           type: boolean
 *         content:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/UnitListItemContentResponse'
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
    this.router.post("/", this.createUnit);
    this.router.put("/", this.editUnit);
  }

  /**
   * @openapi
   * /units:
   *   get:
   *     summary: Returns a list of units.
   *     tags: [Units]
   *     parameters:
   *       - $ref: '#/components/parameters/Accept-Language'
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnitsListResponse'
   */
  private async getUnits(_req: Request<unknown, UnitsListResponse>, res: Response) {
    const unitQueries = Container.get<IUnitQueries>(UnitQueries);
    const response = await unitQueries.getData();

    res.send(response);
  }

  /**
   * @openapi
   * /units:
   *   post:
   *     summary: Creates a new unit.
   *     tags: [Units]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UnitCreateRequest'
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
  private async createUnit(req: Request<unknown, unknown, UnitCreateRequest>, res: Response, next: NextFunction) {
    try {
      const unitApplication = Container.get<IUnitApplication>(UnitApplication);

      await unitApplication.createUnit(req.body);

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
   * /units:
   *   put:
   *     summary: Edits a unit.
   *     tags: [Units]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UnitEditRequest'
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
  private async editUnit(req: Request<unknown, unknown, UnitEditRequest>, res: Response, next: NextFunction) {
    try {
      const unitApplication = Container.get<IUnitApplication>(UnitApplication);

      await unitApplication.editUnit(req.body);

      res.status(204).send();
    } catch (err) {
      if (err instanceof InvalidParameterError) {
        return res.status(400).send({ type: err.type, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }
}

export default UnitsRouter;
