import { Application, Request, Response, Router } from "express";
import Container, { Service } from "typedi";

import { UnitsListResponse } from "@dtos/index";
import { IUnitQueries, UnitQueries } from "@infrastructure/units/queries";

/**
 * @openapi
 * tags:
 * - name: Units
 *   description: Use cases for units content
 * components:
 *   schemas:
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
   *               $ref: '#/components/schemas/UnitsListResponse'
   */
  private async getUnits(_req: Request<unknown, UnitsListResponse>, res: Response) {
    const unitQueries = Container.get<IUnitQueries>(UnitQueries);
    const response = await unitQueries.getData();

    res.send(response);
  }
}

export default UnitsRouter;
