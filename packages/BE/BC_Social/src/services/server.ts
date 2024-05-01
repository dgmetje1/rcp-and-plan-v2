import express from "express";
import swaggerUi from "swagger-ui-express";
import compress from "compression";
import helmet from "helmet";
import "dotenv/config";

import swaggerDocument from "./documentation.json";
import Container from "./DI";
import cors from "cors";
import responseTime from "response-time";
import { errorHandler } from "./middlewares/errorHandler";

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
      this.app.listen(PORT, () =>
        console.log(`Example app listening on port ${PORT}`),
      );
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
  }

  private async routes() {
    const { container } = await Container.getInstance();

    const userRouter = container.get("UsersRouter");
    userRouter.setupRouter(this.app);
  }

  private swagger(): void {
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().app;
