import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import { RecipeStep } from "../RecipeStep";
import { RecipeStepContentAttributes, RecipeStepContentCreationAttributes } from "./types";

@Table({ tableName: "recipes_steps_content" })
export class RecipeStepContent extends Model<RecipeStepContentAttributes, RecipeStepContentCreationAttributes> {
  @PrimaryKey
  @ForeignKey(() => RecipeStep)
  @Column(DataTypes.STRING)
  declare id: string;

  @PrimaryKey
  @Column(DataTypes.STRING(3))
  declare language: string;

  @Column(DataTypes.STRING)
  declare title: string;

  @Column(DataTypes.TEXT)
  declare body: string;

  @BelongsTo(() => RecipeStep, "id")
  declare step: RecipeStep;
}
