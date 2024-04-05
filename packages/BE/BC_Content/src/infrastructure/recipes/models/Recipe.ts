import { SqlBuilder } from "@infrastructure/common/sqlBuilder";
import { DataTypes } from "sequelize";
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { RecipeAttributes, RecipeCreationAttributes } from "./types";

const { db: sequelize } = new SqlBuilder(
  process.env.CONNECTION_STRING_CONTENT!,
);

@Table({ tableName: "recipes" })
export class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  declare id: number;

  @Column(DataTypes.STRING)
  title: string;

  @Column(DataTypes.TEXT)
  description: string;

  @Column(DataTypes.STRING)
  thumbnail_url: string;

  @Column(DataTypes.STRING)
  header_img: string;

  @Column(DataTypes.STRING)
  unique_id: string;

  @Column(DataTypes.STRING(3))
  language: string;

  @Column(DataTypes.INTEGER)
  difficulty: number;

  @Column(DataTypes.INTEGER)
  time: number;

  @Column(DataTypes.INTEGER)
  portions: number;

  @Column(DataTypes.TINYINT)
  visibility: number;

  @Column(DataTypes.STRING)
  author: string;

  @Column(DataTypes.DATE)
  publication_date: Date;
}

sequelize.addModels([Recipe]);