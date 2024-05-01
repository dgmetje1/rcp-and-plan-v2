import { Optional } from "sequelize";

export interface UnitAttributes {
  id: number;
  language: string;
  name: string;
  short_name: string;
}

export interface UnitCreationAttributes
  extends Optional<UnitAttributes, "id"> {}
