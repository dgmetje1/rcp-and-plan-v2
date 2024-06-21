import { Optional } from "sequelize";

import { RecipeStep } from "../RecipeStep";

export interface RecipeStepContentAttributes {
  id: string;
  language: string;
  title: string;
  body: string;
  step: RecipeStep;
}
export interface RecipeStepContentCreationAttributes extends Optional<RecipeStepContentAttributes, "step"> {}
