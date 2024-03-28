import { ExampleApplication } from "@application/example/ExampleApplication";
import Container from "@services/DI";
import { Router, type Request, type Response } from "express";

class ExampleRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/", this.getExample);
    this.router.get("/:id", this.getExampleById);
    this.router.post("/", this.postExample);
  }

  private async getExample(req: Request, res: Response) {
    //#swagger.tags = ["Example"]

    const { container } = await Container.getInstance();

    const exampleApplication =
      container.get<ExampleApplication>("ExampleApplication");
    const exampleData = exampleApplication.getData();
    res.send(exampleData);
  }

  private async getExampleById(req: Request, res: Response) {
    //#swagger.tags = ["Example"]
    const { container } = await Container.getInstance();

    const exampleApplication =
      container.get<ExampleApplication>("ExampleApplication");
    const exampleData = exampleApplication.getDataById(parseInt(req.params.id));
    res.send(exampleData);
  }

  private async postExample(req: Request, res: Response) {
    //#swagger.tags = ["Example"]
    const { container } = await Container.getInstance();
    const exampleApplication =
      container.get<ExampleApplication>("ExampleApplication");

    try {
      exampleApplication.postExample(req.body);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default ExampleRoute;
