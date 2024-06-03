import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import cls from "cls-hooked";

import { AggregateRoot, EventDispatcher } from "../DDD";
import { SqlBuilder } from "./SqlBuilder";

export class SqlContext extends SqlBuilder {
  private _commands: Array<() => void> = [];
  private _entities: Set<AggregateRoot> = new Set();
  private _eventDispatcher: EventDispatcher | undefined;

  constructor(connectionString: string, eventDispatcher?: EventDispatcher, options?: SequelizeOptions) {
    const namespace = cls.createNamespace(SqlContext.name);
    Sequelize.useCLS(namespace);

    super(connectionString, options);

    this._eventDispatcher = eventDispatcher;
  }

  public addCommand(command: () => void, entity: AggregateRoot) {
    this._commands.push(command);
    this._entities.add(entity);
  }

  public async saveChangesAsync() {
    await this._db.transaction(async () => {
      for (const command of this._commands) {
        await command();
      }
      return Promise.resolve();
    });

    if (this._eventDispatcher)
      this._entities.forEach(aggregate => {
        aggregate.domainEvents.forEach(event => {
          this._eventDispatcher!.publish(event);
        });
      });

    this._commands = [];
  }
}
