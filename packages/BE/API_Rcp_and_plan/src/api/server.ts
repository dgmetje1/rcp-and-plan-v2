import "dotenv/config";
import compress from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import responseTime from "response-time";
import swaggerUi from "swagger-ui-express";
import http from "http";
import https from "https";
import fs from "fs";

import Container from "./DI";
import swaggerDocument from "./documentation.json";
import { errorHandler } from "./middleware/errorHandler";

const PORT = process.env.PORT || 3000;

const httpsOptions = {
  key: fs.readFileSync("./.cert/key.pem"),
  cert: fs.readFileSync("./.cert/cert.pem"),
};

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

      http.createServer(this.app).listen(PORT, () => {
        console.log(`API app listening on port ${PORT}`);
      });
      https.createServer(httpsOptions, this.app).listen(+PORT + 1, () => {
        console.log(`API app listening on secure port ${+PORT + 1}`);
      });
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

    const recipeRouter = container.get("RecipeRouter");
    recipeRouter.setupRouter(this.app);

    const userRouter = container.get("UsersRouter");
    userRouter.setupRouter(this.app);
  }

  private swagger(): void {
    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().app;
