import { SqlContext } from "@rcp-and-plan/commons";

import { Recipe } from "@domain/models/recipe/Recipe";
import { Category, Recipe as RecipeDB, RecipePublication } from "@infrastructure/models";

import { IRecipeRepository } from "./types";

export class RecipeRepository implements IRecipeRepository {
  private _context: SqlContext;

  /**
   * @inheritdoc
   */
  public get unitOfWork() {
    return this._context;
  }

  public constructor() {
    this._context = new SqlContext(process.env.CONNECTION_STRING_CONTENT!);
  }

  /**
   * @inheritdoc
   */
  public create(entity: Recipe) {
    this._context.addCommand(() => this.insertRecipe(entity), entity);
  }

  /**
   * Inserts a new recipe into the database.
   *
   * @param id The ID of the recipe.
   * @param time The time required to prepare the recipe.
   * @param portions The number of portions the recipe yields.
   * @param difficulty The difficulty level of the recipe.
   * @param author The author of the recipe.
   * @param visibility The visibility status of the recipe.
   * @param publicationDate The date of publication of the recipe.
   * @param publications The publications related to the recipe.
   * @param categories The categories to which the recipe belongs.
   */
  private async insertRecipe({
    id,
    time,
    portions,
    difficulty,
    author,
    visibility,
    publicationDate,
    publications,
    categories,
  }: Recipe) {
    const newRecipe = await RecipeDB.create(
      {
        id: id.toValue() as string,
        time,
        portions,
        difficulty,
        author,
        visibility,
        publication_date: publicationDate,
        publications: [...publications.values()].map(({ id, title, description, language }) =>
          RecipePublication.build({ id, title, description, language }),
        ),
      },
      { include: [RecipePublication] },
    );

    const categoriesFromDB = [];
    for (const category of categories) {
      categoriesFromDB.push(await Category.findByPk(category.id, { rejectOnEmpty: true }));
    }
    await newRecipe.$set("categories", categoriesFromDB);
  }
}
