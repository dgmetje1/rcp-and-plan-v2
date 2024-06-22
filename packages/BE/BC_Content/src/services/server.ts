import "dotenv/config";
import { HandlerToken } from "@rcp-and-plan/commons";
import compress from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import responseTime from "response-time";
import swaggerUi from "swagger-ui-express";
import { Container } from "typedi";

import swaggerDocument from "./documentation.json";
import { errorHandler } from "./middlewares/errorHandler";
import RecipesRouter from "./routes/recipes.route";

const PORT = process.env.PORT || 3000;

class App {
  public readonly app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    void this.routes().then(() => {
      this.swagger();
      this.app.get("*", function (_req, res) {
        res.status(404).send("Not existing url!");
      });
      this.app.use(errorHandler);
      this.app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
    });
  }

  private config(): void {
    this.app.use(responseTime());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: "deny" }));
    this.app.use(compress());

    this.setupEventHandlers();
  }

  private async routes() {
    const recipeRouter = Container.get(RecipesRouter);
    recipeRouter.setupRouter(this.app);
  }

  private swagger(): void {
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private setupEventHandlers() {
    import("@application/commands/recipes/events")
      .then(({ default: eventHandlers }) => {
        Container.import(eventHandlers);

        const handlers = Container.getMany(HandlerToken);
        handlers.forEach(handler => handler.initialize());
      })
      .catch(ex => console.error(ex));
  }
}

export default new App().app;
