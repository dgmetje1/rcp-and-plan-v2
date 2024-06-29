import { EntityNotFoundError } from "@rcp-and-plan/commons";
import { Application, NextFunction, type Request, type Response, Router } from "express";
import Container, { Service } from "typedi";

import { IUserQueries, UserQueries } from "@application/queries/users/IUserQueries";

/**
 * @openapi
 * tags:
 * - name: User
 *   description: Use cases for users content
 * components:
 *  schemas:
 *   UserAccountResponse:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       accountId:
 *         type: string
 *       email:
 *         type: string
 *       nickName:
 *         type: string
 *       name:
 *         type: string
 *       lastName:
 *         type: string
 *       language:
 *         type: string
 *       profilePicture:
 *         type: string
 *         nullable: true
 *   UserSummaryResponse:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       nickName:
 *         type: string
 *       name:
 *         type: string
 *       lastName:
 *         type: string
 *       profilePicture:
 *         type: string
 *         nullable: true
 */
@Service()
class UsersRouter {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public setupRouter(app: Application) {
    app.use("/users", this.router);
    this.routes();
  }

  /**
   * Sets up the routes for the UsersRouter class.
   *
   * This method configures the routes for the UsersRouter class by assigning the appropriate request handlers to the corresponding HTTP methods and paths.
   *
   */
  private routes(): void {
    this.router.get("/account/:accountId", this.getUserByAccountId);
    this.router.get("/:id", this.getUserById);
    this.router.get("/:id/summary", this.getUserSummaryById);
  }

  /**
   * @openapi
   * /users/account/{accountId}:
   *   get:
   *     summary: Returns a user account.
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: accountId
   *         type: string
   *         required: true
   *         description: ID of the user to get.
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserAccountResponse'
   */
  private async getUserByAccountId(req: Request, res: Response, next: NextFunction) {
    try {
      const userQueries = Container.get<IUserQueries>(UserQueries);
      const response = await userQueries.getDataByAccountId(req.params.accountId);

      res.send(response);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send({ type: err.type, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /users/{id}:
   *   get:
   *     summary: Returns a user account.
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the user to get.
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserAccountResponse'
   */
  private async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userQueries = Container.get<IUserQueries>(UserQueries);
      const response = await userQueries.getDataById(req.params.id);

      res.send(response);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send({ type: err.type, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /users/{id}/summary:
   *   get:
   *     summary: Returns a user's summary.
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *         description: ID of the user to get.
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserSummaryResponse'
   */
  private async getUserSummaryById(req: Request, res: Response, next: NextFunction) {
    try {
      const userQueries = Container.get<IUserQueries>(UserQueries);
      const response = await userQueries.getDataSummaryById(req.params.id);

      res.send(response);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return res.status(404).send({ type: err.type, exceptionMessage: err.message, params: err.params });
      }
      next(err);
    }
  }
}

export default UsersRouter;
