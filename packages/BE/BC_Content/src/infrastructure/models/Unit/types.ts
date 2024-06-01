import { Optional } from "sequelize";

export interface UnitAttributes {
  id: string;
  language: string;
  name: string;
  short_name: string;
  singular_name: string;
  is_visible: boolean;
}

export interface UnitCreationAttributes extends Optional<UnitAttributes, "id"> {}
