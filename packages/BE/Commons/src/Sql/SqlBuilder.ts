import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const DEFAULT_OPTIONS: SequelizeOptions = {
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export class SqlBuilder {
  protected _db: Sequelize;
  constructor(connectionString: string, options?: SequelizeOptions) {
    this._db = new Sequelize(connectionString, {
      ...DEFAULT_OPTIONS,
      ...options,
    });
  }
  get db() {
    return this._db;
  }
}
