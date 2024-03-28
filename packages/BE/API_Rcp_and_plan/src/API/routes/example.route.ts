import { Router, type Request, type Response } from "express";

import Container from "API/DI";
import authMiddleware from "API/middleware/auth";
import { SocialService } from "API/services/social/socialService";

class ExampleRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/", this.getExample);
    this.router.get("/:id", this.getExampleById);
    this.router.post("/", authMiddleware, this.postExample);
  }

  private async getExample(req: Request, res: Response) {
    //#swagger.tags = ["Example"]

    const { container } = await Container.getInstance();
    const socialService = container.get<SocialService>("SocialService");

    const response = await socialService.getData();

    if (response.status === 200) res.send(response.data);
    else res.send(new Error("Service error"));
  }

  private async getExampleById(req: Request, res: Response) {
    //#swagger.tags = ["Example"]
    const { container } = await Container.getInstance();
    const socialService = container.get<SocialService>("SocialService");

    const response = await socialService.getDataById(parseInt(req.params.id));

    if (response.status === 200) res.send(response.data);
    else res.send(new Error("Service error"));
  }

  private async postExample(req: Request, res: Response) {
    //#swagger.tags = ["Example"]
    /* #swagger.security = [{
            "bearerAuth": []
    }] */

    const { container } = await Container.getInstance();
    const socialService = container.get<SocialService>("SocialService");

    try {
      await socialService.postExample(req.body);

      res.sendStatus(204);
    } catch (err) {
      res.status(500).send("Service error");
    }
  }
}

export default ExampleRoute;
