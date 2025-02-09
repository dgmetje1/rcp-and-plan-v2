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
import IngredientsRouter from "./routes/ingredients.route";
import KitchenwareRouter from "./routes/kitchenware.route";
import RecipesRouter from "./routes/recipes.route";
import UnitsRouter from "./routes/units.route";

const PORT = process.env.PORT || 3000;

const eventHandlersRoutes = ["@application/commands/recipes/events", "@application/commands/units/events"];

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
    const unitsRouter = Container.get(UnitsRouter);
    unitsRouter.setupRouter(this.app);
    const ingredientsRouter = Container.get(IngredientsRouter);
    ingredientsRouter.setupRouter(this.app);
    const kitchenwareRouter = Container.get(KitchenwareRouter);
    kitchenwareRouter.setupRouter(this.app);
  }

  private swagger(): void {
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private setupEventHandlers() {
    Promise.all(eventHandlersRoutes.map(module => import(module)))
      .then(() => {
        const handlers = Container.getMany(HandlerToken);
        handlers.forEach(handler => handler.initialize());
      })
      .catch(ex => console.error(ex));
  }
}

export default new App().app;
