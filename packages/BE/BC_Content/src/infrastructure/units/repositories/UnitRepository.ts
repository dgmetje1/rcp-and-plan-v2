import { EventDispatcher, SqlContext } from "@rcp-and-plan/commons";
import { Transaction } from "sequelize";
import { Service } from "typedi";

import { Unit } from "@domain/models/unit/Unit";
import { Unit as UnitDB } from "@infrastructure/models/Unit";

import { IUnitRepository } from "./types";

@Service({ transient: true })
export class UnitRepository implements IUnitRepository {
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
  public create(entity: Unit) {
    this._context.addCommand(t => this.insertUnit(t, entity), entity);
  }

  /**
   * @inheritdoc
   */
  public edit(entity: Unit) {
    this._context.addCommand(t => this.updateUnit(t, entity), entity);
  }

  /**
   * Inserts a unit into the database transactionally.
   *
   * @param t - The transaction object for database operations.
   * @param id - The unique identifier of the unit.
   * @param isVisible - A boolean indicating the visibility of the unit.
   * @param content - A map containing the content details of the unit in different languages.
   */
  private async insertUnit(t: Transaction, { id, isVisible, content }: Unit) {
    for (const [key, { name, singularName, shortName }] of content.entries()) {
      await UnitDB.create(
        {
          id: id.toString(),
          is_visible: isVisible,
          language: key,
          name,
          singular_name: singularName,
          short_name: shortName,
        },
        { transaction: t },
      );
    }
  }

  /**
   * Updates an existing unit in the database transactionally.
   *
   * @param t - The transaction object for database operations.
   * @param id - The unique identifier of the unit.
   * @param isVisible - A boolean indicating the visibility of the unit.
   * @param content - A map containing the updated content details of the unit in different languages.
   */
  private async updateUnit(t: Transaction, { id, isVisible, content }: Unit) {
    for (const [key, { name, singularName, shortName }] of content.entries()) {
      await UnitDB.update(
        {
          is_visible: isVisible,
          name,
          singular_name: singularName,
          short_name: shortName,
        },
        { where: { id: id.toString(), language: key }, transaction: t },
      );
    }
  }
}
