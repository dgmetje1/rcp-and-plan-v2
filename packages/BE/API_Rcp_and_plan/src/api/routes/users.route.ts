import { Application, NextFunction, type Request, type Response, Router } from "express";
import { EntityNotFoundErrorType, ExceptionErrorResponse } from "@rcp-and-plan/commons";
import { AxiosError } from "axios";
import Container, { Service } from "typedi";

import authMiddleware from "@api/middleware/auth/authMiddleware";
import { userMiddleware } from "@api/middleware/user";
import { SocialService } from "@api/services/social";
import { UserAccountOutput } from "@dtos/outputs/UserAccountOutput";

/**
 * @openapi
 * tags:
 * - name: User
 *   description: Use cases for users content
 * components:
 *  schemas:
 *   UserAccountOutput:
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.router.get("/account", authMiddleware, this.getUserByAccountId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.router.get("/", authMiddleware, userMiddleware, this.getUserById);
  }

  /**
   * @openapi
   * /users/account:
   *   get:
   *     summary: Returns a user account.
   *     tags: [User]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserAccountOutput'
   */
  private async getUserByAccountId(
    req: Request,
    res: Response<UserAccountOutput | ExceptionErrorResponse>,
    next: NextFunction,
  ) {
    try {
      const socialService = Container.get<SocialService>(SocialService);

      const accountId = req.auth?.payload.sub?.split("|").pop() || "";
      const response = await socialService.getUserByAccountId(accountId);

      res.send(response.data);
    } catch (err: unknown) {
      const errorData = (err as AxiosError<ExceptionErrorResponse | object>)?.response?.data;
      if (errorData && "type" in errorData && errorData.type === EntityNotFoundErrorType) {
        const typedErrorData = errorData as ExceptionErrorResponse;
        return res.status(404).send({
          type: EntityNotFoundErrorType,
          exceptionMessage: typedErrorData.exceptionMessage,
          params: typedErrorData.params,
        });
      }
      next(err);
    }
  }

  /**
   * @openapi
   * /users:
   *   get:
   *     summary: Returns a user profile.
   *     tags: [User]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserAccountOutput'
   */
  private async getUserById(req: Request, res: Response<UserAccountOutput>, next: NextFunction) {
    try {
      const socialService = Container.get<SocialService>(SocialService);
      const response = await socialService.getUserById(req.context.user.id);
      res.send(response.data);
    } catch (err) {
      next(err);
    }
  }
}

export default UsersRouter;
