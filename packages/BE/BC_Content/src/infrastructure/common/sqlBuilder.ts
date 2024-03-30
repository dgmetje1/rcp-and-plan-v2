import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export class SqlBuilder {
  private _db: Sequelize;
  constructor(
    connectionString: string,
    options: SequelizeOptions = {
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  ) {
    this._db = new Sequelize(connectionString, options);
  }
  get db() {
    return this._db;
  }
}
