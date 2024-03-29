import express from "express";
import swaggerUi from "swagger-ui-express";
import compress from "compression";
import helmet from "helmet";
import "dotenv/config";

import swaggerDocument from "./documentation.json";
import Container from "./DI";

const PORT = process.env.PORT || 3000;

class App {
  public readonly app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.swagger();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: "deny" }));
    this.app.use(compress());
    this.app.listen(PORT, () =>
      console.log(`Example app listening on port ${PORT}`),
    );
  }

  private async routes() {
    const { container } = await Container.getInstance();

    const recipeRouter = container.get("RecipeRouter");
    recipeRouter.setupRouter(this.app);

    this.app.get("*", function (req, res) {
      res.status(404).send("Not existing url!");
    });
  }

  private swagger(): void {
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().app;
