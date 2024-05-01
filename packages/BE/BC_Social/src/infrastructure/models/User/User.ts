import { DataTypes } from "sequelize";
import { Column, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

import { UserAttributes } from "./types";

@Table({ tableName: "users" })
export class User extends Model<UserAttributes> {
  @PrimaryKey
  @Column(DataTypes.STRING)
  declare id: string;

  @Unique
  @Column(DataTypes.STRING)
  declare account_id: string;

  @Column(DataTypes.STRING)
  declare nick_name: string;

  @Column(DataTypes.STRING)
  declare name: string;

  @Column(DataTypes.STRING)
  declare last_name: string;

  @Column(DataTypes.STRING)
  declare email: string;

  @Column(DataTypes.STRING)
  declare language: string;

  @Column(DataTypes.STRING)
  declare profile_picture: string | null;
}
