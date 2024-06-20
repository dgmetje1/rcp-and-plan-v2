import { EventDispatcher, SqlContext } from "@rcp-and-plan/commons";
import { Transaction } from "sequelize";
import { Service } from "typedi";

import { RecipeIngredient } from "@domain/models/recipe/aggregates/RecipeIngredient";
import { RecipeKitchenware } from "@domain/models/recipe/aggregates/RecipeKitchenware";
import { Recipe } from "@domain/models/recipe/Recipe";
import {
  Category,
  Recipe as RecipeDB,
  RecipeIngredient as RecipeIngredientDB,
  RecipeKitchenware as RecipeKitchenwareDB,
  RecipePublication,
} from "@infrastructure/models";

import { IRecipeRepository } from "./types";

@Service({ transient: true })
export class RecipeRepository implements IRecipeRepository {
  private _context: SqlContext;

  /**
   * @inheritdoc
   */
  public get unitOfWork() {
    return this._context;
  }

  public constructor() {
    this._context = new SqlContext(process.env.CONNECTION_STRING_CONTENT!, EventDispatcher.getInstance());
  }

  /**
   * @inheritdoc
   */
  public create(entity: Recipe) {
    this._context.addCommand(t => this.insertRecipe(t, entity), entity);
  }

  /**
   * @inheritdoc
   */
  public addIngredient(entity: Recipe, ingredient: RecipeIngredient): void {
    this._context.addCommand(t => this.insertRecipeIngredient(t, entity, ingredient), entity);
  }
  /**
   * @inheritdoc
   */
  public addKitchenware(entity: Recipe, kitchenware: RecipeKitchenware): void {
    this._context.addCommand(t => this.insertRecipeKitchenware(t, entity, kitchenware), entity);
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
  private async insertRecipe(
    t: Transaction,
    { id, time, portions, difficulty, author, visibility, publicationDate, publications, categories }: Recipe,
  ) {
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
      { include: [RecipePublication], transaction: t },
    );

    const categoriesFromDB = [];
    for (const category of categories) {
      categoriesFromDB.push(await Category.findByPk(category.id, { rejectOnEmpty: true }));
    }
    await newRecipe.$add("categories", categoriesFromDB, { transaction: t });
  }

  /**
   * Inserts a new recipe ingredient into the database.
   *
   * @param entity The Recipe entity to which the ingredient belongs.
   * @param recipeIngredient The RecipeIngredient object representing the ingredient to be inserted.
   */
  private async insertRecipeIngredient(t: Transaction, entity: Recipe, recipeIngredient: RecipeIngredient) {
    await RecipeIngredientDB.create(
      {
        is_optional: recipeIngredient.isOptional,
        unit_id: recipeIngredient.unit.id,
        ingredient_id: recipeIngredient.ingredient.id,
        quantity: recipeIngredient.quantity,
        recipe_id: entity.id.toValue() as string,
      },
      { transaction: t },
    );
  }

  /**
   * Inserts a new recipe ingredient into the database.
   *
   * @param entity The Recipe entity to which the ingredient belongs.
   * @param recipeIngredient The RecipeIngredient object representing the ingredient to be inserted.
   */
  private async insertRecipeKitchenware(t: Transaction, entity: Recipe, recipeKitchenware: RecipeKitchenware) {
    await RecipeKitchenwareDB.create(
      {
        tool_id: recipeKitchenware.kitchenware.id,
        quantity: recipeKitchenware.quantity,
        recipe_id: entity.id.toValue() as string,
      },
      { transaction: t },
    );
  }
}
