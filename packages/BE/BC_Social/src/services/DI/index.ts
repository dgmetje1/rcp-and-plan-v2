import {
  ContainerBuilder,
  Autowire,
  ServiceFile,
} from "node-dependency-injection";
import path from "path";

export default class Container {
  static instance: Container;
  private _container: ContainerBuilder;
  static async getInstance() {
    if (!Container.instance) {
      Container.instance = new Container();
      await Container.instance.initialize();
    }
    return Container.instance;
  }
  async initialize() {
    const autowire = new Autowire(this._container);
    autowire.serviceFile = new ServiceFile(
      path.resolve(__dirname, "./DI.yml"),
      true,
    );
    await autowire.process();

    const { default: UsersRouter } = await import(
      "@services/routes/users.route"
    );
    const { UserQueries } = await import(
      "@application/queries/users/IUserQueries"
    );

    this._container.register("UsersRouter", UsersRouter);
    this._container.register("UserQueries", UserQueries);
  }

  public get container(): ContainerBuilder {
    return this._container;
  }

  constructor() {
    // Prevent creating new instances using the 'new' keyword
    if (Container.instance) {
      throw new Error("Container class cannot be instantiated");
    }
    this._container = new ContainerBuilder(
      false,
      path.resolve(__dirname, "../../"),
    );
  }
}
