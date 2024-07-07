import { Application, Request, Response, Router } from "express";
import Container, { Service } from "typedi";

import { ContentService } from "@api/services/content";
import { UnitsListOutput } from "@dtos/outputs";

/**
 * @openapi
 * tags:
 * - name: Units
 *   description: Use cases for units content
 * components:
 *   schemas:
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
  private async getUnits(_req: Request, res: Response<UnitsListOutput>) {
    const contentService = Container.get<ContentService>(ContentService);
    const response = await contentService.getUnits();

    res.send(response.data);
  }
}

export default UnitsRouter;
