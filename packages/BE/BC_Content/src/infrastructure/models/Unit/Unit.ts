import { DataTypes } from "sequelize";
import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

import { UnitAttributes, UnitCreationAttributes } from "./types";

@Table({ tableName: "units" })
export class Unit extends Model<UnitAttributes, UnitCreationAttributes> {
  @PrimaryKey
  @Column(DataTypes.STRING)
  declare id: string;

  @PrimaryKey
  @Column(DataTypes.STRING)
  declare language: string;

  @Column(DataTypes.STRING)
  declare name: string;

  @Column(DataTypes.STRING)
  declare short_name: string;

  @Column(DataTypes.STRING)
  declare singular_name: string;

  @Column(DataTypes.BOOLEAN)
  declare is_visible: boolean;
}
