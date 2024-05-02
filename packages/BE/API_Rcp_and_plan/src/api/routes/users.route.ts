import {
  Application,
  NextFunction,
  Router,
  type Request,
  type Response,
} from "express";

import Container from "@api/DI";
import { SocialService } from "@api/services/social";
import { UserAccountOutput } from "@dtos/outputs/UserAccountOutput";
import authMiddleware from "@api/middleware/auth/authMiddleware";

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
    this.router.get("/account", authMiddleware, this.getUserByAccountId);
    this.router.get("/", authMiddleware, this.getUserById);
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
    res: Response<UserAccountOutput>,
    next: NextFunction,
  ) {
    const { container } = await Container.getInstance();
    try {
      const socialService = container.get<SocialService>("SocialService");

      const accountId = req.auth?.payload.sub?.split("|").pop() || "";
      const response = await socialService.getUserByAccountId(accountId);

      res.send(response.data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @openapi
   * /users/{id}:
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
  private async getUserById(req: Request, res: Response<UserAccountOutput>) {
    const { container } = await Container.getInstance();

    const socialService = container.get<SocialService>("SocialService");
    const response = await socialService.getUserById(req.params.id);
    res.send(response.data);
  }
}

export default UsersRouter;
