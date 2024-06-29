import { RecipeCreateStepsEntry } from "./RecipeCreateStepEntry";
import { RecipeIngredientsEntry } from "./RecipeIngredientEntry";
import { RecipeKitchenwareEntry } from "./RecipeKitchenwareEntry";

export type RecipeCreateEntry = {
  difficulty: number;
  time: number;
  portions: number;
  visibility: number;
  publications: Record<string, RecipeCreatePublicationEntry>;
  categories: Array<string>;
  ingredients: RecipeIngredientsEntry;
  kitchenware: RecipeKitchenwareEntry;
  steps: RecipeCreateStepsEntry;
};

type RecipeCreatePublicationEntry = {
  title: string;
  description: string;
};
