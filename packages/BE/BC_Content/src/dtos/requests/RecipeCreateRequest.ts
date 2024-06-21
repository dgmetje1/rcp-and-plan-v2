import { RecipeCreateStepsRequest } from "./RecipeCreateStepRequest";
import { RecipeIngredientsRequest } from "./RecipeIngredientRequest";
import { RecipeKitchenwareRequest } from "./RecipeKitchenwareRequest";

export type RecipeCreateRequest = {
  difficulty: number;
  time: number;
  portions: number;
  visibility: number;
  author: string;
  publications: Record<string, RecipeCreatePublicationRequest>;
  categories: Array<string>;
  ingredients: RecipeIngredientsRequest;
  kitchenware: RecipeKitchenwareRequest;
  steps: RecipeCreateStepsRequest;
};

type RecipeCreatePublicationRequest = {
  title: string;
  description: string;
};
