import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import cls from "cls-hooked";
import { SqlBuilder } from "./SqlBuilder";

export class SqlContext extends SqlBuilder {
  private _commands: Array<() => void> = [];

  constructor(connectionString: string, options?: SequelizeOptions) {
    const namespace = cls.createNamespace(SqlContext.name);
    Sequelize.useCLS(namespace);

    super(connectionString, options);
  }

  public addCommand(command: () => void) {
    this._commands.push(command);
  }

  public async saveChangesAsync() {
    await this._db.transaction(async () => {
      for (const command of this._commands) {
        await command();
      }
      return Promise.resolve();
    });

    this._commands = [];
  }
}
