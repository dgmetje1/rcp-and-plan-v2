import { EventDispatcher, SqlContext } from "@rcp-and-plan/commons";
import { Transaction } from "sequelize";
import { Service } from "typedi";

import { Kitchenware } from "@domain/models/kitchenware/Kitchenware";
import { Languages } from "@global_types/languages";
import { Kitchenware as KitchenwareDB } from "@infrastructure/models/Kitchenware";

import { IKitchenwareRepository } from "./types";

@Service({ transient: true })
export class KitchenwareRepository implements IKitchenwareRepository {
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
  public create(entity: Kitchenware) {
    this._context.addCommand(t => this.insertKitchenware(t, entity), entity);
  }

  /**
   * @inheritdoc
   */
  public edit(entity: Kitchenware, presentLanguageEntries: Languages[]) {
    this._context.addCommand(t => this.updateKitchenware(t, entity, presentLanguageEntries), entity);
  }

  /**
   * @inheritdoc
   */
  public delete(entity: Kitchenware) {
    this._context.addCommand(t => this.deleteKitchenware(t, entity), entity);
  }

  /**
   * Inserts a kitchenware into the database transactionally.
   *
   * @param t - The transaction object for database operations.
   * @param id - The unique identifier of the kitchenware.
   * @param isVisible - A boolean indicating the visibility of the kitchenware.
   * @param content - A map containing the content details of the kitchenware in different languages.
   */
  private async insertKitchenware(t: Transaction, { id, content }: Kitchenware) {
    for (const [key, { name, singularName }] of content.entries()) {
      await KitchenwareDB.create(
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
   * Updates an existing kitchenware in the database transactionally.
   *
   * @param t - The transaction object for database operations.
   * @param id - The unique identifier of the kitchenware.
   * @param content - A map containing the updated content details of the kitchenware in different languages.
   */
  private async updateKitchenware(t: Transaction, { id, content }: Kitchenware, presentLanguageEntries: Languages[]) {
    for (const [language, { name, singularName }] of content.entries()) {
      if (presentLanguageEntries.includes(language)) {
        await KitchenwareDB.update(
          {
            name,
            singular_name: singularName,
          },
          { where: { id: id.toString(), language }, transaction: t },
        );
      } else {
        await KitchenwareDB.create(
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
   * Deletes a kitchenware from the database transactionally.
   *
   * @param t - The transaction object for database operations.
   * @param id - The unique identifier of the kitchenware to be deleted.
   */
  private async deleteKitchenware(t: Transaction, { id }: Kitchenware) {
    await KitchenwareDB.destroy({ where: { id: id.toString() }, transaction: t });
  }
}
