import { DataTypes } from "sequelize";
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { UnitAttributes, UnitCreationAttributes } from "./types";

@Table({ timestamps: false, tableName: "units" })
export class Unit extends Model<UnitAttributes, UnitCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  declare id: number;

  @PrimaryKey
  @Column(DataTypes.STRING)
  declare language: string;

  @Column(DataTypes.STRING)
  declare name: string;

  @Column(DataTypes.TEXT)
  declare short_name: string;
}
