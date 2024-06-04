import { IHandle } from "@rcp-and-plan/commons";
import { Autowire, ContainerBuilder, ServiceFile } from "node-dependency-injection";
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
  public async initialize() {
    const autowire = new Autowire(this._container);
    autowire.serviceFile = new ServiceFile(path.resolve(__dirname, "./DI.yml"), true);
    await autowire.process();

    const { default: RecipeRouter } = await import("@services/routes/recipes.route");
    const { RecipeQueries } = await import("@application/queries/recipes/IRecipeQueries");
    const { RecipeApplication } = await import("@application/commands/recipes");
    const { RecipeRepository } = await import("@domain/models/recipe/IRecipeRepository");

    const { CategoryQueries } = await import("@application/queries/categories/ICategoryQueries");
    const { IngredientQueries } = await import("@application/queries/ingredients/IIngredientQueries");
    const { UnitQueries } = await import("@application/queries/units/IUnitsQueries");

    this._container.register("RecipeRouter", RecipeRouter);
    this._container.register("RecipeApplication", RecipeApplication);
    this._container.register("RecipeRepository", RecipeRepository);
    this._container.register("RecipeQueries", RecipeQueries);

    this._container.register("CategoryQueries", CategoryQueries);

    this._container.register("IngredientQueries", IngredientQueries);

    this._container.register("UnitQueries", UnitQueries);

    await this._setupEventHandlers();
  }

  public get container(): ContainerBuilder {
    return this._container;
  }

  constructor() {
    // Prevent creating new instances using the 'new' keyword
    if (Container.instance) {
      throw new Error("Container class cannot be instantiated");
    }
    this._container = new ContainerBuilder(false, path.resolve(__dirname, "../../"));
  }

  private async _setupEventHandlers() {
    const { default: RecipeEventHandlers } = await import("@application/commands/recipes/events");

    RecipeEventHandlers.forEach((EventHandler: typeof IHandle) => {
      new EventHandler();
    });
  }
}
