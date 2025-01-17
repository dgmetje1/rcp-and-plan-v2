import { EventDispatcher, SqlContext } from "@rcp-and-plan/commons";
import { Transaction } from "sequelize";
import { Service } from "typedi";

import { Ingredient } from "@domain/models/ingredient/Ingredient";
import { Languages } from "@global_types/languages";
import { Ingredient as IngredientDB } from "@infrastructure/models/Ingredient";

import { IIngredientRepository } from "./types";

@Service({ transient: true })
export class IngredientRepository implements IIngredientRepository {
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
  public create(entity: Ingredient) {
    this._context.addCommand(t => this.insertIngredient(t, entity), entity);
  }

  /**
   * @inheritdoc
   */
  public edit(entity: Ingredient, presentLanguageEntries: Languages[]) {
    this._context.addCommand(t => this.updateIngredient(t, entity, presentLanguageEntries), entity);
  }

  /**
   * @inheritdoc
   */
  public delete(entity: Ingredient) {
    this._context.addCommand(t => this.deleteIngredient(t, entity), entity);
  }

  /**
   * Inserts a ingredient into the database transactionally.
   *
   * @param t - The transaction object for database operations.
   * @param id - The unique identifier of the ingredient.
   * @param isVisible - A boolean indicating the visibility of the ingredient.
   * @param content - A map containing the content details of the ingredient in different languages.
   */
  private async insertIngredient(t: Transaction, { id, content }: Ingredient) {
    for (const [key, { name, singularName }] of content.entries()) {
      await IngredientDB.create(
        {
          id: id.toString(),
          language: key,
          name,
          singular_name: singularName,
        },
        { transaction: t },
      );
    }
  }

  /**
   * Updates an existing ingredient in the database transactionally.
   *
   * @param t - The transaction object for database operations.
   * @param id - The unique identifier of the ingredient.
   * @param content - A map containing the updated content details of the ingredient in different languages.
   */
  private async updateIngredient(t: Transaction, { id, content }: Ingredient, presentLanguageEntries: Languages[]) {
    for (const [language, { name, singularName }] of content.entries()) {
      if (presentLanguageEntries.includes(language)) {
        await IngredientDB.update(
          {
            name,
            singular_name: singularName,
          },
          { where: { id: id.toString(), language }, transaction: t },
        );
      } else {
        await IngredientDB.create(
          {
            id: id.toString(),
            language,
            name,
            singular_name: singularName,
          },
          { transaction: t },
        );
      }
    }
  }

  /**
   * Deletes a ingredient from the database transactionally.
   *
   * @param t - The transaction object for database operations.
   * @param id - The unique identifier of the ingredient to be deleted.
   */
  private async deleteIngredient(t: Transaction, { id }: Ingredient) {
    await IngredientDB.destroy({ where: { id: id.toString() }, transaction: t });
  }
}
